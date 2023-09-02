
import { Link } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <>

        <div className="top d-flex w-100 flex-column justify-content-center align-items-center h-100">
          <h1 className='text-white' >Administra tus pacientes en Veterinaria Doncat.</h1>
          <div className="button-container mt-3">
            <Link to="/signup" className="btn btn-dark box-shadow-btn d-flex justify-content-center align-items-center">Ingresar</Link>
          </div>
        </div>

    </>
  )
}

export default App
