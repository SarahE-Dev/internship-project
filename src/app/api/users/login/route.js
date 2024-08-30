import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY;
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
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name }, 
        JWT_SECRET, 
        { expiresIn: '1h' } 
      );
      return new Response(JSON.stringify(token), {
        status: 200,
      });
    }
  }
}

