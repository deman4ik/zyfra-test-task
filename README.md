## Тестовое задание для компании Цифра

### Запуск локально в режиме разработки

```bash
$ git clone https://github.com/deman4ik/zyfra-test-task
$ cd zyfra-test-task
$ npm install
$ npm run dev
```

### Запуск локально в режиме production

```bash
$ git clone https://github.com/deman4ik/zyfra-test-task
$ cd zyfra-test-task
$ npm install
```

Поменять переменную окружения в файле .env

```bash
WS_URL="ws://localhost:3000"
```

```bash
$ npm run build
$ npm run start
```

### Запуск в Docker контейнере

```bash
docker build . -t zyfra-test-task
docker run -p 3000:3000 zyfra-test-task:latest
```
