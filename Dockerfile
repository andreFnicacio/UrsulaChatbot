# Use a imagem base do Node.js
FROM node:21

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código, exceto node_modules
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 8080

# Comando para rodar a aplicação
CMD [ "sh", "-c", "echo $PORT && ls && npm run start" ]
