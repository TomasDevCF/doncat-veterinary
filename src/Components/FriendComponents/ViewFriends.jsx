import { useEffect, useState } from "react";
import Friend from "./Friend";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../UserContext";

export default function ViewFriends() {
  const { info } = useUserContext();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_URL_API}/getfriends/${info.id}?accepted=1`)
      .then((r) => {
        console.log(r);
        setData(r.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-100 h-100 pt-5 pb-3 px-4 ">
      <div className="navigation-friends mt-4 d-flex flex-md-row flex-column px-md-0 px-5">
        <Link to="/friends" className="btn fs-6 m-2 btn-success">
          Lista de amigos
        </Link>
        <Link to="/friends/add" className="btn fs-6 m-2 btn-info">
          Agregar amigos
        </Link>
        <Link to="/friends/requests" className="btn fs-6 m-2 btn-info">
          Solicitudes de amistad
        </Link>
      </div>
      <form className="rounded search mt-2 px-2 bg-white w-100 d-flex py-2 justify-content-between">
        <div className="d-flex flex-md-row flex-column w-100 row ps-2">
          {id == "" && (
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Buscar por nombre..."
              className="ps-1 rounded col-12 col-md-5 border border-1 border-black m-1"
            />
          )}
          {name == "" && (
            <input
              placeholder="Buscar por ID..."
              type="number"
              min={1}
              onChange={(e) => setId(e.target.value)}
              className="ps-1 rounded col-12 col-md-5 border border-1 border-black m-1"
            />
          )}
        </div>
      </form>
      <div className="rounded friend-list h-friend-list mt-2 px-2 bg-white w-100 py-2 d-flex flex-column align-items-center w-100 overflow-y-auto">
        {data &&
          data.map((r) => {
            if (name != "") {
              if (
                r.name.includes(name) ||
                r.name.toLowerCase().includes(name.toLowerCase())
              ) {
                return (
                  <Friend
                    f_id={r.friends_id}
                    id={r.user_id}
                    name={r.name}
                    setData={setData}
                    key={r.friends_id}
                  />
                );
              }
            } else if (id != "") {
              if (r.user_id.toString().includes(id)) {
                return (
                  <Friend
                    f_id={r.friends_id}
                    id={r.user_id}
                    name={r.name}
                    setData={setData}
                    key={r.friends_id}
                  />
                );
              }
            } else {
              return (
                <Friend
                  f_id={r.friends_id}
                  id={r.user_id}
                  name={r.name}
                  setData={setData}
                  key={r.friends_id}
                />
              );
            }
          })}
        {loading && (
          <div
            className="spinner-border text-center text-black my-3"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}
