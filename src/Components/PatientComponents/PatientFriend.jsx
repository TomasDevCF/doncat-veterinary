export default function PatientFriend({patientId, type, animalName, fullName}) {
  return <div className={`patient mb-2 border-1 border border-dark p-2 pb-0 rounded d-flex justify-content-between`}>
      <div className="info-patient w-100 text-black">
        <p>
          <strong>ID del paciente:</strong> {patientId}
        </p>
        <p >
          <strong>Animal:</strong> {type}
        </p>
        <p>
          <strong>Nombre del animal:</strong> {animalName}
        </p>
        <p>
          <strong>Nombre del dueño:</strong> {fullName}
        </p>
      </div>
    </div>
}