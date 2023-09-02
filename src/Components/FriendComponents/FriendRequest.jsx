import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import axios from "axios";
import RequestFriend from "./RequestFriend";

export default function FriendRequest() {
  const { info } = useUserContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL_API}/getfriends/${info.id}?accepted=0`)
      .then((r) => {
        console.log(r);
        setData(r.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="w-100 h-100 d-flex flex-column pt-5 px-4">
      <div className="navigation-friends mt-4 d-flex flex-md-row flex-column px-md-0 px-5">
        <Link to="/friends" className="btn fs-6 m-2 btn-info">
          Lista de amigos
        </Link>
        <Link to="/friends/add" className="btn fs-6 m-2 btn-info">
          Agregar amigos
        </Link>
        <Link to="/friends/requests" className="btn fs-6 m-2 btn-success">
          Solicitudes de amistad
        </Link>
      </div>
      <div className="d-flex py-3 justify-content-center align-items-center w-100 h-100">
        <div className="bg-white rounded pt-3 col-md-6 col-12 h-100 px-3">
          <h1 className="text-center">Solicitudes de amistad</h1>
          <div className="border rounded w-100 h-75 mt-4 border-black px-2 overflow-y-auto">
            {data &&
              data.map((d) => (
                <RequestFriend
                  f_id={d.friends_id}
                  id={d.user_id}
                  name={d.name}
                  setData={setData}
                  key={d.friends_id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
