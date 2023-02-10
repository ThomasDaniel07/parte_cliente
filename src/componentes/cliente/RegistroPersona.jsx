import React from 'react'
import { useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import swal from 'sweetalert';
import axios from 'axios';

const RegistroPersona = (props) => {

  const [entradaData, setEntradaData] = useState({
    "nombre":"",
    "tipo_documento":"",
    "documento":null,
    "correo":"",
    "correo_verificado":"",
    "celular":null,
    "contraseña":null
  });

  const actualizarData = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setEntradaData(values => ({...values,[name]:value}));
  }

  const registrarUsuario = async(event) =>{

    event.preventDefault();
    
    if (entradaData.nombre.length === 0 || entradaData.tipo_documento.length === 0 || entradaData.documento === null || entradaData.correo.length === 0 || entradaData.correo_verificado.length === 0 || entradaData.celular === null) {
      swal({
        title:"Estimado usuario",
        text:"Por favor complete los campos",
        icon:"error"
      })
    }else {
      if (entradaData.correo !== entradaData.correo_verificado) {
        swal({
          title:"Estimado usuario",
          text:"Los correos no son los mismo, porfavor digitelos de nuevo",
          icon:"error"
        })
      }else {
        let request = await axios.post("http://localhost:3001/registroUsuario",entradaData);
    
        if (request.data.estado === true) {
          swal({
            title:"Registro exitoso !",
            text:request.data.mensaje,
            icon:"success"
          })
          props.aparecerLogin();
        }
      }
    }
    event.target.reset();
  }

  return (
    <div className='bg-gray-100 h-screen flex flex-col justify-center items-center'>
      <div className='relative bg-white max-h-full overflow-auto text-black p-5 w-[90%] lg:w-2/3 shadow-2xl text-xl'>
        <button onClick={props.aparecerInicio} title="Volver al inicio"><BsFillArrowLeftCircleFill size={40} className="text-red-500 absolute left-4 " /></button>
        <img src="http://dinamicappsco.s3-website-us-west-2.amazonaws.com/img/logo_pequ.png" alt="logo DinamicAPPS" width={160} className="m-auto"/>
        <h1 className='text-3xl text-center flex justify-around font-bold uppercase'>Registro de usuario</h1>
        <form onSubmit={registrarUsuario} className='w-[90%] lg:w-1/2 m-auto flex flex-col mt-12 mb-8'>
          <div className='flex flex-col mt-5'>
            <label htmlFor="nombre">Digite su nombre completo</label>
            <input type="text" name='nombre' id='nombre' onChange={actualizarData} placeholder='Marcelo de la costa' className='mt-2 p-1 border-b-2 border-gray-400 outline-none focus:border-red-400'/>
          </div>
          <div className='flex flex-col mt-5'>
            <label htmlFor="tipo_documento">Seleccione su tipo de documento</label>
            <select name="tipo_documento" id="tipo_documento" onChange={actualizarData} className='mt-2 p-1 border-b-2 border-gray-400 outline-none focus:border-red-400 '>
              <option value="" disabled selected>Escoga uno de estas opciones</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="CC">Cedula de ciudadania</option>
              <option value="CE">Cedula estranjera</option>
              <option value="RC">Registro civil</option>
            </select>
          </div>
          <div className='flex flex-col mt-5'>
            <label htmlFor="documento">Digite el numero del documento</label>
            <input type="number" name='documento' onChange={actualizarData} min={10} id='documento' placeholder='1044612757' className='mt-2 p-1 border-b-2 border-gray-400 outline-none focus:border-red-400'/>
          </div>
          <div className='flex flex-col mt-5'>
            <label htmlFor="correo">Digite su correo electronico</label>
            <input type="email" name='correo' id='correo' onChange={actualizarData} placeholder='marcelodelacosta@gmail.com' className='mt-2 p-1 border-b-2 border-gray-400 outline-none focus:border-red-400'/>
          </div>
          <div className='flex flex-col mt-5'>
            <label htmlFor="correo_verificado">Confirme su correo electronico</label>
            <input type="email" name='correo_verificado' onChange={actualizarData} id='correo_verificado' placeholder='marcelodelacosta@gmail.com' className='mt-2 p-1 border-b-2 border-gray-400 outline-none focus:border-red-400'/>
          </div>
          <div className='flex flex-col mt-5'>
            <label htmlFor="celular">Digite su celular</label>
            <input type="number" name='celular' id='celular' onChange={actualizarData} placeholder='3024731160' className='mt-2 p-1 border-b-2 border-gray-400 outline-none focus:border-red-400'/>
          </div>
          <div className='flex flex-col mt-5'>
            <label htmlFor="contraseña">Digite una contraseña</label>
            <input type="password" name='contraseña' id='contraseña' onChange={actualizarData} placeholder='*********' className='mt-2 p-1 border-b-2 border-gray-400 outline-none focus:border-red-400'/>
          </div>
          <button className='bg-red-500 hover:bg-red-600 text-white text-2xl p-3 w-1/2 mt-5 m-auto'>Registrarse</button>
        </form>
        <p className='text-center'>Estimado usuario, si desea volver atras, haga click en el boton <button className='text-red-600 hover:text-red-800' onClick={props.aparecerInicio}>Regresar atras</button>, si usted ya esta registrado en nuestro sistema haga click en <button className='text-red-600 hover:text-red-800' onClick={props.aparecerLogin}>Inicia sesion</button></p>
      </div>
    </div>
  )
}

export default RegistroPersona