import { fetchPost } from "@/utils/request";
import { useRouter } from "next/router";
import { useState } from "react"

interface Iprops{
    ditType: string
}
export const useFetchSelectList = () => {
    const router = useRouter();
    const { locale: activeLocale } = router;
    const [list, setList] = useState([])
    console.log(activeLocale,'activeLocal')
    async function queryList(
        params: {
          dictType?: string;
        },
        options?: { [key: string]: any },
      ) {
        let res: Record<string, any> = await fetchPost('/dict/query', params, {
          'Content-Type': 'application/json',
        });
        let data = []
        if(res.code==='0'){
          (res.data || []).forEach((ele: Record<string, any>,id: React.Key) => {
            data = (ele?.list || []).map(ele => {
                if(activeLocale === 'en'){
                    return ele.englishName
                }else{
                    return ele.chineseName
                }
            })
          })
        }
        console.log(data,'data')
        return data;
      }

    return [queryList]
}