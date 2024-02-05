import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToasterContext from '@/context/ToasterContext'
import AuthContext from '@/context/AuthContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Liao',
  description: '随心所欲的聊天吧!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
