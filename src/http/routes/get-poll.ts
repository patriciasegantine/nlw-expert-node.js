import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";

export async function getPollById(app: FastifyInstance) {
  
  app.get('/polls/:pollId', async (req, reply) => {
    
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })
    
    const {pollId} = getPollParams.parse(req.params)
    
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId
      },
      include: {
        options: {
          select: {
            title: true,
            id: true
          }
        }
      }
    })
    
    return reply.status(200).send({poll})
  })
}
