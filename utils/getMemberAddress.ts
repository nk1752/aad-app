import prisma from '@/utils/prisma';
import { Address } from '@prisma/client';


export default async function MemberAddress(id: number ): Promise<Address | null> {
  
    const data = await prisma.address.findUnique({
        where: {
            id: id,
        },

    });
    return data;

}