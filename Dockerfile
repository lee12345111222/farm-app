FROM node:18-alpine

# 使用国内鏡像源設置npm
RUN npm config set registry https://registry.npmmirror.com

# 增加 Node.js 的内存限製
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 複製項目文件
COPY . .

# 構建應用程序
RUN npm run build

# 暴露端口
EXPOSE 3000

# 啟動應用程序
CMD ["npm", "start"] 