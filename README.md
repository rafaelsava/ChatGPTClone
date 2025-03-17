# 📱 Chat App - React Native + Expo

Este es un proyecto de chat en tiempo real desarrollado con **React Native** y **Expo Router**, utilizando **TypeScript** y **Firebase** para la gestión de datos y autenticación, además de integración con la API de **Gemini AI** para respuestas automatizadas.

## 🚀 Tecnologías Utilizadas

- **React Native**: Framework para desarrollo de apps móviles.
- **Expo Router**: Enrutamiento basado en archivos para navegación intuitiva.
- **TypeScript**: Tipado estático para mejorar la calidad del código.
- **Firebase**: Backend como servicio para la base de datos y autenticación.
- **Gemini AI API**: Generación de respuestas mediante IA.
- **React Native Reanimated**: Animaciones fluidas para UI/UX.
- **React Native Markdown Display**: Soporte para respuestas en formato Markdown.

## 📂 Estructura del Proyecto

```
/root
│── app/                  # Directorio principal de la aplicación
│   ├── _layout.tsx       # Layout principal
│   ├── Chat.tsx         # Pantalla de chat principal
│   ├── index.tsx         # Pantalla de inicio
│   ├── Login.tsx         # Pantalla de inicio de sesión
│   ├── Register.tsx      # Pantalla de registro
│   ├── Sidebar.tsx       # Sidebar con chats previos
│   ├── Welcome.tsx       # Pantalla de bienvenida
│── assets/               # Imágenes y recursos estáticos
│── Context/              # Gestión de estado global
│   ├── AuthContext.tsx   # Contexto de autenticación
│   ├── DataContext.tsx   # Contexto para manejar los chats
│── Interfaces/           # Definición de tipos y estructuras de datos
│   ├── interfaces.ts     # Interfaces para mensajes y chats
│── utils/                # Funciones auxiliares
│── .gitignore            # Archivos a ignorar en Git
│── app.json              # Configuración de Expo
│── package.json          # Dependencias del proyecto
```

## 🛠 Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/rafaelsava/ChatGPTClone.git
   cd chat-clone
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar la aplicación:
   ```bash
   npx expo start
   ```

## 🔥 Funcionalidades Principales

✅ **Chat en tiempo real** con Gemini AI.  
✅ **Soporte Markdown** para respuestas AI.  
✅ **Animaciones fluidas** en la UI.  

## 📚 Más Información

Para más detalles sobre las tecnologías usadas, revisa la documentación oficial:

- [Expo Router](https://expo.dev/router/introduction)
- [Firebase](https://firebase.google.com/docs)
- [React Native](https://reactnative.dev/)
- [Gemini AI API](https://ai.google.dev/)

---
Desarrollado por Rafael Salcedo
