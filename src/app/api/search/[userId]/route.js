import prisma from "@/app/lib/prisma";


export async function GET(request, {params}){
    const userId = Number(params.userId);
    const url = new URL(request.url);
    const query = url.searchParams.get('query')?.toLowerCase();

  if (!query || !userId) {
    return new Response('Please provide a query and userId', { status: 400 });
  }

  try {
    const articles = await prisma.article.findMany({
      where: {
        AND: [
          {
            authorId: Number(userId), 
          },
          {
            OR: [
              {
                title: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                content: {
                  contains: query,
                  mode: 'insensitive', 
                },
              },
            ],
          },
        ],
      },
    });
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify(error), { status: 500 });
  }
}