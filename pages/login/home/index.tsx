import React from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import { Form, Input, Button } from 'antd-mobile'
import { useRouter } from 'next/navigation'

const Home = () => {
    const router = useRouter()

    return (
        <div className="w-full h-full">
            <div className="relative bg-[url('/background.png')] bg-cover h-[56.5%]">
                <Header />
            </div>

            <div className="p-[27px] pt-[27.5px]">
                <div className="mb-[54.5px] text-light-color text-[26px] font-light">
                    您好！歡迎登錄
                </div>
                <div className="text-center">
                    <Button
                        color="primary"
                        fill="solid"
                        className="w-[321px] !h-[46px] !mb-[31px] primary-solid-button"
                        onClick={() => {
                            router.push('/login')
                        }}>
                        登入
                    </Button>
                    <Button
                        color="primary"
                        fill="outline"
                        className="w-[321px] !h-[46px] primary-outline-button"
                        onClick={() => {
                            router.push('/register')
                        }}>
                        註冊
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home
