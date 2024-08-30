import prisma from "@/app/lib/prisma";

export async function GET(req, {params}) {
    const { userId } = params;
    const articles = await prisma.article.findMany({
        where: {
            authorId: Number(userId)
        },
        include: {
            author: true
        }
    })
    return new Response(JSON.stringify(articles), {status: 200});
}