import Sidebar from "./components/sidebar";

export default function DataLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className=" flex flex-row h-[calc(100vh-96px)] ">  
          <div className=" w-1/12">
              <Sidebar />
          </div>
  
          <div className="w-11/12 bg-gradient-to-r from-gray-900 to-gray-700 text-stone-100 ">
                  { children }
          </div> 
      </main>
    );
  }