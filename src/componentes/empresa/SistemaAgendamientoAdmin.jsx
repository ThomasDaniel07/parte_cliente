import React, {useState,useEffect} from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import axios from 'axios';
import MiCuenta from '../cliente/sub_componentes/MiCuenta';
import GrillaCitas from './GrillaCitas';
import ProgramadorHorarios from './ProgramadorHorarios';

const SistemaAgendamientoAdmin = (props) => {

  const [visibility,setVisibility] = useState(2);
  const [informacion,setInformacion] = useState({});

  const cerrarSesion = ()=>{
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("tipo_usuario");
    props.aparecerInicio();
  }

  const usuario = sessionStorage.getItem("nombre_usuario").split(" ")[0];

  const obtenerInformacion = async ()=>{
    let nombre = {"nombre_usuario":sessionStorage.getItem("nombre_usuario")};
    let peticion = await axios.post("http://localhost:3001/obtenerInformacionUsuario",nombre);
    setInformacion(peticion.data);
  }
  
  useEffect(()=>{
    obtenerInformacion()
  },[])

  return (
    <div className='bg-gray-200 flex flex-col justify-center h-screen'>
      <div className='bg-white rounded-xl p-4 shadow-xl w-[90%] m-auto overflow-y-auto relative font-["poppins"]'>
        <button onClick={cerrarSesion} title="Volver al inicio" className='bg-red-500 p-3 rounded-xl select-none text-white absolute right-5 flex items-center'>Cerrar sesion <BiLogOutCircle size={30} className="" /></button>
        <img src="http://dinamicappsco.s3-website-us-west-2.amazonaws.com/img/logo_pequ.png" alt="logo DinamicAPPS" width={160} className="mt-16 m-auto"/>
        <h1 className='text-xl text-center flex justify-around font-semibold uppercase'>Bienvenido {usuario} !</h1>
        <div className='flex flex-col w-full mt-4 justify-around'>
          <ul className='bg-red-400 p-2 flex text-xs sm:text-2xl justify-around shadow-xl lg:max-h-max text-white'>
            <li className='p-3 text-base text-center cursor-pointer hover:bg-red-500 duration-200 rounded-xl ease-linear' onClick={()=>{setVisibility(1)}}>Establecer horario de citas</li>
            <li className='p-3 text-base text-center cursor-pointer hover:bg-red-500 duration-200 rounded-xl ease-linear' onClick={()=>{setVisibility(2)}}>Ver citas solicitadas</li>
            <li className='p-3 text-base text-center cursor-pointer hover:bg-red-500 duration-200 rounded-xl ease-linear' onClick={()=>{setVisibility(3)}}>Mi cuenta</li>
          </ul>
          <div>
            {visibility === 1 ? <ProgramadorHorarios visibility={visibility} /> :false}
            {visibility === 2 ? <GrillaCitas visibility={visibility}/>:false}
            {visibility === 3 ? <MiCuenta visibility={visibility} obtenerInformacion={informacion} />:false} 
          </div>
        </div>
      </div>
    </div>
  )
}

export default SistemaAgendamientoAdmin