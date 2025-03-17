import { useState ,useContext} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert ,Image} from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { AuthContext } from "@/Context/AuthContext";

const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading } = useContext(AuthContext);


  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
    try {
      await register(email, password);
      router.replace("/Login");
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la cuenta.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/onlygptlogo.png")} style={styles.logo} />
      <Text style={styles.title}>Crear Cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Registrando..." : "Registrarse"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/Login")}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#343541",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#222",
    borderRadius: 8,
    color: "white",
  },
  button: {
    backgroundColor: "#10A37F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#1E90FF",
    marginTop: 15,
    textDecorationLine: "underline",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
});

export default SignUpScreen;
