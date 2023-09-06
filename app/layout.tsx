import { Header } from '@/components/Header'
import "@/styles/globals.css"
import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import { Provider } from '@/components/Provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Footer } from '@/components/Footer'

const sora = Sora({ 
  subsets: ['latin'],
  weight: ["400", "500", "700"]
})

export const metadata: Metadata = {
  title: 'Elysium',
  description: 'Share and discover new Books',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}){
  return (
    <html lang="pt-br">
      <body className={sora.className}>
        <Provider>
          <Header/>
          {children}
          <ToastContainer/>
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
