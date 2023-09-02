import { Link } from "react-router-dom";

export default function FriendConfig({name, id}) {
  return (
    <div className="w-100">
      <div className="border border-black rounded w-100 d-flex justify-content-sm-between justify-content-center flex-sm-row flex-column align-items-center px-2 py-1 my-2">
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
        <div className="d-flex align-items-center mt-sm-0 mt-2">
          <Link to={`/friends/info/${id}`} className="btn btn-primary">Ver informacion</Link>
        </div>
      </div>
    </div>
  )
}