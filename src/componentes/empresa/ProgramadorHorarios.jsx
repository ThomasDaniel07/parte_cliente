import axios from 'axios';
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
const ProgramadorHorarios = (props) => {

  const visibility = props.visibility

  const [datos, establecerDatos] = useState({
    "ampmInicio":"am",
    "ampmCierre":"pm",
    "fechaCierre":null,
    "fechaInicio":null,
    "horaInicio":null,
    "horaCierre":null,
    "minutosCierre":0,
    "minutosInicio":0
  });
  const [fecha_inicio,establecerFechaInicio] = useState()
  const [fecha_final,establecerFechaFinal] = useState()
  const [hora_inicio,establecerHoraInicio] = useState()
  const [hora_final,establecerHoraFinal] = useState()
  const [horarioPrevio,establecerHorarioPrevio] = useState();
  const [ampmInicial,establecerAmPmInicial] = useState();
  const [ampmFinal,establecerAmPmFinal] = useState();

  const obtenerDatos = (event)=>{
    let nombre = event.target.name
    let valor = event.target.value;
    establecerDatos(valoresPrevios => ({...valoresPrevios, [nombre]:valor}));
  }

  const obtenerHorarioPrevio = async()=>{

    let peticion = await axios.post("http://localhost:3001/obtenerHorarioPrevio");


    establecerHorarioPrevio(peticion.data)

    let arrayFechaInicio = peticion.data.fecha_inicio.split("");
      let fechaInicioArray = arrayFechaInicio.slice(0,10)
      let fechaInicio ="";
      fechaInicioArray.map(element =>(
        fechaInicio += element
      ))

      establecerFechaInicio(fechaInicio)
      
      let arrayFechaFinal =  peticion.data.fecha_final.split("");
      let fechaFinalArray = arrayFechaFinal.slice(0,10)
      let fechaFinal ="";
      fechaFinalArray.map(element =>(
        fechaFinal += element
      ))

      establecerFechaFinal(fechaFinal)

      let arrayHoraInicial = peticion.data.hora_inicial.split(":");
      let horaInicialArray = arrayHoraInicial.slice(0,2);
      let horaInicial = horaInicialArray[0] + ":" + horaInicialArray[1];

      establecerHoraInicio(horaInicial)

      establecerAmPmInicial(peticion.data.ampmInicial)

      let arrayHoraFinal = peticion.data.hora_final.split(":");
      let horaFinalArray = arrayHoraFinal.slice(0,2);
      let horaFinal = horaFinalArray[0] + ":" + horaFinalArray[1];

      establecerHoraFinal(horaFinal)

      establecerAmPmFinal(peticion.data.ampmFinal)

  }

  
  const establecerHorario = async(event)=>{

    event.preventDefault();

    if (datos.fechaInicio !== null && datos.fechaCierre !== null && datos.horaInicio !== null && datos.minutosInicio !== null && datos.horaCierre !== null && datos.minutosCierre !== null && datos.ampmInicio !== null && datos.ampmCierre !== null) {

      let fechaInicio = new Date(datos.fechaInicio)

      let fechaCierre = new Date(datos.fechaCierre)

      if (fechaCierre.getTime() > fechaInicio.getTime()) {

        let peticion = await axios.post("http://localhost:3001/guardarHorario",datos);

        if (peticion.data.estado){
          swal({
            title:"Horario establecido con exito",
            icon: "success"
          })
          obtenerHorarioPrevio();
          event.target.reset()
        }else {
          swal({
            title:"Oh !, ha habido un error",
            text:"Porfavor intenta de nuevo",
            icon:"error"
          })
        }


      }else {
        swal({
          title:"La fecha de cierre tiene que ser una fecha posterior a la inicial",
          icon:"info"
        })
      }
    }else {
      swal({
        title:"Por favor complete todos los campos",
        icon:"warning"
      })
    }

  }
  useEffect(() => {
    obtenerHorarioPrevio();
  },[])
  

  

  return (
    <div className={visibility === 1 ? "mt-12 m-auto max-w-min":"hidden"}>
      <h2 className='text-2xl'>Horarios actual</h2>
      <div className='flex  mt-12'>
        <div className=''>
          <div className=''>
            <p>Fecha de inicio</p>
            <p>{fecha_inicio}</p>
          </div>
          <div className='mt-5'>
            <p>Fecha de cierre</p>
            <p>{fecha_final}</p>
          </div>
        </div>
        <div className='ml-12'>
          <div>
            <p>Hora de inicio</p>
            <p>{hora_inicio + ampmInicial}</p>
          </div>
          <div className='mt-5'>
            <p>Hora de cierre</p>
            <p>{hora_final + ampmFinal}</p>
          </div>
        </div>
      </div>
      <h2 className='text-2xl mt-6'>Nuevo horario</h2>
      <form method='POST' className='mt-3 mb-12' onSubmit={establecerHorario}>
        <div className='flex'>
          <div className=''>
            <div className=''>
              <p>Fecha de inicio</p>
              <input type="date" name='fechaInicio' onChange={obtenerDatos} className='text-xl border-2 border-red-500 p-2 rounded-lg'/>
            </div>
            <div className='mt-5'>
              <p>Fecha de cierre</p>
              <input type="date" name='fechaCierre' onChange={obtenerDatos} className='text-xl border-2 border-red-500 p-2 rounded-lg'/>
            </div>
          </div>
          <div className='ml-12'>
            <div className='flex flex-col items-center justify-center'>
              <p>Hora de inicio</p>
              <div className="flex border-2 border-red-500 text-center p-2 rounded-lg">
                <select onChange={obtenerDatos} name="horaInicio" className="bg-transparent text-xl appearance-none outline-none cursor-pointer">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <span className="text-xl mr-3">:</span>
                <select onChange={obtenerDatos} name="minutosInicio" className="bg-transparent cursor-pointer text-xl appearance-none outline-none mr-4">
                  <option value="0">00</option>
                  <option value="30">30</option>
                </select>
                <select name="ampmInicio" onChange={obtenerDatos}  className="bg-transparent text-xl appearance-none outline-none cursor-pointer">
                  <option value="am">AM</option>
                  <option value="pm">PM</option>
                </select>
              </div>
            </div>
            <div className='mt-5 flex flex-col items-center justify-center'>
              <p>Hora de cierre</p>
              <div className="flex border-2 border-red-500 text-center p-2 rounded-lg">
                <select name="horaCierre" onChange={obtenerDatos} className="bg-transparent text-xl appearance-none outline-none cursor-pointer">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <span className="text-xl mr-3">:</span>
                <select onChange={obtenerDatos} name="minutosCierre" className="bg-transparent cursor-pointer text-xl appearance-none outline-none mr-4">
                  <option value="0">00</option>
                  <option value="30">30</option>
                </select>
                <select name="ampmCierre" onChange={obtenerDatos} className="bg-transparent text-xl appearance-none outline-none cursor-pointer">
                  <option value="pm">PM</option>
                  <option value="am">AM</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button className='p-3 bg-red-500 text-white hover:bg-red-400 duration-200 max-w-max mt-6 m-auto'>Actualizar horario</button>
      </form>
    </div>
  )
}

export default ProgramadorHorarios