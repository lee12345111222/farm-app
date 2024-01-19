import Link from 'next/link'
import { useRouter } from 'next/router'

interface Iprops{
  children: React.ReactNode
}
export default function LocaleSwitcher(props: Iprops) {
  const router = useRouter()
  const { locales, locale: activeLocale } = router

  console.log(locales, activeLocale)

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale
  )

  return (
    <>
     
        {otherLocales.map((locale) => {
          const { pathname, query, asPath } = router
          console.log(pathname, query, asPath )
          return (
            <span key={locale}>
              <Link
                href={{ pathname, query }}
                as={asPath}
                replace
                locale={locale}
                legacyBehavior
              >
               {props.children}
              </Link>
            </span>
          )
        })}
    </>
  )
}
