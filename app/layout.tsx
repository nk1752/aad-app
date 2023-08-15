'use client'
import './globals.css'
import type { Metadata } from 'next'

import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { PublicClientApplication, Configuration, EventType, EventMessage } from '@azure/msal-browser'

import Topbar from './components/topbar'
import LoginSplash from './components/loginSplash'
import { getSecret } from "@/utils/azKeyVault";

const metadata: Metadata = {
  title: 'RSC | AAD | Prisma',
  description: 'RSC, Prisma ORM, and AAD',
}

// MSAL configuration
const msalConfig: Configuration = {
  auth: {
    clientId: 'ddec4f98-52aa-40b2-801e-31531e319288',
    authority: 'https://login.microsoftonline.com/7cb752a7-6dfd-429e-adc9-129f0ea3fcec',
    redirectUri: '/',
  },
};

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
