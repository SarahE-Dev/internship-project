import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

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
        return new Response(JSON.stringify(user), {status: 200});
    }catch (error) {
        return new Response(JSON.stringify({message: "An error occured"}), {status: 500});
    }
}