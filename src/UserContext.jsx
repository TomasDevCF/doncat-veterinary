import { createContext, useContext, useMemo, useState, useEffect } from "react";
const userContext = createContext()

export default function UserContext({children}) {

  const [info, setInfo] = useState(null)
  let localInfo 


    localInfo = JSON.parse(localStorage.getItem("userInfo"))


    if (info != null) {
      localStorage.setItem("userInfo", JSON.stringify(info))
    } else {
      if (localInfo != null) {
        setInfo(JSON.parse(localStorage.getItem("userInfo")))
      }
    }

  const value = useMemo(() => {
    return ({
      info,
      setInfo
    })
  }, [info])
  
  return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export function useUserContext() {
  const context = useContext(userContext)
  return context
}