# NOVA AI v2

NOVA ahora está preparada para conectarse a Gemini mediante un servidor Node.js.

## 1. Instalar
Necesitas Node.js instalado. En esta carpeta ejecuta:

npm install

## 2. Crear tu archivo secreto
Copia `.env.example` y renómbralo a `.env`.
Dentro de `.env`, pon tu clave:

GEMINI_API_KEY=TU_CLAVE

NO compartas ese archivo ni publiques la clave.

## 3. Ejecutar
npm start

Después abre:
http://localhost:3000

## Importante
La API key está en el servidor, no en `script.js`. Esto es importante para no exponerla en el navegador.

Google recomienda el SDK oficial `@google/genai` y el uso de `GEMINI_API_KEY` como variable de entorno.
