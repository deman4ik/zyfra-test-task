## Тестовое задание для компании Цифра

### Запуск в Docker контейнере

```bash
docker pull deman4ik/zyfra-test-task:latest
docker run -p 3000:3000 deman4ik/zyfra-test-task:latest
```

или локально

```bash
git clone https://github.com/deman4ik/zyfra-test-task
cd zyfra-test-task
docker build . -t zyfra-test-task
docker run -p 3000:3000 zyfra-test-task:latest
```

### Запуск локально в режиме разработки

```bash
git clone https://github.com/deman4ik/zyfra-test-task
cd zyfra-test-task
npm install
npm run dev
```

### Запуск локально в режиме production

```bash
git clone https://github.com/deman4ik/zyfra-test-task
cd zyfra-test-task
npm install
```

Поменять переменную окружения в файле .env

```bash
WS_URL="ws://localhost:3000"
```

```bash
npm run build
npm run start
```
