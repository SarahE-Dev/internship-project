import prisma from "@/app/lib/prisma";



export async function GET(request, { params }) {
  const { id } = params;

  if (!id) {
    return new Response('Article ID is required', { status: 400 });
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
      include: {
        author: true
      }
    });

    if (!article) {
      return new Response('Article not found', { status: 404 });
    }

    return new Response(JSON.stringify(article), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
