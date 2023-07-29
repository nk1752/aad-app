import Link from "next/link";

export default function Sidebar() {
  return (
    <main className=" flex flex-col bg-gradient-to-l from-gray-900 to-gray-500 to-gray gap-6 place-items-center justify-center text-stone-100 text-center h-[calc(100vh-96px)]">
      <div className=" text-amber-300">
        <h2>Query by</h2>
      </div>
      <div>
        <h2>
          <Link href="/fetchdata/id">Id & Id Range</Link>
        </h2>
      </div>
      <div>
        <h2>
          <Link href="/fetchdata/name">First, Last, & Full Name</Link>
        </h2>
      </div>
      <div>
        <h2>
          <Link href="/fakedata">Fake Data</Link>
        </h2>
      </div>
    </main>
  );
}
