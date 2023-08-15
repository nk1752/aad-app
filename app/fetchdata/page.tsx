

export default function Page() {

    return (
        <main className=' flex flex-row text-stone-100 content-center items-center justify-center'>
            <div className=" bg-gray-700 text-amber-500 w-50 min-h-[10%] p-8 rounded-lg shadow-xl">
                <h1>Weather Home Page</h1><br />
                <p>{process.env.DATABASE_URL}</p>
            </div>
        </main>
    );
}