# 使用多阶段构建
FROM node:20-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 启用 corepack 并激活 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 设置 npm 镜像源
RUN npm config set registry https://registry.npmmirror.com

# 复制依赖文件并安装依赖
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 复制项目文件并构建
COPY . .
RUN pnpm build

# 清理不必要的文件
RUN rm -rf node_modules

# 生产阶段
FROM nginx:stable-alpine as production-stage

# 复制构建产物到 nginx 目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
