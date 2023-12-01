'use client'
import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'

export default function CurrentUser() {

    const { instance, accounts, inProgress } = useMsal();
    const [user, setUser] = useState('no user signed in');
    
   // get current user
    useEffect(() => {

        console.log('from useEffect accounts: ', accounts);
        
        if (accounts.length > 0) {
            const currentAccount = accounts[0];
            console.log('from useEffect currentAccount: ', currentAccount);
            console.log('from useEffect Claims: ', currentAccount.idTokenClaims);
            console.log('from useEffect Groups: ', currentAccount.idTokenClaims?.groups);

            const name = currentAccount.name;
            const groups = currentAccount.idTokenClaims?.groups;
            
            if (name) {
                setUser(name);
                
                console.log('from useEffect user: ', name);
            }           
        } else {
            setUser('no user signed in');
        }

    }, [accounts, inProgress, instance]) 
   

    return (
        <div>
            {user}
        </div>
        
    )
    
}