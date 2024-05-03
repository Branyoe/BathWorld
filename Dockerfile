# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install --legacy-peer-deps
RUN npm install pm2 -g

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Expone el puerto 3000 para acceder a la aplicación desde fuera del contenedor
EXPOSE 3000

# Comando para iniciar la aplicación
#CMD ["npm", "start"]
CMD [ "pm2-runtime", "npm", "--", "start" ]
