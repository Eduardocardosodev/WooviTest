# Use uma imagem base que suporte uma versão recente do Node.js
FROM node:16-alpine AS builder

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o código-fonte do projeto para o diretório de trabalho
COPY . .

# Compile o código TypeScript
RUN npm run build

# Use uma imagem base leve para a fase final
FROM node:16-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos compilados do estágio de compilação
COPY --from=builder /app /app

# Instale apenas as dependências de produção
RUN npm install --only=production

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3000

# Defina o comando padrão para rodar a aplicação
CMD ["npm", "start"]
