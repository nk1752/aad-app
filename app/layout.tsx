import './globals.css'
import type { Metadata } from 'next'

import Topbar from './components/topbar'


export const metadata: Metadata = {
  title: 'RSC | AAD | Prisma',
  description: 'RSC, Prisma ORM, and AAD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className="bg-gradient-to-r from-gray-900 to-gray-700 text-stone-100 ">  
          <main >
              <Topbar />
              {children}
          </main>
        </body>
    </html>
  )
}
