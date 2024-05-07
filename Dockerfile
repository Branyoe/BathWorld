# Etapa de construcción
FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
# Instala las dependencias de producción
RUN npm install --production --legacy-peer-deps
COPY . .
# Construye la aplicación
RUN npm run build
# Etapa final: ejecutar el servidor node.js con PM2
FROM node:alpine
WORKDIR /app
# Copia el build de la etapa anterior a la estapa actual
COPY --from=build /app/build /app/build
COPY --from=build /app/server.js /app/server.js
RUN npm install -g pm2
RUN npm install express morgan
EXPOSE 3004
# Inicia el servidor usando PM2
CMD ["pm2-runtime", "start", "server.js"]
