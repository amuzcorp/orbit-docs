import '@/styles/tailwind.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'
import { app } from '@/lib/firebase'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    template: '%s - CMS Orbit',
    default: 'Documentation',
  },
}

export default function RootLayout({ children }) {
  console.log(app.name);
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
