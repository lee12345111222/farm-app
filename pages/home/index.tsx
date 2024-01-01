'use client'
import React from 'react'
import { NavBar, Space, Toast } from 'antd-mobile'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'

// import './index.css'

export default () => {
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline />
        <MoreOutline />
      </Space>
    </div>
  )

  const back = () =>
    Toast.show({
      content: '点击了返回区域',
      duration: 1000,
    })

  return (
    <>
        <NavBar onBack={back}>
          <div>
            <div>标题</div>
            <div className='my-nav-bar-subtitle'>副标题</div>
          </div>
        </NavBar>
    </>
  )
}