import axios from "axios";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../../UserContext";

export default function FriendInfoBlock({ children }) {
  const { user_id } = useParams();
  const { info } = useUserContext();
  const [authorized, setAuthorized] = useState(null);

  axios
    .get(`${import.meta.env.VITE_URL_API}/getfriend/${info.id}/${user_id}`)
    .then((res) => {
      if (res.data) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    })
    .catch(() => setAuthorized(null));

  if (info == user_id) {
    return <Navigate to="/config" />;
  } else if (authorized == null) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div
          className="spinner-border text-center text-white my-3"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (authorized == true) {
    return children;
  } else {
    return <Navigate to="/friends" />;
  }
}
