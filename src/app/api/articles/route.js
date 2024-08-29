import prisma from "@/app/lib/prisma";

export async function GET(req) {
  const articles = await prisma.article.findMany({
    include: {
      author: true
    }
  });
  return new Response(JSON.stringify(articles), {status: 200});
}

export async function POST(req){
    const { title, authorId, content } = await req.json();
    const newArticle = await prisma.article.create({
        data: {
            title,
            content,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    })
    return new Response(JSON.stringify(newArticle), {status: 200});
}

export async function PUT(req){
    const {id, title, content} = await req.json();
    const updatedArticle = await prisma.article.update({
        where: {
            id: Number(id)
        },
        data: {
            title,
            content
        }
        })
        return new Response(JSON.stringify(updatedArticle), {status: 200});
}

export async function DELETE(req){
    const {id} = await req.json();
    const article = await prisma.article.delete({
        where: {
            id: parseInt(id)
        }
    })
    return new Response(JSON.stringify(article), {status: 200});
}