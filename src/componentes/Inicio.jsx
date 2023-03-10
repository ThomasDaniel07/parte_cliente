import React from 'react'
import { useState } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';

export const Inicio = (props) => {

  const [visibility, setVisibility] = useState();

  const apperText = (num)=>{
    setVisibility(num);
    if (num === visibility) {
      setVisibility(0);
    }
  }

  return (
    <div className='flex flex-col h-screen bg-gray-100 justify-center items-center font-["poppins"]'>
      <div className='bg-white text-black max-h-full overflow-auto p-5 w-[90%] lg:w-2/3 shadow-2xl text-xl'>
        <img src="http://dinamicappsco.s3-website-us-west-2.amazonaws.com/img/logo_pequ.png" alt="logo DinamicAPPS" width={160} className="m-auto"/>
        <h1 className='text-3xl text-center flex justify-around font-bold uppercase'>
          Bienvenido a nuestro sistema de agendamiento de citas</h1>
        <div className='mt-6 text-justify'>
          <p>Aqui usted podra registrarse y tener acceso al agendamiento, visualizacion, revision y cancelacion de citas, si estas aun no estan confirmadas.</p>
          <br />
          <p>Estimado usuario, si desea acceder a las funciones mencionadas, haga click en el boton <button className='text-red-600 hover:text-red-800' onClick={props.aparecerRegistro}>Registrarse</button>, si usted ya esta registrado en nuestro sistema haga click en <button className='text-red-600 hover:text-red-800' onClick={props.aparecerLogin}>Inicia sesion</button></p>
          <div className='mt-3 flex justify-center'>
          <button className='text-white bg-red-500 hover:bg-red-800 p-2 rounded-xl font-semibold' onClick={props.aparecerRegistro}>Registrarse</button>
          <button className='text-white bg-red-500 hover:bg-red-800 p-2 ml-3 rounded-xl font-semibold' onClick={props.aparecerLogin}>Iniciar Sesion</button>
          </div>
        </div>
        <ul className='mt-14 text-gray-700'>
          <li className='lg:w-2/3 mt-3 p-1'>
            <button className='flex items-center' onClick={()=> apperText(1)}>Quienes somos ? <BiRightArrowCircle className={visibility === 1 ? "rotate-90 duration-200 ease-in text-red-500 hover:text-red-800" : "text-red-500 hover:text-red-800"} size={30}/></button>
            <p className={visibility === 1 ? 'p-2 text-base font-sans block opacity-100 duration-200 ease-out text-justify font-["raleway"]': "hidden"}>Somos una compa????a dedicada a la implementaci??n de soluciones en tecnolog??as de la informaci??n (TI) optimizando los procesos operativos de nuestros aliados y mejorando su productividad en todas las ??reas de las TI.</p>
          </li>
          <li className='lg:w-2/3 mt-3 p-1'>
            <button className='flex items-center' onClick={()=> apperText(2)}>Nuestros servicios <BiRightArrowCircle className={visibility === 2 ? "rotate-90 duration-200 ease-in text-red-500 hover:text-red-800" : "text-red-500 hover:text-red-800"} size={30}/></button>
            <p className={visibility === 2 ? 'p-2 text-base font-sans block opacity-100 duration-200 ease-out text-justify font-["raleway"]': "hidden"}> Ofrecemos un importante abanico de servicios con el que su compa??ia podr?? optimizar procesos y mejorar su productividad. Estos servicios van desde consultor??as en tecnolog??as de la informaci??n (TI) hasta el desarrollo de aplicaciones a nivel operativo y administrativo con informes en tiempo real.</p>
          </li>
          <li className='lg:w-2/3 mt-3 p-1'>
            <button className='flex items-center' onClick={()=> apperText(3)}>Mision <BiRightArrowCircle className={visibility === 3 ? "rotate-90 duration-200 ease-in text-red-500 hover:text-red-800" : "text-red-500 hover:text-red-800"} size={30}/></button>
            <p className={visibility === 3 ? 'p-2 text-base font-sans block opacity-100 duration-200 ease-out text-justify font-["raleway"]': "hidden"}>Somos una compa????a que busca brindar soluciones integrales a las necesidades en tecnolog??a y sistemas de informaci??n de las peque??as, medianas y grandes empresas, ofreciendo un amplio portafolio de productos y servicios encaminados a favorecer la estandarizaci??n, automatizaci??n y efectividad en los procesos de las organizaciones, generando ventajas competitivas y apoyando los sistemas de gesti??n de la calidad.</p>
          </li>
          <li className='lg:w-2/3 mt-3 p-1'>
            <button className='flex items-center' onClick={()=> apperText(4)}>Vision <BiRightArrowCircle className={visibility === 4 ? "rotate-90 duration-200 ease-in text-red-500 hover:text-red-800" : "text-red-500 hover:text-red-800"} size={30}/></button>
            <p className={visibility === 4 ? 'p-2 text-base font-sans block opacity-100 duration-200 ease-out text-justify font-["raleway"]': "hidden"}>En el a??o 2025, DinamicAPPS, contar?? con productos de alta calidad consolidados en las diferentes ??reas de mercado y definir?? nuevas pautas en la sistematizaci??n de procesos mediante la aplicaci??n de herramientas de ??ltima tecnolog??a, consolid??ndose a nivel regional como gestores de desarrollo social, empresarial y econ??mico en los sectores p??blico y privado.</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
