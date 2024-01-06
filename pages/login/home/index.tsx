import React from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import { Form, Input, Button } from 'antd-mobile'
import { useRouter } from 'next/router'
import { language } from '@/utils/language'

const Home = () => {
    const router = useRouter();
    const { locale: activeLocale } = router;

    return (
        <div className="w-full h-full">
            <div className="relative bg-[url('/background.png')] bg-cover h-[56.5%]">
                <Header />
            </div>

            <div className="p-[27px] pt-[27.5px]">
                <div className="mb-[54.5px] text-light-color text-[26px] font-light">
                {language[activeLocale || 'zh']?.hello}
                </div>
                <div className="text-center">
                    <Button
                        color="primary"
                        fill="solid"
                        className="w-[321px] !h-[46px] !mb-[31px] primary-solid-button"
                        onClick={() => {
                            router.push('/login')
                        }}>
                        {language[activeLocale || 'zh']?.login}
                    </Button>
                    <Button
                        color="primary"
                        fill="outline"
                        className="w-[321px] !h-[46px] primary-outline-button"
                        onClick={() => {
                            router.push('/register')
                        }}>
                        {language[activeLocale || 'zh']?.regisit}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home
