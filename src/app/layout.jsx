import '@/styles/tailwind.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    template: '%s - Protocol API Reference',
    default: 'Protocol API Reference',
  },
}

export default function RootLayout({ children }) {
  return (
    <html className={`h-full ${inter.className}`} suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900" suppressHydrationWarning>
        <Providers>
          <div className="w-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
