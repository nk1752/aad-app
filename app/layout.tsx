'use client'
import './globals.css'
import type { Metadata } from 'next'

import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { PublicClientApplication, Configuration, EventType, EventMessage } from '@azure/msal-browser'

import Topbar from './components/topbar'
import LoginSplash from './components/loginSplash'
import { getSecret } from "@/utils/azKeyVault";

import { msalConfig } from '@/authN/authConfig'

const metadata: Metadata = {
  title: 'RSC | AAD | Prisma',
  description: 'RSC, Prisma ORM, and AAD',
}




// MSAL instance
const pca = new PublicClientApplication(msalConfig);


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-gray-900 to-gray-700 text-stone-100 ">
        <MsalProvider instance={pca}>
          <main >
            <Topbar />
            <AuthenticatedTemplate>
              {children}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <LoginSplash />
            </UnauthenticatedTemplate>
          </main>
        </MsalProvider>
      </body>
    </html>
  )
}
