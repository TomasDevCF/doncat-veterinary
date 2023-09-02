import axios from "axios";
import { useUserContext } from "../../UserContext";

export default function RequestFriend({ id, name, f_id, setData }) {
  const { info } = useUserContext();

  const deleteRequest = () => {
    axios
      .delete(`${import.meta.env.VITE_URL_API}/deletefriend/${f_id}`)
      .then(() => {
        axios
          .get(
            `${import.meta.env.VITE_URL_API}/getfriends/${info.id}?accepted=0`
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

  const acceptRequest = () => {
    axios
      .put(`${import.meta.env.VITE_URL_API}/acceptfriend/${f_id}`)
      .then((res) => {
        axios
          .get(
            `${import.meta.env.VITE_URL_API}/getfriends/${info.id}?accepted=0`
          )
          .then((r) => {
            console.log(r);
            setData(r.data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-100">
      <div className="border border-black rounded w-100 d-flex justify-content-between align-items-center px-2 py-1 my-2">
        <div className="d-flex justify-content-between ">
          <p className="m-0 me-5">
            <span className="text-black fw-bold">Nombre: </span>
            {name}
          </p>
          <p className="m-0">
            <span className="text-black fw-bold">ID: </span>
            {id}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <i
            onClick={() => deleteRequest()}
            className="fs-4 i-close bi bi-x-lg me-2"
          ></i>
          <i
            onClick={() => acceptRequest()}
            className="fs-4 i-finish bi bi-check-lg me-2"
          ></i>
        </div>
      </div>
    </div>
  );
}
