import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { DataContext } from '@/Context/DataContext';
import { AuthContext } from '@/Context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const Sidebar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { chats, getChats, setSelectedChat, createChat,deleteChat } = useContext(DataContext);
  const { user,logout } = useContext(AuthContext);

  useEffect(() => {
    getChats();
  }, []);

  return (
    <View style={styles.sidebar}>
      <Text style={styles.title}>Chats</Text>
      
      {/* Botón de Nuevo Chat */}
      <TouchableOpacity 
  style={styles.newChatButton} 
  onPress={async () => {
    const newChatId = await createChat("Chat sin título", []); // Título provisional

    if (newChatId) {
      setSelectedChat({ id: newChatId, title: "Chat sin título", messages: [], create_at: new Date() ,userId:user?.uid||""});
    }
    toggleSidebar();
  }}
>
  <Ionicons name="add-circle" size={20} color="white" />
  <Text style={styles.newChatText}>Nuevo Chat</Text>
</TouchableOpacity>

<FlatList
    data={chats}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <View style={styles.chatItemContainer}>
            <TouchableOpacity style={styles.chatItem} onPress={() => {
                setSelectedChat(item);
                toggleSidebar();
            }}>
                <Text style={styles.chatTitle}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => deleteChat(item.id)}
            >
                <Ionicons name="trash" size={15} color="white" />
            </TouchableOpacity>
        </View>
    )}
/>

      <TouchableOpacity 
  style={styles.logoutButton} 
  onPress={async () => {
    try {
      await logout(); // Cierra sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }}
>
  <Ionicons name="log-out-outline" size={20} color="white" />
  <Text style={styles.logoutText}>Cerrar Sesión</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: { width: 250, backgroundColor: '#222', padding: 15,paddingTop:70 ,display:'flex',flexDirection:'column',height:'100%'},
  title: { fontSize: 20, color: 'white', marginBottom: 10 },
  newChatButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  newChatText: { color: 'white', marginLeft: 5 },
  chatItem: { padding: 10, backgroundColor: '#333', marginBottom: 5, borderRadius: 5 },
  chatTitle: { color: 'white' },logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#D9534F', // Rojo
    borderRadius: 5,
    
  },
  logoutText: {
    color: 'white',
    marginLeft: 5,
  },
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#333',
    marginBottom: 5,
    borderRadius: 5
},
deleteButton: {
    padding: 3,
    backgroundColor: '#D9534F',
    borderRadius: 5
},

  
});

export default Sidebar;
