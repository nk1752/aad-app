import { revalidatePath } from "next/cache";

let furl: string = "";
let response: string = "";

async function getData(formData: FormData) {
    "use server";

    // <service-name>.<namespace>.svc.cluster.local:<service-port>
    const testurl = formData.get("url") as string;
    furl = testurl;
    const url = testurl;
    const res = await fetch(url, {
        method: "GET",
        mode: "cors",
        next: {
            revalidate: 0,
        },
        headers: {
            "Content-Type": "text/plain",
        },
    });

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    const obj = await res.text();
    

    revalidatePath("/test");
}

export default function Page() {

    return (
      <main className=' flex flex-row  text-stone-100'>
        <div className=" flex flex-col gap-10 w-1/2 items-center content-center justify-center ">
          {/* test url form */}
          <form
            action={getData}
            className="flex flex-col bg-gray-700 max-h-52 p-4 border-4 text-stone-100 gap-4"
          >
            <label className=' block'>
              <span className="block text-sm font-medium text-stone-100">Fetch URL</span>
              <input
                className=" bg-slate-300 text-black hover:bg-slate-100 active:bg-white focus:ring focus:ring-blue-500"
                type="text" name="url"
              />
            </label>

            <button
              className=" border border-blue-500 w-24 h-7 bg-gray-700 hover:bg-gray-800 text-stone-100 rounded-md"
              type="submit"
            >Submit</button>

          </form>
        </div>

        <div>
            number: 1 <br/>
            url: {furl} <br/>
        </div>
        

        
        
      </main>
    );
  }
  