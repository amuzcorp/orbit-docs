import { NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['ko', 'en']
const defaultLocale = 'ko'

function getLocale(request) {
  const negotiatorHeaders = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return matchLocale(languages, locales, defaultLocale)
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    // Handle root path specifically
    const newPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
    return NextResponse.redirect(new URL(newPath, request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
} 