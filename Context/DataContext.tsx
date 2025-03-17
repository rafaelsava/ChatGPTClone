import { createContext, useState, useEffect, useContext } from "react";
import { Chat, Message } from "../Interfaces/interfaces";
import { db } from "../utils/Firebase";
import { addDoc, collection, getDocs, updateDoc, doc, query, where, deleteDoc } from "firebase/firestore/";
import { AuthContext } from "./AuthContext";

interface DataContextProps {
    chats: Chat[];
    selectedChat: Chat | null;
    setSelectedChat: (chat: Chat) => void;
    createChat: (text: string, messages: Message[]) => Promise<string | undefined>;
    updateChat: (id: string, messages: Message[]) => Promise<void>;
    getChats: () => Promise<void>;
    deleteChat: (id: string) => Promise<void>;
}

// Crear contexto
export const DataContext = createContext({} as DataContextProps);

export const DataProvider = ({ children }: any) => {
    const { user } = useContext(AuthContext); // Obtener usuario autenticado
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

    // Obtener chats al iniciar
    useEffect(() => {
        if (user) getChats();
    }, [user]);

    const createChat = async (message: string, messages: Message[]) => {
        try {
            const textSplit = message.split(" ");
            const tempId = Date.now().toString(); // ID temporal para la UI inmediata
            const title = textSplit.slice(0, 5).join(" ");
    
            const newChat: Chat = {
                id: tempId, // ID temporal para evitar bloqueos
                title,
                create_at: new Date(),
                messages,
                userId: user?.uid || ""
            };
    
            setChats((prev) => [newChat, ...prev]);
            setSelectedChat(newChat); 
    
            addDoc(collection(db, "chats"), {
                title,
                create_at: new Date(),
                messages,
                userId: user?.uid
            })
            .then((response) => {
                setChats((prev) =>
                    prev.map((chat) =>
                        chat.id === tempId ? { ...chat, id: response.id } : chat
                    )
                );
    
                setSelectedChat((prev) =>
                    prev?.id === tempId ? { ...prev, id: response.id } : prev
                );
            })
            .catch((error) => {
                console.error("Error al crear chat en Firebase:", error);
            });
    
            return tempId; 
        } catch (error) {
            console.error("Error en createChat:", error);
        }
    };
    
    

    const updateChat = async (id: string, messages: Message[]) => {
        if (!user) return;
        try {
            const chatRef = doc(db, "chats", id);
            let updatedFields: any = { messages };

            // Obtener el chat actual para verificar su título
            const chatSnapshot = await getDocs(collection(db, "chats"));
            const chatData = chatSnapshot.docs.find(doc => doc.id === id)?.data();

            // Si el título es "Chat sin título", actualizamos con el primer mensaje
            if (chatData && chatData.title === "Chat sin título" && messages.length > 0) {
                updatedFields.title = messages[0].text.split(" ").slice(0, 5).join(" ");
            }

            await updateDoc(chatRef, updatedFields);

            setChats((prev) =>
                prev.map((chat) => (chat.id === id ? { ...chat, ...updatedFields } : chat))
            );
        } catch (error) {
            console.log("Error al actualizar chat:", error);
        }
    };

    const getChats = async () => {
        if (!user) return;
        try {
            const q = query(collection(db, "chats"), where("userId", "==", user.uid)); // Filtrar por usuario
            const querySnapshot = await getDocs(q);
            const newChats: Chat[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                create_at: doc.data().create_at.toDate(),
                messages: doc.data().messages,
                title: doc.data().title,
                userId: doc.data().userId,
            }));
            setChats(newChats);
        } catch (error) {
            console.log("Error al obtener chats:", error);
        }
    };

    const deleteChat = async (id: string) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, "chats", id));
            setChats((prev) => prev.filter((chat) => chat.id !== id));
    
            if (selectedChat?.id === id) {
                setSelectedChat(null); // Si el chat eliminado estaba seleccionado, limpiar selección
            }
        } catch (error) {
            console.error("Error al eliminar chat:", error);
        }
    };

    return (
        <DataContext.Provider
            value={{ chats, selectedChat, setSelectedChat, createChat, updateChat, getChats,deleteChat  }}
        >
            {children}
        </DataContext.Provider>
    );
};
