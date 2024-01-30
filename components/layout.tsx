import { useDispatch, userSlice } from "@/lib/redux"
import { useEffect } from "react"

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        let res = JSON.parse(localStorage.getItem("user") || "{}")
        if(Object.keys(res)?.length){
            dispatch(userSlice.actions.updateState({user: res}))
        }
    },[])
    return (
        <>
            <main>{children}</main>
        </>
    )
}
