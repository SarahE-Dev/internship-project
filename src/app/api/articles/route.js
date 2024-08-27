import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const articles = await prisma.article.findMany();
  return new Response(JSON.stringify(articles), {status: 200});
}

export async function POST(req){
    const {title, author, content} = await req.json();
    const article = await prisma.article.create({
        data: {
            title,
            author,
            content
        }
    })
    return new Response(JSON.stringify(article), {status: 200});
}

export async function PUT(req){
    const {id, title, author, content} = await req.json();
    const updatedArticle = await prisma.article.update({
        where: {
            id: id
        },
        data: {
            title,
            author,
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