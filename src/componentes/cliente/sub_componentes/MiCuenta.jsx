import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MiCuenta = (props) => {
  
  const informacion = props.obtenerInformacion;
  const visibility = props.visibility;

  return (
    <div className={visibility === 3 ? "mt-3 m-auto flex text-xl flex-wrap justify-center text-justify":"hidden"}>
      <p className='p-4 flex '><span className='text-red-500'>Nombre :</span> {informacion.nombre_usuario}</p>
      <p className='p-4 flex '><span className='text-red-500'>Tipo de documento :</span> {informacion.tipo_documento}</p>
      <p className='p-4 flex '><span className='text-red-500'>Documento :</span> {informacion.documento}</p>
      <p className='p-4 flex '><span className='text-red-500'>Correo :</span> {informacion.correo}</p>
      <p className='p-4 flex '><span className='text-red-500'>Celular:</span> {informacion.celular}</p>
      <p className='p-4 flex '><span className='text-red-500'>Tipo de usuario :</span> {informacion.tipo_usuario}</p>
    </div>
  )
}

export default MiCuenta