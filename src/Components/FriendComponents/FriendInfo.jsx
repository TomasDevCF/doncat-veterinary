import axios from "axios";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientFriend from "../PatientComponents/PatientFriend";
import Friend from "./Friend";
import { toast } from "react-hot-toast";

export default function FriendInfo() {
  const { user_id } = useParams();

  const [copied, setCopied] = useState("");
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
  const [patients, setPatients] = useState(null);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    if (copied != "") {
      setTimeout(() => {
        setCopied("");
      }, 1500);
    }
  }, [copied]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL_API}/getuserbyid/${user_id}`)
      .then((r) => setData(r.data))
      .catch((e) => console.error(e));
    axios
      .get(`${import.meta.env.VITE_URL_API}/getpatientcount/${user_id}`)
      .then((r) => setCount(r.data.patient_count))
      .catch((e) => console.error(e));
    axios
      .get(`${import.meta.env.VITE_URL_API}/getpatients/${user_id}`)
      .then((r) => {
        setPatients(r.data);
      })
      .catch((e) => console.error(e));
    axios
      .get(`${import.meta.env.VITE_URL_API}/getfriends/${user_id}?accepted=1`)
      .then((r) => {
        setFriends(r.data);
        console.log(r);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="w-100 py-5 h-100 px-2">
      <div className="h-auto mt-4 col-12 rounded  bg-white py-3">
        <h1 className="text-center">Informacion de {data && data.name}</h1>
        <div className="d-flex justify-content-md-around justify-content-start flex-column flex-md-row align-items-center h-50">
          <div className="d-flex flex-column my-2">
            <h3>Nombre: {data && data.name}</h3>
            <button
              onClick={() => {
                copy(data.name);
                setCopied("name");
              }}
              className={`btn ${
                copied == "name" ? "btn-success" : "btn-warning"
              }`}
            >
              {copied == "name" ? "Copiado" : "Copiar"}
            </button>
          </div>
          <div className="d-flex flex-column my-2">
            <h3>ID: {data && data.user_id}</h3>
            <button
              onClick={() => {
                copy(data.user_id);
                toast.success("ID copiado correctamente", {position:"top-right", duration: 1500})
                setCopied("id");
              }}
              disabled={copied == "id"}
              className={`btn ${copied == "id" ? "btn-success" : "btn-warning"}`}
            >
              {copied == "id" ? "Copiado" : "Copiar"}
            </button>
          </div>
          <div className="d-flex flex-column my-2">
            <h3>Pacientes: {count && count}</h3>
            <button className="btn btn-warning hidden">Button hidden</button>
          </div>
        </div>
      </div>
      <div className="down h-50 w-100 d-flex row m-0 ">
        <div className="pe-md-1 py-2 col-12 col-md-6 p-0">
          <div className="  rounded min col-12 py-1 px-3 bg-white">
            <h3 className="h-auto">Pacientes</h3>
            <div className="border-black border overflow-auto rounded w-100 h-75 p-3">
              {patients &&
                patients.map((p) => (
                  <PatientFriend
                    animalName={p.animal_name}
                    fullName={p.full_name}
                    patientId={p.patient_id}
                    type={p.type}
                    key={p.patient_id}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="pe-md-1 py-2 col-12 col-md-6 p-0">
          <div className="  rounded min col-12 py-1 px-3 bg-white">
            <h3 className="h-auto">Amigos</h3>
            <div className="border-black border overflow-auto rounded w-100 h-75 p-2">
              {friends &&
                friends.map((p) => (
                  <Friend
                    isFriendly
                    f_id={p.friends_id}
                    id={p.user_id}
                    name={p.name}
                    key={p.friends_id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
