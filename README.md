# Head-to-Toe  
<img src="assets/icon.png" alt="Head to Toe Logo" width="100" />

Proyecto desarrollado para el curso **Desarrollo de Aplicaciones** de [Coderhouse](https://www.coderhouse.com/).  
Esta aplicación fue construida con **Expo SDK 54** e integra diversas tecnologías modernas para la gestión de datos, autenticación y navegación.

---

## Tecnologías utilizadas
- **React Navigation** – Manejo de rutas y pantallas  
- **Expo SQLite** – Base de datos local para almacenamiento offline  
- **Componentes personalizados** – Interfaz modular y reutilizable  
- **Redux Toolkit (RTK)** y **RTK Query** – Manejo de estado global y llamadas asincrónicas  
- **Firebase** – Autenticación y Realtime Database  

---

## Requisitos previos
Antes de instalar y ejecutar la app, asegurate de tener instalados:

- [Node.js](https://nodejs.org/) (versión 20 o superior recomendada)  
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (instalada de forma global)  
- [Git](https://git-scm.com/)  
- Una cuenta de **Firebase** con un proyecto configurado (opcional, para autenticación y base de datos)

---

## Instalación y configuración

1. Cloná el repositorio:

git clone https://github.com/luquini0/Head-to-Toe

cd head-to-toe

2. Instalá las dependencias:

npm install

npm install expo@^54.0.0

3. Configurá las variables de entorno para Firebase

Crea un archivo .env en la raíz del proyecto con las siguientes variables (usá tus datos de Firebase):

EXPO_PUBLIC_BASE_URL_RTDB = https://from-head-to-toe-default-rtdb.firebaseio.com/
EXPO_PUBLIC_BASE_URL_AUTH = https://identitytoolkit.googleapis.com/v1/
EXPO_PUBLIC_FIREBASE_API_KEY = AIzaSyAHhyo7_YxHWyvU3Isq5xpsvUuzEIOpOng

4. Iniciá la aplicación en modo desarrollo:

npx expo start

5. Abre la aplicación en un emulador o en un celular con Expo Go
