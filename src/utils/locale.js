export function getLocalizedPath(path, locale = 'ko') {
  if (path.startsWith('/')) {
    return `/${locale}${path === '/' ? '' : path}`
  }
  return `/${locale}/${path}`
} 