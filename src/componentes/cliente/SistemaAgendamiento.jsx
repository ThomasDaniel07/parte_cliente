import React, { useEffect, useState } from 'react'
import { FormularioCita } from './sub_componentes/FormularioCita';
import { BiLogOutCircle } from 'react-icons/bi'
import GrillaCitas from './sub_componentes/GrillaCitas';
import MiCuenta from './sub_componentes/MiCuenta';
import axios from 'axios';

const SistemaAgendamiento = (props) => {

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
    <div className='bg-gray-100 h-screen flex flex-col justify-center items-center'>
      <div className='relative bg-white max-h-full overflow-auto text-black p-5 w-[90%] shadow-2xl text-xl font-["poppins"]'>
        <button onClick={cerrarSesion} title="Volver al inicio" className='bg-red-500 p-3 rounded-xl select-none text-white absolute right-5 flex items-center'>Cerrar sesion <BiLogOutCircle size={30} className="" /></button>
        <img src="http://dinamicappsco.s3-website-us-west-2.amazonaws.com/img/logo_pequ.png" alt="logo DinamicAPPS" width={160} className="mt-16 m-auto"/>
        <h1 className='text-xl text-center flex justify-around font-semibold uppercase'>Bienvenido {usuario} !</h1>
        <div className='flex flex-col w-full mt-4 justify-around'>
          <ul className='bg-red-400 p-2 flex text-xs sm:text-lg justify-around shadow-xl lg:max-h-max text-white'>
            <li className='p-3 text-center cursor-pointer hover:bg-red-500 duration-200 rounded-xl ease-linear' onClick={()=>{setVisibility(1)}}>Agendar una cita</li>
            <li className='p-3 text-center cursor-pointer hover:bg-red-500 duration-200 rounded-xl ease-linear' onClick={()=>{setVisibility(2)}}>Ver mis citas</li>
            <li className='p-3 text-center cursor-pointer hover:bg-red-500 duration-200 rounded-xl ease-linear' onClick={()=>{setVisibility(3)}}>Mi cuenta</li>
          </ul>
          <div className='w-full'>
            {visibility === 1 ? <FormularioCita visibility={visibility} /> :false}
            {visibility === 2 ? <GrillaCitas visibility={visibility}/>:false}
            {visibility === 3 ? <MiCuenta visibility={visibility} obtenerInformacion={informacion} />:false}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SistemaAgendamiento