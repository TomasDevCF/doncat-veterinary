
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";

export default function BlockRout({children, type}) {
  const {info} = useUserContext()

    if (type == "auth") {
      if (info) {
        return <Navigate to="/panel"/>
      } else {
        return children
      }
    } else if (type == "page") {
      if (!info) {
        return <Navigate  to="/signup"/>
      } else {
        return children
      }
    }
}
