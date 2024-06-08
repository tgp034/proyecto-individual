# Stage 1: Compilar la aplicación
FROM node:18-alpine as build

# Establece el directorio de trabajo en /app dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json directamente ya que Dockerfile está dentro de frontend/
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY  . .

# Construye la aplicación Angular y genera la salida en /app/dist
RUN npm run build -- --output-path /app/dist

# Stage 2: Servir la aplicación con nginx
FROM nginx:alpine

# Copia la configuración personalizada y los archivos construidos de la aplicación
COPY --from=build /app/dist/* /usr/share/nginx/html

EXPOSE 80

# Inicia NGINX
CMD ["nginx", "-g", "daemon off;"]
