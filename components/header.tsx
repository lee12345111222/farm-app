import React from 'react'
import Menu from './side-menu'
import { useRouter } from 'next/navigation'
interface IHeader {
    logo?: boolean
    home?: boolean
}
const Header = (props: IHeader) => {
    const { logo, home } = props
    const router = useRouter()
    return (
        <div className="w-full flex justify-between items-center absolute top-[67px] right-[12px]">
            {logo && (
                <img
                    className="ml-[40px] w-[26px] h-[26px]"
                    src={`${home ? '/home_slices/logo-white.png' : '/logo.png'}`}
                    alt="logo"
                    onClick={() => router.push('/')}
                />
            )}
            <Menu home={home} />
        </div>
    )
}

export default Header
