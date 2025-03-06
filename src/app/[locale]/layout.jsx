import glob from 'fast-glob'
import { Layout } from '@/components/Layout'

export default async function LocaleLayout({ children, params: { locale } }) {
  let pages = await glob(`**/*.${locale}.mdx`, { cwd: `src/app/[locale]` })
  let allSectionsEntries = await Promise.all(
    pages.map(async (filename) => {
        let pathName = filename
          .replace(new RegExp(`(^|/)page\\.${locale}\\.mdx$`), '')
          .replace(/(^|\/)index$/, '')
          .replace(/\/$/, '');
        let fullPath;
        if(pathName === ""){
            fullPath = '/' + locale;
        }else{
            fullPath = '/' + locale + '/' + pathName
        }
      return [fullPath,(await import(`./${filename}`)).sections]
    }),
  )
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <Layout allSections={allSections}>
      {children}
    </Layout>
  )
}

export async function generateStaticParams() {
  return [
    { locale: 'ko' },
    { locale: 'en' }
  ]
} 