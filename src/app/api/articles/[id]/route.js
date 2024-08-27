import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const articles = await prisma.article.findUnique({
    where: {
      id: parseInt(params.id)
    }
  });
  return new Response(JSON.stringify(articles), {status: 200});
  
}