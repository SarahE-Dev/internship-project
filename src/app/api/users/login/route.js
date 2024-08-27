import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
    
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if(!user) {
    return new Response(JSON.stringify({ error: 'Invalid user' }), {
      status: 401,
    });
  }else{
    const valid = await bcrypt.compareSync(password, user.password);
    if(!valid){
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
      });
    }else{
      return new Response(JSON.stringify(user), {
        status: 200,
      });
    }
  }
}

