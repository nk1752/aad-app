'use client'
import { useMsal } from '@azure/msal-react'
import { useEffect } from 'react';

export default function LoginSplash() {

    const { instance, accounts, inProgress } = useMsal();
    const loginRequest = {
        scopes: ['User.Read']
      };

    // handle login 
    function handleLogin() {
        instance.loginPopup(loginRequest);
    }

    return (

        <main className=' flex flex-row text-stone-100 content-center items-center justify-center'>
            <div className=" bg-gray-700 text-amber-500 w-50 min-h-[10%] p-8 rounded-lg shadow-xl">
                <h1>Please Sign In</h1>
                <button 
                className= ' border border-blue-500 w-24 h-7 bg-gray-700 hover:bg-gray-800 text-stone-100 rounded-md'
                type='submit'  onClick={() => handleLogin()}>Sign In</button>
            </div>
    </main>

    )
}