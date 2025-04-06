# Docker 運行和部署指南

本文档提供了使用 Docker 運行和部署此應用程序的詳细說明。

## 前提條件

- 已安装 [Docker](https://docs.docker.com/get-docker/)
- 已安装 [Docker Compose](https://docs.docker.com/compose/install/) (通常随 Docker Desktop 一起安装)

## 使用 Docker 運行應用程序

### 方法 1: 使用 Docker Compose (推荐)

1. 克隆倉庫並進入項目目錄
   ```
   git clone <倉庫URL>
   cd <項目目錄>
   ```

2. 啟動應用程序
   ```
   docker-compose up -d
   ```
   應用程序將在後台啟動，並在 http://localhost:3000 上可訪問

3. 查看日誌
   ```
   docker-compose logs -f
   ```

4. 停止應用程序
   ```
   docker-compose down
   ```

### 方法 2: 直接使用 Docker

1. 構建 Docker 鏡像
   ```
   docker build -t my-app .
   ```

2. 運行 Docker 容器
   ```
   docker run -p 3000:3000 -d my-app
   ```
   應用程序將在後台啟動，並在 http://localhost:3000 上可訪問

3. 查看日誌
   ```
   docker logs -f <容器ID>
   ```

4. 停止容器
   ```
   docker stop <容器ID>
   ```

## 生產環境部署

### 使用 Docker Compose 部署

1. 在服務器上克隆倉庫
   ```
   git clone <倉庫URL>
   cd <項目目錄>
   ```

2. 根據需要修改 docker-compose.yml 中的環境變量和配置

3. 啟動應用程序
   ```
   docker-compose up -d
   ```

4. 配置反向代理（如 Nginx 或 Traefik）以將流量轉發到應用程序

### 持續集成/持續部署 (CI/CD)

您可以配置 CI/CD 管道（如 GitHub Actions、GitLab CI 或 Jenkins）自動化構建 Docker 鏡像並部署到服務器。示例 GitHub Actions 工作流程：

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

## 環境變量配置

您可以通過以下方式配置環境變量：

1. 在 docker-compose.yml 文件中添加環境變量：
   ```yaml
   services:
     app:
       environment:
         - NODE_ENV=production
         - API_URL=https://api.example.com
   ```

2. 創建一個 .env 文件並使用 Docker Compose 加載：
   ```
   # .env 文件
   NODE_ENV=production
   API_URL=https://api.example.com
   ```

   然後在 docker-compose.yml 中引用：
   ```yaml
   services:
     app:
       env_file:
         - .env
   ```

## 故障排除

1. 如果應用無法啟動，檢查日誌：
   ```
   docker-compose logs -f
   ```

2. 確保端口没有被其他應用占用：
   ```
   lsof -i :3000
   ```

3. 檢查 Docker 容器狀態：
   ```
   docker ps -a
   ```

4. 重建容器及鏡像：
   ```
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

## 網絡問题解决方案

如果您在構建或拉取 Docker 鏡像時遇到網絡超時問题，可以嘗試以下解决方案：

### 配置 Docker 使用国内鏡像源

1. 創建或编輯 Docker 配置文件：

   對於 Linux：
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

   對於 macOS 和 Windows：
   - 打開 Docker Desktop
   - 轉到 Settings/Preferences
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
   - 點击 Apply & Restart

2. 驗証配置：
   ```bash
   docker info
   ```
   確認输出中包含您配置的鏡像源。

### 使用代理

如果您需要通過代理訪問 Docker Hub：

1. 為 Docker 服務設置代理：

   對於 Linux：
   ```bash
   sudo mkdir -p /etc/systemd/system/docker.service.d
   sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf <<-'EOF'
   [Service]
   Environment="HTTP_PROXY=http://proxy.example.com:port" "HTTPS_PROXY=http://proxy.example.com:port" "NO_PROXY=localhost,127.0.0.1"
   EOF
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

   對於 macOS 和 Windows：
   - 在 Docker Desktop 的設置中配置代理

2. 在構建鏡像時使用代理：
   ```bash
   docker build --build-arg HTTP_PROXY=http://proxy.example.com:port --build-arg HTTPS_PROXY=http://proxy.example.com:port -t my-image .
   ```

### 臨時解决方案

如果以上方法不起作用，可以嘗試以下臨時解决方案：

1. 使用手機熱點或其他網絡連接
2. 增加構建超時時间：
   ```bash
   DOCKER_CLIENT_TIMEOUT=120 COMPOSE_HTTP_TIMEOUT=120 docker-compose up -d
   ```
3. 先手動拉取基礎鏡像：
   ```bash
   docker pull node:18-alpine
   ```
   然後再運行 `docker-compose up -d` 