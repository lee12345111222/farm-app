# Docker 运行和部署指南

本文档提供了使用 Docker 运行和部署此应用程序的详细说明。

## 前提条件

- 已安装 [Docker](https://docs.docker.com/get-docker/)
- 已安装 [Docker Compose](https://docs.docker.com/compose/install/) (通常随 Docker Desktop 一起安装)

## 使用 Docker 运行应用程序

### 方法 1: 使用 Docker Compose (推荐)

1. 克隆仓库并进入项目目录
   ```
   git clone <仓库URL>
   cd <项目目录>
   ```

2. 启动应用程序
   ```
   docker-compose up -d
   ```
   应用程序将在后台启动，并在 http://localhost:3000 上可访问

3. 查看日志
   ```
   docker-compose logs -f
   ```

4. 停止应用程序
   ```
   docker-compose down
   ```

### 方法 2: 直接使用 Docker

1. 构建 Docker 镜像
   ```
   docker build -t my-app .
   ```

2. 运行 Docker 容器
   ```
   docker run -p 3000:3000 -d my-app
   ```
   应用程序将在后台启动，并在 http://localhost:3000 上可访问

3. 查看日志
   ```
   docker logs -f <容器ID>
   ```

4. 停止容器
   ```
   docker stop <容器ID>
   ```

## 生产环境部署

### 使用 Docker Compose 部署

1. 在服务器上克隆仓库
   ```
   git clone <仓库URL>
   cd <项目目录>
   ```

2. 根据需要修改 docker-compose.yml 中的环境变量和配置

3. 启动应用程序
   ```
   docker-compose up -d
   ```

4. 配置反向代理（如 Nginx 或 Traefik）以将流量转发到应用程序

### 持续集成/持续部署 (CI/CD)

您可以配置 CI/CD 管道（如 GitHub Actions、GitLab CI 或 Jenkins）自动化构建 Docker 镜像并部署到服务器。示例 GitHub Actions 工作流程：

```yaml
name: Deploy to Production
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: yourregistry/app:latest
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/app
            docker-compose pull
            docker-compose up -d
```

## 环境变量配置

您可以通过以下方式配置环境变量：

1. 在 docker-compose.yml 文件中添加环境变量：
   ```yaml
   services:
     app:
       environment:
         - NODE_ENV=production
         - API_URL=https://api.example.com
   ```

2. 创建一个 .env 文件并使用 Docker Compose 加载：
   ```
   # .env 文件
   NODE_ENV=production
   API_URL=https://api.example.com
   ```

   然后在 docker-compose.yml 中引用：
   ```yaml
   services:
     app:
       env_file:
         - .env
   ```

## 故障排除

1. 如果应用无法启动，检查日志：
   ```
   docker-compose logs -f
   ```

2. 确保端口没有被其他应用占用：
   ```
   lsof -i :3000
   ```

3. 检查 Docker 容器状态：
   ```
   docker ps -a
   ```

4. 重建容器及镜像：
   ```
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

## 网络问题解决方案

如果您在构建或拉取 Docker 镜像时遇到网络超时问题，可以尝试以下解决方案：

### 配置 Docker 使用国内镜像源

1. 创建或编辑 Docker 配置文件：

   对于 Linux：
   ```bash
   sudo mkdir -p /etc/docker
   sudo tee /etc/docker/daemon.json <<-'EOF'
   {
     "registry-mirrors": [
       "https://registry.docker-cn.com",
       "https://mirror.baidubce.com",
       "https://hub-mirror.c.163.com"
     ]
   }
   EOF
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

   对于 macOS 和 Windows：
   - 打开 Docker Desktop
   - 转到 Settings/Preferences
   - 在 Docker Engine 配置中添加以下内容：
     ```json
     {
       "registry-mirrors": [
         "https://registry.docker-cn.com",
         "https://mirror.baidubce.com",
         "https://hub-mirror.c.163.com"
       ]
     }
     ```
   - 点击 Apply & Restart

2. 验证配置：
   ```bash
   docker info
   ```
   确认输出中包含您配置的镜像源。

### 使用代理

如果您需要通过代理访问 Docker Hub：

1. 为 Docker 服务设置代理：

   对于 Linux：
   ```bash
   sudo mkdir -p /etc/systemd/system/docker.service.d
   sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf <<-'EOF'
   [Service]
   Environment="HTTP_PROXY=http://proxy.example.com:port" "HTTPS_PROXY=http://proxy.example.com:port" "NO_PROXY=localhost,127.0.0.1"
   EOF
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

   对于 macOS 和 Windows：
   - 在 Docker Desktop 的设置中配置代理

2. 在构建镜像时使用代理：
   ```bash
   docker build --build-arg HTTP_PROXY=http://proxy.example.com:port --build-arg HTTPS_PROXY=http://proxy.example.com:port -t my-image .
   ```

### 临时解决方案

如果以上方法不起作用，可以尝试以下临时解决方案：

1. 使用手机热点或其他网络连接
2. 增加构建超时时间：
   ```bash
   DOCKER_CLIENT_TIMEOUT=120 COMPOSE_HTTP_TIMEOUT=120 docker-compose up -d
   ```
3. 先手动拉取基础镜像：
   ```bash
   docker pull node:18-alpine
   ```
   然后再运行 `docker-compose up -d` 