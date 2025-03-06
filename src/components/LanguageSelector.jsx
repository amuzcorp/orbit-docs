'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const languages = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
]

export function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  
  const currentLocale = pathname.split('/')[1] || 'ko'
  
  const handleLanguageChange = (langCode) => {
    const newPathname = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    router.push(`/${langCode}${newPathname}`)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
        {languages.find(lang => lang.code === currentLocale)?.label}
        <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800">
          <div className="py-1">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageChange(language.code)}
                    className={clsx(
                      active ? 'bg-zinc-100 dark:bg-zinc-700' : '',
                      'block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    {language.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 