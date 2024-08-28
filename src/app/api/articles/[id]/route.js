import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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