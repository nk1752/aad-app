import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import prisma from '@/utils/prisma';
import { log, error, dir } from 'console';
import { Member, Address } from '@prisma/client';
import { json } from 'stream/consumers';
import { stringify } from 'querystring';


let display: string[] = [];

export default function IdPage() {

  async function getMemberById(formData: FormData) {
    "use server";
    const num = formData.get('id');
    const id = parseInt(num as string);

    const data = await prisma.member.findUniqueOrThrow({
      where: {
        id: id
      },
      include: {
        
        
      }
    })

    if (data) {
      // convert data to js object
      log('id data >>>> ', data);
      display = [];
      display.push("id: " + data.id);
      display.push("first name: " + data.firstName);
      display.push("last name: " + data.lastName);
      display.push("phone: " + data.phone);
      display.push("email: " + data.email);
     
      display.push("______________________________________ ");
    }

    revalidatePath('/fetchdata/id');

  }


  async function getMemberByIdRange(formData: FormData) {
    "use server";

    const num1 = formData.get('id1');
    const id1 = parseInt(num1 as string);
    const num2 = formData.get('id2');
    const id2 = parseInt(num2 as string);

    // query where id >= id1 and id <= id2
    const data = await prisma.member.findMany({
      where: {
        AND: [
          {
            id: {
              gte: id1
            }
          },
          {
            id: {
              lte: id2
            }
          }
        ]
      },
      include: {
       
      }
    })

    log('**********************************')
    if (data) {
      log('data range id >>>> ', data);
    }

    // convert data to js object
    display = [];
    for (let i = 0; i < data.length; i++) {
      display.push("id: " + data[i].id);
      display.push("first name: " + data[i].firstName);
      display.push("last name: " + data[i].lastName);
      display.push("phone: " + data[i].phone);
      display.push("email: " + data[i].email);
      
      display.push("______________________________________ ");
    } // end for
  
    revalidatePath('/fetchdata/id');

  }



  return (
    <main className=' flex flex-row  text-stone-100'>
      <div className=" flex flex-col gap-10 w-1/2 items-center content-center justify-center ">

        {/* id form */}
        <form
          action={getMemberById}
          className="flex flex-col bg-gray-700 max-h-52 p-4 border-4 text-stone-100 gap-4"
        >
          <label className=' block'>
            <span className="block text-sm font-medium text-stone-100">User ID</span>
            <input
              className=" bg-slate-300 hover:bg-slate-100 active:bg-white text-black focus:ring focus:ring-blue-500"
              type="number" name="id"
            />
          </label>
          <button
            className=" border border-blue-500 w-24 h-7 bg-gray-700 hover:bg-gray-800 text-stone-100 rounded-md"
            type="submit"
          >Submit</button>
        </form>

        {/* id range form */}
        <form
          action={getMemberByIdRange}
          className="flex flex-col bg-gray-700 max-h-56  p-4 border-4 text-stone-100 gap-4"
        >
          <label className=' text-amber-300'>User ID Range</label>
          <label className=' block'>
            <span className="block text-sm font-medium text-stone-100">From ID</span>
            <input
              className=" bg-slate-300 hover:bg-slate-100 active:bg-white  text-black focus:ring focus:ring-blue-500"
              type="number" name="id1" />
          </label>
          <label className=' block'>
            <span className="block text-sm font-medium text-stone-100">To ID</span>
            <input
              className=" bg-slate-300 hover:bg-slate-100 active:bg-white  text-black focus:ring focus:ring-blue-500"
              type="number" name="id2" />
          </label>
          <button
            className=" border border-blue-500 w-24 h-7 bg-gray-700 hover:bg-gray-800 text-stone-100 rounded-md"
            type="submit"
          >Submit</button>
        </form>

      </div>
      <div className=" bg-black w-1/2 text-green-500 border-double border-8 border-gray-700 pl-6 h-[calc(100vh-96px)] overflow-auto">
        {/* display data */}
        <ul>
            {display.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
        
      </div>

    </main>
  )
}
