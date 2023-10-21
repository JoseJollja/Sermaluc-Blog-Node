# Demo Blog Node

A brief description of your project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisites

Before getting started, make sure you have the following prerequisites installed on your machine:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)

## Installation

1. Create an .env file in the root of the project with the following key-value pair:

```
PORT=

MONGO_DB_NAME=
MONGO_DB_USERNAME=
MONGO_DB_PASSWORD=

JWT_SECRET=

NODE_ENV=development
```

2. Create an mongo-init.js file in the root of the project with the following code:

```
db = db.getSiblingDB($MONGO_DB_NAME)

db.createUser({
  pwd: $MONGO_DB_PASSWORD,
  user: $MONGO_DB_USERNAME,
  roles: [{ role: 'readWrite', db: $MONGO_DB_NAME }]
})
```

Replace the values starting with "$" with the ones you apply in the .env.

3. Build the Docker image:

```
docker compose build
```

## Usage

To run the project using Docker, follow these steps:

1. Start a Docker container using the built image:

```
docker compose run
```

2. You should see the following on your terminal

```
Server started on http://localhost:$PORT
```
