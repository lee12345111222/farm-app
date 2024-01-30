import Link from 'next/link'
import { useRouter } from 'next/router'
// import Layout from '../components/layout'
import LocaleSwitcher from '../components/locale-switcher'
import LoginHome from './login/home'
export default function IndexPage() {
    const router = useRouter()
    const { locale, locales, defaultLocale } = router

    return (
        // <Layout>
            <LoginHome></LoginHome>
        // </Layout>
    )
}
