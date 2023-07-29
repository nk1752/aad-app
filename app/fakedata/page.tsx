import {
  randFirstName,
  randLastName,
  randEmail,
  randAddress,
  randUser,
  randStreetName,
  randCity,
  randZipCode,
  rand,
  randState,
  randCounty,
  randPhoneNumber,
  randSubscriptionPlan,
  randNumber,

} from "@ngneat/falso";
import { log } from "console";
import { Member, Address} from "@prisma/client";
import prisma from '@/utils/prisma';
import { data } from "autoprefixer";
import { revalidatePath } from 'next/cache';
import MemberAddress from "@/utils/getMemberAddress";

let memberRecord: Member | undefined;
let memberAddress: Address | null | undefined;
let memberCount: number;

export default function Page() {

  async function makeFakeData(formData: FormData) {
    "use server";
    const num = formData.get('count');
    const count = parseInt(num as string);

    for (let i = 0; i < count; i++) {

      const member = await prisma.member.create({
        data: {

          firstName: randFirstName(),
          lastName: randLastName(),
          email: randEmail(),
          age: randNumber({ min: 18, max: 100 }),
          plan: rand(['Business', 'Standard', 'Pro', 'Bronze', 'Free']),
          phone: randPhoneNumber({ countryCode: 'US' }),
          updatedAt: new Date(),
          address: {
            create: {
              street: randNumber({ min: 1, max: 2000}) +" "+ randStreetName(),
              city: randCity(),
              zipCode: randZipCode(),
              state: randState(),
              county: randCounty(),
              updatedAt: new Date(),
            },
          },
        },
      });

      log(member);
      memberCount = i + 1;
      memberRecord = member;
      if (memberRecord) {
        memberAddress = await MemberAddress(memberRecord.id);
      }

      log(memberAddress);
      // update
      revalidatePath('/fakedata');


    }
  }

  return (
    <>
      <div className=" flex flex-row items-center content-center justify-center ">
        {/* id form */}
        <form
          action={makeFakeData}
          className="flex flex-col bg-gray-700 max-h-52 p-4 border-4 text-stone-100 gap-4 w-56 items-center rounded-md"
        >
          <label className=' block'>
            <span className="block text-sm font-medium text-stone-100">Fake User Count</span>
            <input
              className=" bg-slate-300 hover:bg-slate-100 active:bg-white text-black focus:ring focus:ring-blue-500 min-w-full"
              type="number" name="count" min="1" max="1000" placeholder="1-1000"
            />
          </label>
          <button
            className=" border border-blue-500 w-24 h-7 bg-gray-700 hover:bg-gray-800 text-stone-100 rounded-md"
            type="submit"
          >Submit</button>
        </form>
      </div>
      <div>
        new records added: {memberCount}<br /><br />
        Last Record<br />
        {/** display memberRecord */}
        {"id: "}{memberRecord?.id}<br />
        {"firstName: "}{memberRecord?.firstName}<br />
        {"lastName: "}{memberRecord?.lastName}<br />
        {"email: "}{memberRecord?.email}<br />
        {"age: "}{memberRecord?.age}<br />
        {"plan: "}{memberRecord?.plan}<br />
        {"phone: "}{memberRecord?.phone}<br />
        {"street: "}{memberAddress?.street}<br />
        {"city: "}{memberAddress?.city}<br />
        {"zipCode: "}{memberAddress?.zipCode}<br />
        {"state: "}{memberAddress?.state}<br />
        {"county: "}{memberAddress?.county}<br />

      </div>
    </>
  );
}
