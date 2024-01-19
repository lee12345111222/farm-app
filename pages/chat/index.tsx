import Header from '@/components/header'
import { Input } from 'antd-mobile'
import React, { useState, useEffect, useRef } from 'react'
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import { SearchIndex } from 'emoji-mart'

const Chat = () => {
    const [height, setHeight] = useState('100%')
    const [message, setMessage] = useState([
        {
            id: 1,
            text: '这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字',
            type: 'receive',
            avatar: '/user_photo.png',
        },
        {
            id: 2,
            text: '这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字这是文字',
            type: 'send',
            avatar: '/user_photo2.png',
        },
    ])
    const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const v = (e.target as any).value
        setMessage((pre) => {
            return [
                ...pre,
                {
                    id: message.length + 1,
                    text: v,
                    type: 'send',
                    avatar: '/user_photo2.png',
                },
            ]
        })
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight)
        }, 100)
    }
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const height = ref.current?.clientHeight!
        const bodyHeight = document.body?.clientHeight
        if (height > bodyHeight) {
            setHeight(height + 'px')
        } else {
            setHeight(bodyHeight + 'px')
        }
    }, [ref.current?.clientHeight])
    // console.log(data, 'data')
    // async function search(value: any) {
    //     const emojis = await SearchIndex.search(value)
    //     const results = emojis.map((emoji: { skins: { native: any }[] }) => {
    //       return emoji.skins[0].native
    //     })
      
    //     console.log(results)
    //   }
    return (
        <div className="w-full  bg-[#F5F5F5] relative" style={{ height }}>
            <Header logo />
            {/* <Picker data={data} onEmojiSelect={(e: any) => {onEnterPress({target: {value:e.native}});console.log(e)}} /> */}
            <div className="pt-[134px] pb-[101px] text-white" ref={ref}>
                {message.map((item) => {
                    return (
                        <div key={item.id}>
                            {item.type === 'receive' ? (
                                <div className="flex pl-[20px] mb-[35px] pr-[75px]">
                                    <img
                                        className="w-[50px] h-[50px] mr-[8px] "
                                        src={item.avatar}
                                        alt=""
                                    />
                                    <div className="p-[10px] bg-[#79E1BE] rounded-lg rounded-tl-none">
                                        {item.text}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-row-reverse pr-[20px] mb-[35px] pl-[75px]">
                                    <img className="w-[50px] h-[50px]" src={item.avatar} alt="" />
                                    <div className="bg-[#4682B4] p-[10px] mr-[8px] rounded-lg rounded-tr-none">
                                        {item.text}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className=" w-full flex items-center fixed bottom-0 left-0 h-[101px] bg-white pt-[14px] pl-[15px] pb-[45px] pr-[10px]">
                <Input
                    onEnterPress={onEnterPress}
                    className="border border-transparent	 w-[272px] h-[40px] !bg-[#F5F5F5] rounded-lg"></Input>
                <img className="ml-[10px] w-[27px] h-[27px]" src="/news/expression.png" alt="menu" />
                <img className="ml-[10px] w-[27px] h-[27px]" src="/news/add.png" alt="menu" />
            </div>
        </div>
    )
}

export default Chat
