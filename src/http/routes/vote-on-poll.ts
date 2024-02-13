import { z } from "zod";
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";

export async function voteOnPoll(app: FastifyInstance) {
  
  app.post('/polls/:pollId/votes', async (req, reply) => {
    
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid()
    })
    
    const voteOnPollParams = z.object({
      pollId: z.string().uuid()
    })
    
    const {pollOptionId} = voteOnPollBody.parse(req.body)
    const {pollId} = voteOnPollParams.parse(req.params)
    
    let {sessionId} = req.cookies
    
    if (!sessionId) {
      sessionId = randomUUID()
      
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true
      })
    }
    
    return reply.status(201).send({sessionId})
  })
}
