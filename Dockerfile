FROM --platform=linux/amd64 node:22.5.1

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json (如果存在)
COPY package*.json ./

# 安裝專案依賴
RUN npm install

# 複製專案文件到工作目錄
COPY . .

# 暴露應用程序運行的端口
EXPOSE 3000

# 定義容器啟動時運行的命令
CMD [ "node", "app.js" ]