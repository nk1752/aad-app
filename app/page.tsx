
export default function Page() {

  return (
    <main className=' flex flex-row text-stone-100 content-center items-center justify-center'>
      <div className=" bg-gray-700 text-amber-500 w-50 min-h-[10%] p-8 rounded-lg shadow-xl">
          env test<br />
          UMI_CLIENT_ID: {process.env.UMI_CLIENT_ID}<br /><br />
          SECRET_VAULT_NAME: {process.env.SECRET_VAULT_NAME}<br />
      </div>
    </main>
  );
}
