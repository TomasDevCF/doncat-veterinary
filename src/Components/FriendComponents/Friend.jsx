import axios from "axios";
import { useUserContext } from "../../UserContext";
import { Link } from "react-router-dom";

export default function Friend({
  id,
  name,
  f_id,
  setData,
  isFriendly = false,
}) {
  const { info } = useUserContext();

  const deleteFriend = () => {
    axios
      .delete(`${import.meta.env.VITE_URL_API}/deletefriend/${f_id}`)
      .then(() => {
        axios
          .get(
            `${import.meta.env.VITE_URL_API}/getfriends/${info.id}?accepted=1`
          )
          .then((r) => {
            console.log(r);
            setData(r.data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-100">
      <div
        className={`border border-black rounded w-100 d-flex justify-content-sm-between justify-content-start align-items-center px-2 my-2 flex-sm-row flex-column ${
          isFriendly ? "py-2" : "py-1"
        }`}
      >
        <div className="d-flex justify-content-between mb-sm-0 mb-2 col-sm-6 col-12">
          <p className="m-0 me-5">
            <span className="text-black fw-bold">Nombre: </span>
            {name}
          </p>
          <p className="m-0">
            <span className="text-black fw-bold">ID: </span>
            {id}
          </p>
        </div>
        {!isFriendly && (
          <div className="d-flex align-items-center col-sm-6 col-12 justify-content-sm-end justify-content-between ">
            <i
              onClick={() => deleteFriend()}
              className="fs-4 i-close bi bi-trash me-2"
            ></i>
            <Link to={`/friends/info/${id}`} className="btn btn-primary">
              Ver informacion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
