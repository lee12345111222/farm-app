import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import LocaleSwitcher from '../components/locale-switcher'
import Home from './home'
export default function IndexPage() {
    const router = useRouter()
    const { locale, locales, defaultLocale } = router

    return (
        <Layout>
            <Home></Home>
        </Layout>
    )
}
