import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"
import { HYPARKING_AUTH } from "../constants/constant"
import { authAtom } from "../stores/state"

const ProtectRouter = ({ children }) => {
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false)
  const setUser = useSetRecoilState(authAtom)
  const router = useRouter()


  const initialize = () => {
    try {
      const jsonValue = localStorage.getItem(HYPARKING_AUTH)
      if (jsonValue !== null) {
        const userInfo = JSON.parse(jsonValue)
        setUser({
          accessToken: userInfo.accessToken,
          isLoggedIn: true
        })
        setIsLoadingCompleted(true) 
      } else {
        router.push("/")
        setIsLoadingCompleted(true)
      }
    } catch (error) {
      console.log(error)
    }    
  }

  useEffect(() => {
    initialize()
  }, [])

  if (!isLoadingCompleted) {
    return null
  }
  
  return (
    <>
      {children}
    </>
  )
}

export default ProtectRouter