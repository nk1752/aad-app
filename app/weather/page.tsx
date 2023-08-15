import { revalidatePath } from "next/cache";
import { getSecret } from "@/utils/azKeyVault";

let cityLocation: String[] = [];
let cityCurrent: String[] = [];
let myApiKey: String = "";

async function getData(formData: FormData) {
  "use server";

  const apiKey = await getSecret("w-api-key") as String;
  //console.log(apiKey);

  const city = formData.get("city") as String; 

  const url =
    "http://api.weatherapi.com/v1/current.json?key=" +
    apiKey +
    "&q=" +
    city +
    "&aqi=yes";

  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    next: {
      revalidate: 0,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const obj = await res.json();

  // get the city location, region, country...
  // reset the array
  cityLocation = [];
  cityLocation.push("location: " + obj.location.name);
  cityLocation.push("region: " + obj.location.region);
  cityLocation.push("country: " + obj.location.country);
  cityLocation.push("lat: " + obj.location.lat);
  cityLocation.push("lon: " + obj.location.lon);
  cityLocation.push("tz_id: " + obj.location.tz_id);
  cityLocation.push("localtime: " + obj.location.localtime);
  cityLocation.push("localtime_epoch: " + obj.location.localtime_epoch);
  cityLocation.push("utc_offset: " + obj.location.utc_offset);

  // get the current weather conditions in american units
  // reset the array
  cityCurrent = [];
  cityCurrent.push(" temperature: " + obj.current.temp_f + " F");
  cityCurrent.push(" feels like: " + obj.current.feelslike_f + " F");
  cityCurrent.push(" wind speed: " + obj.current.wind_mph + " mph");
  cityCurrent.push(" wind direction: " + obj.current.wind_dir);
  cityCurrent.push(" wind gust: " + obj.current.gust_mph + " mph");
  cityCurrent.push(" pressure: " + obj.current.pressure_in + " in");
  cityCurrent.push(" humidity: " + obj.current.humidity + " %");
  cityCurrent.push(" cloud cover: " + obj.current.cloud + " %");
  cityCurrent.push(" uv index: " + obj.current.uv);
  cityCurrent.push(" visibility: " + obj.current.vis_miles + " miles");
  cityCurrent.push(" precipitation: " + obj.current.precip_in + " in");
  cityCurrent.push(" dew point: " + obj.current.dewpoint_f + " F");
  cityCurrent.push(" condition: " + obj.current.condition.text);

  revalidatePath("/weather");
}

export default function Page() {

  return (
    <main className=' flex flex-row  text-stone-100'>
      <div className=" flex flex-col gap-10 w-1/2 items-center content-center justify-center ">
        {/* first name form */}
        <form
          action={getData}
          className="flex flex-col bg-gray-700 max-h-52 p-4 border-4 text-stone-100 gap-4"
        >
          <label className=' block'>
            <span className="block text-sm font-medium text-stone-100">City Name</span>
            <input
              className=" bg-slate-300 text-black hover:bg-slate-100 active:bg-white focus:ring focus:ring-blue-500"
              type="text" name="city"
            />
          </label>
          <button
            className=" border border-blue-500 w-24 h-7 bg-gray-700 hover:bg-gray-800 text-stone-100 rounded-md"
            type="submit"
          >Submit</button>
        </form>
      </div>
      <div className=" bg-black text-green-500 border-double border-8 border-gray-700 w-1/2 pl-6 h-[calc(100vh-96px)] overflow-auto">
        <div className="text-2xl font-bold text-center  text-amber-200">City Information</div>
        <br />
        <div className="text-xl font-bold mb-1 text-amber-200 ">Location</div>
        <ul>
          {cityLocation.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <br />
        <div className="text-xl font-bold mb-1  text-amber-200 ">Current Weather</div>
        <ul>
          {cityCurrent.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
