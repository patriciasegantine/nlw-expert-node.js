import fastify from "fastify";
import { createPoll } from "./routes/create-poll";
import { getPollById } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import cookie from '@fastify/cookie'
import fastifyWebsocket from "@fastify/websocket";
import { pollResults } from "./ws/poll-results";
import { getAllPolls } from "./routes/get-all-polls";

const app = fastify()

app.register(cookie, {
  secret: "polls-app-nlw",
  hook: 'onRequest',
})

app.register(fastifyWebsocket)

app.register(getAllPolls)
app.register(createPoll)
app.register(getPollById)
app.register(voteOnPoll)
app.register(pollResults)

app.listen({port: 3333}).then(() => {
  console.log('HTTP server running!')
})
