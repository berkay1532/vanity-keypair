# Base image
FROM node:20

# Çalışma dizini
WORKDIR /app

# package.json ve package-lock.json kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# Uygulama hangi portu kullanıyor
EXPOSE 3000

# Uygulama başlat
CMD ["npm", "start"]
