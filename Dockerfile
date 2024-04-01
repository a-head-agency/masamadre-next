FROM node:20-slim
WORKDIR /usr/server/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY ./ .
RUN pnpm run -r build

ENV NODE_ENV=production
CMD ["pnpm", "run" ,"start"] # will launch the remix app when we run this Docker image.
