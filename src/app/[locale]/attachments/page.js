import { notFound } from 'next/navigation'
import KoPage from './page.ko.mdx'
import EnPage from './page.en.mdx'

const pages = {
  ko: KoPage,
  en: EnPage,
}

export default function Page({ params: { locale } }) {
  const PageComponent = pages[locale]

  if (!PageComponent) {
    notFound()
  }

  return <PageComponent />
}

export async function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }]
} 