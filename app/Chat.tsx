import React, { useState, useEffect, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Image, FlatList, Keyboard, ActivityIndicator, 
  Animated,
  KeyboardAvoidingView,Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MarkdownDisplay from 'react-native-markdown-display';
import { useRouter } from 'expo-router';
import { Message } from '@/Interfaces/interfaces';
import { DataContext } from '@/Context/DataContext';
import Sidebar from './Sidebar';
import { AuthContext } from '@/Context/AuthContext';

const ChatScreen = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const { selectedChat,updateChat, createChat } = useContext(DataContext);
  const {user} = useContext(AuthContext);

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const sidebarWidth = new Animated.Value(sidebarVisible ? 250 : 0);

  
  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setChatId(selectedChat.id);
      setInitialMessage(null); // Restablecer el mensaje inicial
    } else {
      setMessages([]);
      setChatId(undefined);
      setInitialMessage(null); // Asegurar que no persista el título anterior
    }
  }, [selectedChat]);

  const toggleSidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: sidebarVisible ? 0 : 250,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(!sidebarVisible));
  };
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
  
    if (!initialMessage) {
      setInitialMessage(message); // Guarda el primer mensaje para el título
    }
  
    const userMessage: Message = { date: new Date(), text: message, sender: 'user' };
    const updatedMessages = [...messages, userMessage];
  
    setMessages(updatedMessages);
    setMessage('');
    Keyboard.dismiss();
    setLoading(true);
  
    try {
      const apiKey = '';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const body = { contents: [{ parts: [{ text: message }] }] };
  
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      const data = await res.json(); 
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';
  
      const aiMessage: Message = { date: new Date(), text: aiText, sender: 'ai' };
      const finalMessages = [...updatedMessages, aiMessage];
  
      setMessages(finalMessages);
  
      // **Actualizar Firebase**
      if (chatId) {
        await updateChat(chatId, finalMessages);
      } else {
        // Si no hay chat, crear uno nuevo en Firebase y guardar el ID
        const newChatId = await createChat(initialMessage || message, finalMessages);
        setChatId(newChatId);
      }
    } catch (error) {
      console.error('Error en IA:', error);
      setMessages((prev) => [...prev, { date: new Date(), text: 'Error en la respuesta.', sender: 'ai' }]);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? -10 : 0}>
   


      <Animated.View style={[styles.sidebarContainer, { width: sidebarWidth }]}>
        {sidebarVisible && <Sidebar toggleSidebar={toggleSidebar} />}
      </Animated.View>

      <View style={styles.chatContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={toggleSidebar}>
            <Ionicons name="menu-outline" size={24} color="white" />
          </TouchableOpacity>
          <Image source={require('../assets/images/onlygptlogo.png')} style={styles.logo} />
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.date.toString() + item.sender}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
              {item.sender === 'ai' ? (
                <MarkdownDisplay style={markdownStyles}>{item.text}</MarkdownDisplay>
              ) : (
                <Text style={styles.messageText}>{item.text}</Text>
              )}
            </View>
          )}
          contentContainerStyle={styles.messagesContainer}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00C17C" />
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={loading}>
            <Ionicons name="paper-plane" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// Estilos corregidos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Permite que Sidebar y el chat estén lado a lado
    backgroundColor: '#343541',
  },
  chatContainer: {
    flex: 1, // Ocupa el espacio restante después del Sidebar
    padding: 20,
  },
  topBar: {
    paddingTop:40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 10,
  },
  toggleButton: {
    position: 'absolute',
    left: 190, 
    top: 10, 
    zIndex: 10,
    backgroundColor: '#00C17C',
    padding: 15,
    borderRadius: 10, 
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
,  
  sidebarContainer: { height: '100%', backgroundColor: '#222', overflow: 'hidden' },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  messagesContainer: {
    paddingVertical: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#00C17C',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#555',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#222',
    borderRadius: 25,
  },
  input: {
    flex: 1,
    color: 'white',
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#00C17C',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});

// Estilos de Markdown
const markdownStyles = StyleSheet.create({
  text: { color: 'white' },
  strong: { fontWeight: 'bold', color: 'white' },
  em: { fontStyle: 'italic', color: 'white' },
  link: { color: '#1E90FF', textDecorationLine: 'underline' },
  code_inline: { fontFamily: 'monospace', backgroundColor: '#222', paddingHorizontal: 5, borderRadius: 4, color: '#FFD700' },
});

export default ChatScreen;