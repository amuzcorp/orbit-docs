import { notFound } from 'next/navigation'
import {locales} from "@/lib/locales";

export default async function Page({ params: { locale } }) {
  const PageComponent = (await import(`./page.${locale}.mdx`)).default
  if (!PageComponent) {
    notFound()
  }
  return <PageComponent />
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
} 