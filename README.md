# BathWorld 🚽

Permite al usuario ubicar y calificar los mejores y más cercanos baños publicos en la ciudad de Colima.

## Índice

- Instalación
- Entornos
- Característcas
- Contribuciones

## [Echa un vistazo 🚀](https://bathworld.onrender.com "ver en navegador")

## Instalación 🛠️

1. **Clona el repositorio**
   ```bash
   git clone git@github.com:Branyoe/BathWorld.git
   cd BarhWorld
   ```

## Entornos ⚙️

### Desarrollo local

1. Instala las dependencias.

   ```bash
   npm install --legacy-peer-deps
   ```

2. Crea una copia del archivo _".example.env.dev"_ llamada _".env"_ y sustituye los ejemplos por tus variables.
3. Ejecuta el servidor de desarrollo.

   ```bash
   npm start
   ```

4. Accede al servidor de desarrollo desde _http://localhost:{puerto configurado}_

### Desarrollo con Docker 🐋

1. Asegurate de que el servicio de docker esté activo.
2. Crea una copia del archivo _".example.env.dev"_ llamada _".env.dev"_ y sustituye los ejemplos por tus variables.
3. Ejectua el servidor de desarrollo con docker.

   ```bash
   npm run dev-srv
   ```

4. Accede al servidor de desarrollo desde _http://localhost:{puerto configurado}_

### Producción con Docker 🐋

1. Asegurate de que el servicio de docker esté activo.
2. Crea una copia del archivo _".example.env.prod"_ llamada _".env.prod"_ y sustituye los ejemplos por tus variables.
3. Ejecuta el servidor de producción.

   ```bash
   npm run prod-srv
   ```

4. [OPCIONAL] Monitorea el servidor

   ```bash
   docker exec -it app-prod sh
   ```

   despues, ya dentro de la consola del contendor

   ```bash
   pm2 monit
   ```

5. Accede al servidor de producción desde http://localhost:{puerto configurado}
6. [NOTA] El servidor de producción no reconoce cambios en el codigo fuente, para ver los cambios aplicados ejecuta el siguiente comando.

   ```bash
   npm run prod-srv-rebuild
   ```

### Pruebas con Cypress

1. Instalar Cypress

   ```bash
   npm i cypress -D
   ```

2. Ejecutar el comando

   ```bash
   npm run cypress:open
   ```

2. Seleccionar el tipo de testing (el utilizado ahorita es E2E).

## Características ✨

- **Autenticación de usuario**.![mobile](https://github.com/Branyoe/BathWorld/assets/65278575/7d2b95ca-1857-431f-9689-d3df6030b2a5)
- **Integración con Mapbox**.
  ![mobile (2)](https://github.com/Branyoe/BathWorld/assets/65278575/93361a93-4b88-47be-bc42-2d6ec9a4e457)
- **Trazado de rutas**.
  ![mobile (3)](https://github.com/Branyoe/BathWorld/assets/65278575/df0af467-2d38-441a-b173-f1519e33b30e)
- **Tutorial para el usuario**.
  ![mobile (1)](https://github.com/Branyoe/BathWorld/assets/65278575/a1eec8bb-45e9-4b3f-a3e2-99b2c6a7558c)

## Contribuciones 🤝

Agradecemos las contribuciones. Para contribuir al proyecto, sigue estos pasos:

Fork el proyecto:

1. Crea una nueva rama (git checkout -b feature/nueva-caracteristica).
2. Commit tus cambios (git commit -m 'Añadir nueva característica').
3. Push a la rama (git push origin feature/nueva-caracteristica).
4. Abre un pull request.
   Por favor, asegúrate de seguir nuestras pautas de contribución.
