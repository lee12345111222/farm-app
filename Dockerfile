FROM node:18-alpine

# 使用国内镜像源设置npm
RUN npm config set registry https://registry.npmmirror.com

WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建应用程序
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动应用程序
CMD ["npm", "start"] 