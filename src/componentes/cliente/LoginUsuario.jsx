import axios from 'axios';
import React, { useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import swal from 'sweetalert';


const LoginUsuario = (props) => {

  const [entradaData, setEntradaData] = useState({
    "tipo_documento":"",
    "documento":null,
    "contraseña":""
  });

  const actualizarData = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setEntradaData(values => ({...values,[name]:value}));
  }

  const login = async(event)=>{
    event.preventDefault();
    if (entradaData.tipo_documento.length === 0 || entradaData.documento === null || entradaData.contraseña.length === 0) {
      swal({
        title:"Estimado usuario",
        text:"Por favor complete los campos",
        icon:"error"
      })
    }else {
      const request = await axios.post("http://localhost:3001/loginUsuario",entradaData);
      if(request.data.estado === true){
        sessionStorage.setItem("login",true);
        sessionStorage.setItem("tipo_usuario",request.data.tipo_usuario)
        sessionStorage.setItem("nombre_usuario",request.data.nombre_usuario)
        if (request.data.tipo_usuario === "natural") {
          props.aparecerSistemaUsuario(true);
        }
        if(request.data.tipo_usuario === "admin"){
          props.aparecerSistemaAdmin(true)
        }
      }else {
        swal({
          title:"Documento / contraseña incorrectos",
          text:"Estimado usuario, no encontramos sus credenciales en nuestro sistema, intente de nuevo",
          icon:"error"
        })
      }
    }
  }

  return (
    <div className='bg-gray-100 h-screen flex flex-col justify-center items-center'>
      <div className='bg-white max-h-full overflow-auto text-black p-5 w-[90%] lg:w-2/3 shadow-2xl text-xl font-["poppins"]'>
        <button onClick={props.aparecerInicio} title="Volver al inicio"><BsFillArrowLeftCircleFill size={40} className="text-red-500" /></button>
        <img src="http://dinamicappsco.s3-website-us-west-2.amazonaws.com/img/logo_pequ.png" alt="logo DinamicAPPS" width={160} className="m-auto"/>
        <h1 className='text-3xl text-center flex justify-around font-bold uppercase'>Login</h1>
        <form onSubmit={login} className='w-[90%] lg:w-1/2 m-auto flex flex-col mt-12 mb-8'>
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
            <label htmlFor="contraseña">Digite una contraseña</label>
            <input type="password" name='contraseña' id='contraseña' onChange={actualizarData} placeholder='*********' className='mt-2 p-1 border-b-2 border-gray-400 outline-none focus:border-red-400'/>
          </div>
          <button className='bg-red-500 hover:bg-red-600 text-white text-2xl p-3 w-1/2 mt-5 m-auto'>Iniciar sesion</button>
        </form>
        <p className='text-center'>Estimado usuario, si desea volver atras, haga click en el boton <button className='text-red-600 hover:text-red-800' onClick={props.aparecerInicio}>Regresar atras</button>, si usted aun no esta registrado en nuestro sistema haga click en <button className='text-red-600 hover:text-red-800' onClick={props.aparecerRegistro}>Registrarse</button></p>
      </div>
    </div>
  )
}

export default LoginUsuario