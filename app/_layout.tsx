import { Stack } from "expo-router";
import { DataProvider } from "@/Context/DataContext";
import { AuthProvider } from "@/Context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <DataProvider>
        <Stack
          screenOptions={{
            headerShown: false, 
          }}
        >
          <Stack.Screen name="index" options={{ title: "Inicio" }} />
          <Stack.Screen
            name="Welcome"
            options={{ title: "Bienvenido a ChatGPT" }}
          />
          <Stack.Screen name="Chat" options={{ title: "Chat" }} />
          <Stack.Screen name="Login" options={{ title: "Iniciar Sesión" }} />
          <Stack.Screen name="Register" options={{ title: "Registrarse" }} />
        </Stack>
      </DataProvider>
    </AuthProvider>
  );
}
