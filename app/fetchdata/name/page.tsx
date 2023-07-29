import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import prisma from '@/utils/prisma';
import { log, error, dir } from 'console';
import { Member, Address } from '@prisma/client';


let member: Member[];
let address: Address[];

export default function LastNamePage() {

  async function getUserByLastName(formData: FormData) {
    "use server";
    const lastname = formData.get('lastname') as string;

    const data = await prisma.member.findMany({
      where: {
        lastName: lastname
      },
      include: {
        address: {
          select: {
            street: true,
            state: true,
          }
        },
      }
    })

    log('last name data >>> ',data);
    log('last name data address >>> ',data[0].address);
    member = data;
    
    


    revalidatePath('/fetchdata/name');
    return data;

  }

  async function getUserByFirstName(formData: FormData) {
    "use server";
    const firstname = formData.get('firstname') as string;

    const data = await prisma.member.findMany({
      where: {
        firstName: firstname
      }
    })


    log(data);
    member = data;

    revalidatePath('/fetchdata/name');

    return data;
  }

  async function getUserByFullName(formData: FormData) {
    "use server";
    const fulFirstName = formData.get('fullFirstname') as string;
    const fullLastname = formData.get('fullLastname') as string;

    member = await prisma.member.findMany({
      where: {
        firstName: fulFirstName,
        lastName: fullLastname
      }
    })

    log(member);
    //return user
    revalidatePath('/fetchdata/name');
  }

  return (
    <main className=' flex flex-row  text-stone-100'>
      <div className=" flex flex-col gap-10 w-1/2 items-center content-center justify-center ">

        {/* first name form */}
        <form
          action={getUserByLastName}
          className="flex flex-col bg-gray-700 max-h-52 p-4 border-4 text-stone-100 gap-4"
        >
          <label className=' block'>
            <span className="block text-sm font-medium text-stone-100">Last Name</span>
            <input
              className=" bg-slate-300 hover:bg-slate-100 active:bg-white text-black focus:ring focus:ring-blue-500"
              type="text" name="lastname"
            />
          </label>
          <button
            className=" border border-blue-500 w-24 h-7 bg-gray-700 hover:bg-gray-800 text-stone-100 rounded-md"
            type="submit"
          >Submit</button>
        </form>

        {/* last name form */}
        <form
          action={getUserByFirstName}
          className="flex flex-col bg-gray-700 max-h-52  p-4 border-4 text-stone-100 gap-4"
        >
          <label className=' block'>
            <span className="block text-sm font-medium text-stone-100">First Name</span>
            <input
              className=" bg-slate-300 hover:bg-slate-100 active:bg-white text-black focus:ring focus:ring-blue-500"
              type="text" name="firstname"
            />
          </label>
          <button
            className=" border border-blue-500 w-24 h-7 bg-gray-700 hover:bg-gray-800 text-stone-100 rounded-md"
            type="submit"
          >Submit</button>
        </form>
        {/* full name form */}
        <form
          action={getUserByFullName}
          className="flex flex-col bg-gray-700 max-h-56  p-4 border-4 text-stone-100 gap-4"
        >
          <label className=' text-amber-300'>Full Name</label>
          <label className=' block'>
            <span className="block text-sm font-medium text-stone-100">First Name</span>
            <input
              className=" bg-slate-300 hover:bg-slate-100 active:bg-white text-black focus:ring focus:ring-blue-500"
              type="text" name="fullFirstname" />
          </label>
          <label className=' block'>
            <span className="block text-sm font-medium text-stone-100">Last Name</span>
            <input
              className=" bg-slate-300 hover:bg-slate-100 active:bg-white text-black focus:ring focus:ring-blue-500"
              type="text" name="fullLastname" />
          </label>
          <button
            className=" border border-blue-500 w-24 h-7 bg-gray-700 hover:bg-gray-800 text-stone-100 rounded-md"
            type="submit"
          >Submit</button>
        </form>

      </div>
      <div className=" bg-black w-1/2 text-green-500 border-double border-8 border-gray-700 pl-6 h-[calc(100vh-96px)] overflow-auto">
        <ul>
          {member?.map((member) => (
            <li key={member.id}>
              {"id: "}{member.id}<br />
              {"first name: "}{member.firstName}<br />
              {"last name: "}{member.lastName}<br />
              {"phone: "}{member.phone}<br />
              {"plan: "}{member.plan}<br /><br />
              {"address: "}{ }<br />
            </li>
          ))}

        </ul>
      </div>

    </main>
  )
}