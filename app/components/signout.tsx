'use client'
import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react';

export default function Signout() {
    const { instance, accounts } = useMsal();
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (accounts.length > 0) {
            setStatus("Sign Out");
        } else {
            setStatus("");
        }
    }, [accounts]);

    if (status === "Sign In") {
        return (
            <div>
                <button onClick={() => {
                    instance.loginPopup({ scopes: ['User.Read'] });
                }}>
                    {status}
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => {
                    instance.logoutPopup({ account: accounts[0] });
                }}>
                    {status}
                </button>
            </div>
        )
    }

}
