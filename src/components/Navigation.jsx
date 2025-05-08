'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'

function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, children }) {
  const { locale } = useParams()

  const isExternalLink = href.startsWith('http')
  const localizedHref = href === '/' ? `/${locale}` : `/${locale}${href}`

  return (
    <li className="md:hidden">
      <Link
        href={isExternalLink ? href : localizedHref}
        target={isExternalLink ? '_blank' : undefined}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}) {
  const { locale } = useParams()
  const localizedHref = isAnchorLink ? `/${locale}${href}` : `/${locale}${href}`

  return (
    <Link
      href={localizedHref}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function VisibleSectionHighlight({ group, pathname }) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({ group, className }) {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation,
  )
  const { locale } = useParams()

  // 현재 경로에서 locale을 제거하여 비교
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '')
  
  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathWithoutLocale) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight 
              group={group} 
              pathname={pathWithoutLocale} 
            />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker 
              group={group} 
              pathname={pathWithoutLocale} 
            />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink 
                href={link.href} 
                active={link.href === pathWithoutLocale}
              >
                {link.title}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {link.href === pathWithoutLocale && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`/${locale}${link.href}#${section.id}`}
                          className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm transition text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                        >
                          <span className="truncate">{section.title}</span>
                          {section.tag && (
                            <Tag variant="small" color="zinc">
                              {section.tag}
                            </Tag>
                          )}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const navigation = [
  {
    title: '시작하기',
    links: [
      { title: 'CMS-Orbit란?', href: '/introduction/what-is-cms-orbit' },
      { title: '주요 기능', href: '/introduction/features' },
      { title: '시스템 요구사항', href: '/introduction/requirements' },
      { title: '설치', href: '/installation' },
      { title: '빠른 시작', href: '/quick-start' },
    ],
  },
  {
    title: '데이터 유형',
    links: [
      { title: '기본 관계', href: '/data-types/relationships' },
      { title: '모델', href: '/data-types/models' },
      { title: '엔티티', href: '/data-types/entities' },
      { title: '문서', href: '/data-types/documents' },
    ],
  },
  {
    title: '멀티사이트',
    links: [
      { title: '멀티사이트 기본', href: '/multi-site/basics' },
      { title: '사이트 관리', href: '/multi-site/management' },
      { title: '사이트 격리', href: '/multi-site/isolation' },
      { title: '사이트 이벤트', href: '/multi-site/events' },
      { title: '사이트 미들웨어', href: '/multi-site/middleware' },
    ],
  },
  {
    title: '관리자 패널',
    links: [
      { title: 'Orchid 플랫폼', href: '/admin-panel/orchid' },
      { title: '리소스 관리', href: '/admin-panel/resources' },
      { title: '사용자 관리', href: '/admin-panel/users' },
    ],
  },
  {
    title: '테마',
    links: [
      { title: '테마 구조', href: '/theme/structure' },
      { title: '테마 커스터마이징', href: '/theme/customization' },
      { title: '테마 배포', href: '/theme/deployment' },
    ],
  },
  {
    title: '다국어 지원',
    links: [
      { title: '언어 설정', href: '/localization/language' },
      { title: '번역 관리', href: '/localization/translation' },
    ],
  },
  {
    title: 'API 개발',
    links: [
      { title: 'API 기본', href: '/api/basics' },
      { title: 'API 엔드포인트', href: '/api/endpoints' },
      { title: 'API 보안', href: '/api/security' },
    ],
  },
  {
    title: '사이트 설정',
    links: [
      { title: '설정 기본', href: '/site-configs/basics' },
      { title: '사이트설정 사용', href: '/site-configs/usage' },
      { title: '기본 사이트설정 그룹', href: '/site-configs/groups' },
    ],
  },
  {
    title: '고급 기능',
    links: [
      { title: '이벤트 시스템', href: '/advanced/events' },
      { title: '캐싱', href: '/advanced/caching' },
      { title: '큐 시스템', href: '/advanced/queue' },
    ],
  },
  {
    title: '배포 및 유지보수',
    links: [
      { title: '배포', href: '/deployment/main' },
      { title: '모니터링', href: '/deployment/monitoring' },
      { title: '백업 및 복구', href: '/deployment/backup' },
    ],
  },
  {
    title: '문제 해결',
    links: [
      { title: '일반적인 문제', href: '/troubleshooting/common' },
      { title: '오류 코드', href: '/troubleshooting/errors' },
      { title: 'FAQ', href: '/troubleshooting/faq' },
    ],
  },
]

export function Navigation(props) {
  const { locale } = useParams()
  
  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="/">Documentation</TopLevelNavItem>
        <TopLevelNavItem href="https://amuz.co.kr" target={'_blank'}>AmuzOfficial</TopLevelNavItem>
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
        
        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Button href="#" variant="filled" className="w-full">
            v 3.0
          </Button>
        </li>
      </ul>
    </nav>
  )
}
