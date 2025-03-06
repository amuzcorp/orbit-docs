import { notFound } from 'next/navigation'

export default async function Page({ params: { locale } }) {
  const PageComponent = (await import(`./page.${locale}.mdx`)).default
  if (!PageComponent) {
    notFound()
  }
  return <PageComponent />
}
