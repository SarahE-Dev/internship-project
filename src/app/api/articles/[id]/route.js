import prisma from "@/app/lib/prisma";

export async function GET(req, { params }) {
  const article = await prisma.article.findUnique({
    where: {
      id: parseInt(params.id)
    },
    include: {
      author: true
    }
  });
  return new Response(JSON.stringify(article), {status: 200});
  
}