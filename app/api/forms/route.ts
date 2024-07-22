import {prisma} from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

export const POST = async (req:Request)=>{
    try {
        const {userId} = auth();

        if(!userId){
            return NextResponse.json({message:"Unauthorized" , status:401})
        }

        const {name , description} = await req.json()

        if(!description || !name){
            return NextResponse.json({message:"Invalid input", status:400})
        }

        const form = await prisma.form.create({
            data:{
                userId: userId,
                name,
                description,
            }
        })

        return NextResponse.json({form})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error, status:500})
    }
}