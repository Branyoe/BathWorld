# BathWorld 🚽

Permite al usuario ubicar y calificar los mejores y más cercanos baños publicos en la ciudad de Colima.

## Índice

- [Instalación](#instalación)
- [Uso](#uso)
- [Características](#características)
- [Contribuciones](#contribuciones)
- [Despliegues](#despliegues)

## Instalación 🛠️

1. **Clona el repositorio**
   ```bash
   git clone git@github.com:Branyoe/BathWorld.git
   cd BarhWorld
   ```

## Entornos

### Desarrollo local

1. Instala las dependencias.

   ```bash
   npm install --legacy-peer-deps
   ```
2. Ejecuta el servidor de desarrollo.

   ```bash
   npm run dev
   ```
3. Puedes ver la aplicacion desde [localhost](http://localhost:3004 "link").

### Desarrollo con Docker 🐋


### Producción con Docker 🐋

1. Ejecuta el siguiente comando en el directroio del proyecto

   ```bash
   docker compose up -3
   ```
2. (opcional) Monitorea el servidor

   ```bash
   docker exec -it web-container sh
   ```

   despues, ya dentro de la consola del contendor

   ```bash
   pm2 monit
   ```
3. Puedes ver la aplicacion desde [localhost](http://localhost:3004 "link").

## Características ✨

- **Autenticación de usuario**.![mobile](https://github.com/Branyoe/BathWorld/assets/65278575/7d2b95ca-1857-431f-9689-d3df6030b2a5)
- **Integración con Mapbox**.![mobile (2)](https://github.com/Branyoe/BathWorld/assets/65278575/93361a93-4b88-47be-bc42-2d6ec9a4e457)
- **Trazado de rutas**.![mobile (3)](https://github.com/Branyoe/BathWorld/assets/65278575/df0af467-2d38-441a-b173-f1519e33b30e)
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

## Despliegues 🚀

[BathWorld App](https://shiny-gingersnap-a70b48.netlify.app/)
