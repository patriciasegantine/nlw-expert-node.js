import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getAllPolls(app: FastifyInstance) {
  app.get('/polls', async (req, reply) => {
    
    const polls = await prisma.poll.findMany();
    
    const pollsData = await Promise.all(
      polls.map(async (poll) => {
        return {
          id: poll.id,
          title: poll.title,
        };
      })
    );
    
    reply.send({polls: pollsData});
    
  });
}
