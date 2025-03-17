import React, { useState ,useContext} from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { AuthContext } from "@/Context/AuthContext";

const LoginScreen = () => {
  const router = useRouter();
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    try {
      await login(email, password);
      router.replace("/Welcome");
    } catch (error) {
      Alert.alert("Error", "Verifica tus credenciales e intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/onlygptlogo.png")} style={styles.logo} />
      <Text style={styles.title}>Bienvenido a ChatGPT</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Cargando..." : "Iniciar Sesión"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#343541",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#222",
    color: "white",
    padding: 12,
    marginVertical:10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#10A37F",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
