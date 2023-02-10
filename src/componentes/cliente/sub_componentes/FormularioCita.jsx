import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';


export const FormularioCita = (props) => {

  const [datos,setDatos] = useState({
    "nombre_usuario": sessionStorage.getItem("nombre_usuario"),
    "horaDato":"",
    "ampm":""
  });
  const [fechaInicio,establecerFechaInicio] = useState();
  const [fechaFinal,establecerFechaFinal] = useState();
  const [hora, establecerHora] = useState({
    "horas":null,
    "minutos":null,
    "ampm":"am"
  });

  const visibility = props.visibility;

  const establecerDatos = (event)=>{
    let nombreDato = event.target.name;
    let informacionDato = event.target.value;
    setDatos(datosIniciales => ({...datosIniciales,[nombreDato]:informacionDato}));
  }

  useEffect(()=>{
    obtenerLimitesFechas();
  },[])

  const verificarDisponibilidad = async(hora,fecha,ampm)=>{
    let data = {"hora":hora, "fecha":fecha,"ampm":ampm};
    let peticion = await axios.post("http://localhost:3001/verificarDisponibilidad",data);
    return peticion.data.estado;
  }

  const obtenerHora = (event)=>{
    const horaNombre = event.target.name
    const horaValor = event.target.value
    establecerHora((valoresPrevios)=>({...valoresPrevios,[horaNombre]:horaValor}));
  }

  const obtenerLimitesFechas = async()=>{
    let peticion = await axios.post("http://localhost:3001/obtenerLimitesFechas");
    let arrayFechaInicial = peticion.data[0].fecha_inicio.split("");
    let fechaInicialArray = arrayFechaInicial.slice(0,10)
    let fechaInicial ="";
    fechaInicialArray.map(element =>(
      fechaInicial += element
    ))
    let arrayFechaFinal = peticion.data[0].fecha_final.split("");
    let fechaFinalArray = arrayFechaFinal.slice(0,10)
    let fechaFinal ="";
    fechaFinalArray.map(element =>(
      fechaFinal += element
    ))
    
    establecerFechaInicio(fechaInicial);
    establecerFechaFinal(fechaFinal)
  }

  const pedirCita = async(event)=>{

    event.preventDefault();
    
    let horaDato = hora.horas + ":" + hora.minutos;

    datos.horaDato = horaDato

    datos.ampm = hora.ampm;

    if (datos.dia !== undefined && hora.horas !== null && hora.minutos !== null) {

      if (datos.nota === undefined) {datos.nota = ""}

      let verificacionDisponibilidadEstado = await verificarDisponibilidad(datos.horaDato,datos.dia,datos.ampm)

      if (verificacionDisponibilidadEstado === false) {
        let peticion = await axios.post("http://localhost:3001/pedirCita",datos);
        if (peticion.data.estado === true) {
          swal({
            title:"Se envio la solicitud con exito !",
            text:"Estimado usuario, su cita fue asignada, recuerde que si no puede asistir, puede cancelarla si esta ya no ha sido confirmar", //"Estimado usuario, su cita fue asignada, recuerde que si no puede asistir, puede cancelarla si esta ya no ha sido confirmar"
            icon:"success"
          })
          event.target.reset();
        }
      }else {
        swal({
          title:"Estimado usuario",
          text:"Ya existe una reserva para esta fecha y hora",
          icon:"warning"
        })
      }

    }else {
      swal({
        title:"Estimado usuario",
        text:"Por favor complete los campos",
        icon:"error"
      })
    }
  }


  return (
    <div className={visibility === 1 ? "w-[90%] mt-4 m-auto":"hidden"}>
      <form method="post" className='flex flex-col' onSubmit={pedirCita}>
        <div className='flex flex-col mt-5'>
          <label htmlFor="dia"><span className='text-red-500'>*</span> Digite la fecha en la que desea agendar una cita</label>
          <input type="date" onChange={establecerDatos} name="dia" min={fechaInicio} max={fechaFinal} id='dia' className='mt-2 p-3 border-2 outline-none rounded-lg shadow-2xl border-red-400 max-w-min marker:text-red-400'/>
        </div>
        <label htmlFor="hora"><span className='text-red-500'>*</span> Digite la hora en la que desea agendar una cita</label>
        <div className="mt-2 p-3 max-w-min bg-white border-2 border-red-400 rounded-lg shadow-xl">
          <div className="flex">
            <select name="horas" onChange={obtenerHora} className="bg-transparent text-xl appearance-none outline-none">
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <span className="text-xl mr-3">:</span>
            <select name="minutos" onChange={obtenerHora} className="bg-transparent text-xl appearance-none outline-none mr-4">
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
            <select name="ampm" onChange={obtenerHora} className="bg-transparent text-xl appearance-none outline-none">
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </div>
        </div>
        <div className='flex flex-col mt-5'>
          <label htmlFor="nota">Nota</label>
          <textarea name="nota" onChange={establecerDatos} id="nota" className='min-w-full max-w-full min-h-[100px] max-h-[100px] border-b-2 border-red-500 outline-none' placeholder='El motivo de la cita es...'></textarea>
        </div>
        <button className='p-3 bg-red-500 hover:bg-red-600 duration-200 text-white mt-5 m-auto'>Solicitar cita</button>
      </form>
    </div>
  )
}
