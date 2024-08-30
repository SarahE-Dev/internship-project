import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY;
export async function POST(req){
    try {
        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hashSync(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
            })
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
                JWT_SECRET, 
                { expiresIn: '1h' } 
            );
        return new Response(JSON.stringify(token), {status: 200});
    }catch (error) {
        return new Response(JSON.stringify({message: "An error occured"}), {status: 500});
    }
}