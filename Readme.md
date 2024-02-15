# NLW Rocketseat - Project Polls

![Your Project Logo](public/nlw-nodejs.jpg)

## About the Project

This project introduces a real-time voting system where users can create polls, and other users can participate by
casting their votes. The system dynamically generates a ranking among the options and updates the votes in real-time.
Developed during the NLW, Polls provides a hands-on exploration of the latest technologies in the Node.js
ecosystem, specifically tailored for building responsive and interactive web applications.

## Technologies Used

- **Fastify:** Used as a framework to create an efficient and high-performance web application.

- **Databases:**
    - Redis: For quick and efficient operations.
    - PostgreSQL: For structuring and handling more complex relationships.

- **Docker:** Implementation of virtualization and containers for consistent and isolated environments.

- **Prisma and Zod:**
    - Prisma: ORM used to interact efficiently with the database.
    - Zod: Used to validate and ensure data integrity through schema validation.

- **Pub/Sub Pattern:** Utilized to enable real-time updates and communication between different components of the
  system.

## How to Run the Project

### Prerequisites

Before getting started, make sure to have the following tools installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Installing Dependencies

```bash
# Clone the repository
git clone https://github.com/your-username/your-project.git

# Navigate to the project directory
cd your-project

# Install dependencies
npm install

```

### Environment Configuration

1. Copy the example file .env.example to a new file named .env.
2. Fill in the environment variables in the .env file with the necessary information.

Example .env file:

```env
DATABASE_URL="postgresql://docker:docker@localhost:3333/polls?schema=public"
```

### Running the Project

```bash
# Start the database with Docker

docker-compose up -d

# Run the project

npm start

```

The project will be available at http://localhost:3333.

## HTTP

| Method | Route                  | Description                              |
|--------|------------------------|------------------------------------------|
| POST   | /polls                 | Create a new poll                        |
| GET    | /polls                 | Get all polls                            |
| GET    | /polls/:pollId         | Get details of a specific poll           |
| POST   | /polls/:pollId/votes   | Vote on a specific poll option           |
| WS     | /polls/:pollId/results | WebSocket endpoint for real-time updates |

### Parameters

```http
POST /polls
```

body request:

``` JSON
{
  "title": "Which Node.js framework do you prefer to use in your projects?",
  "options": [
    "Express",
    "Fastify",
    "NestJS",
    "HapiJS"
  ]
}
```

response:

``` JSON
{
  "pollId": "95bf305a-6202-4207-8564-0c851748e205"
}
```

***

```http
GET /polls
```

response:

``` JSON
{
  "polls": [
      {
        "id": "3dfc3392-d902-46f7-96d0-2cf723db0d76",
        "title": " Which Node.js framework do you prefer to use in your projects?"
      },
      {
        "id": "0caf135e-d7bb-4313-8287-d8d0dc3d3d92",
        "title": "Remote Work Realities: Share Your Work-from-Home Experience!"
      },
  ]
}
```

***

```http
GET /polls/:pollId
```

response:

``` JSON
{
  "poll": {
    "id": "0caf135e-d7bb-4313-8287-d8d0dc3d3d92",
    "title": "Which Node.js framework do you prefer to use in your projects?",
    "options": [
        {
          "id": "6cb2d1e4-e6cd-41fd-9768-5f5ed22cab31",
          "title": "Express",
          "score": 0
        },
        {
          "id": "b625b62f-d098-4709-b5fa-f1ee10f0b6e4",
          "title": "Fastify",
          "score": 0
        },
        {
          "id": "b0565611-a2f0-4e6d-afcf-f55ca7d527fb",
          "title": "NestJS",
          "score": 0
        },
        {
          "id": "ce9e6864-9f91-4422-94a5-d9f0cfcaeb02",
          "title": "HapiJS",
          "score": 0
        }
    ]
  }
}
```

***

```http
POST /polls/:pollId/votes
```

request body:

``` JSON
{
"pollOptionId": "e228e3f4-e90b-402d-963d-19b520a19547"
}
```

response:

``` JSON
201

{
  "sessionId": "0056123a-94e6-4883-b284-314dc0b7252d.DerszYUJC8kQSUOIek+ig5/j/E6yzRlLmP8V9r0/1Bs"
}

400

{
  "message": "You already voted on this poll"
}
```
