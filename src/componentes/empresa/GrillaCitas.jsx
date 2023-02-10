import React, {useState, useEffect} from 'react'
import axios from 'axios';
import swal from 'sweetalert';

const GrillaCitas = (props) => {

  const [citasInformacion, establecerInformacionCitas] = useState([]);
  const [fechaInicio,establecerFechaInicio] = useState();
  const [fechaFinal,establecerFechaFinal] = useState();
  const [hora, establecerHora] = useState({
    "horas":null,
    "minutos":null,
    "ampm":"am"
  });
  const [modalRepramar,verModal] = useState(false);
  const [idUsuario,establecerId] = useState(null)
  const [datosParaReprogramar, establecerDatos] = useState({
    "horaNueva":null,
    "id_cita":null
  })
  const visibility = props.visibility;

  useEffect(()=>{
    obtenerInformacionDeCitas();
    obtenerLimitesFechas();
  },[])
  
  const obtenerInformacionDeCitas = async()=>{
    let peticion = await axios.post("http://localhost:3001/InformacionCitas");
    establecerInformacionCitas(peticion.data);
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

  const obtenerHora = (event)=>{
    const horaNombre = event.target.name
    const horaValor = event.target.value
    establecerHora((valoresPrevios)=>({...valoresPrevios,[horaNombre]:horaValor}));
  }

  const confirmarCita = async(id)=>{
    let idJson = {
      "id_cita":id
    }
    let peticion = await axios.post("http://localhost:3001/confirmarCita",idJson);
    if (peticion.data.estado === true) {
      swal({
        "title":"Cita confirmada exitosamente",
        "text":"La cita solicitada por el usuario ha sido confirmada",
        "icon":"success"
      })
      obtenerInformacionDeCitas();
    }else {
      swal({
        "title":"Hubo un error porfavor intente de nuevo",
        "icon":"error"
      })
    }
  }

  const establecerDatosReprogramar = (event)=>{
    let nombreDato = event.target.name;
    let informacionDato = event.target.value;
    establecerDatos(datosIniciales => ({...datosIniciales,[nombreDato]:informacionDato}));
  }

  const reprogramarCita = async()=>{
    let horaNueva = hora.horas + ":" + hora.minutos 
    datosParaReprogramar.horaNueva = horaNueva;
    datosParaReprogramar.id_cita = idUsuario
    let peticion = await axios.post("http://localhost:3001/reprogramarCita",datosParaReprogramar);
    if (peticion.data.estado === true) {
      verModal(false);
      establecerId(null);
      swal({
        title:"Cita reprogramada exitosamente",
        icon:"success"
      })
      obtenerInformacionDeCitas();
    }else {
      swal({
        title:"Oh !, ha ocurrido un error",
        text:"Porfavor intente de nuevo",
        icon:"info"
      })
    }
  }

  const rechazarCita = async (id)=>{
    let idJson = {
      "id_cita":id
    }
    let peticion = await axios.post("http://localhost:3001/rechazarCita",idJson);
    if (peticion.data.estado === true) {
      swal({
        "title":"Cita rechazada exitosamente",
        "text":"La cita seleccionada ha sido cancelada",
        "icon":"success"
      })
      obtenerInformacionDeCitas();
    }else {
      swal({
        "title":"Hubo un error porfavor intente de nuevo",
        "icon":"error"
      })
    }
  }

  return (
    <div className={visibility === 2 ? "mt-4 relative overflow-x-auto shadow-md sm:rounded-lg":"hidden"}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white bg-red-800">
            <tr>
              <th scope="col" className="text-xl font-medium px-6 py-4 text-left">
                Nombre
              </th>
              <th scope="col" className="text-xl font-medium px-6 py-4 text-left">
                Documento
              </th>
              <th scope="col" className="text-xl font-medium px-6 py-4 text-left">
                Correo
              </th>
              <th scope="col" className="text-xl font-medium px-6 py-4 text-left">
                Celular
              </th>
              <th scope="col" className="text-xl font-medium px-6 py-4 text-left">
                Nota
              </th>
              <th scope="col" className="text-xl font-medium px-6 py-4 text-left">
                Fecha
              </th>
              <th scope="col" className="text-xl font-medium px-6 py-4 text-left">
                Hora
              </th>
              <th scope="col" className="text-xl font-medium px-6 py-4 text-left">
                Estado
              </th>
              <th>

              </th>
              <th>

              </th>
              <th>

              </th>
            </tr>
          </thead>
          <tbody className=''>

            {
              citasInformacion.map(element=>{
                let arrayFecha = element.fecha.split("");
                let fechaArray = arrayFecha.slice(0,10)
                let fecha ="";
                  fechaArray.map(element =>(
                    fecha += element
                  ))
                let arrayHora = element.hora.split(":");
                let horaArray = arrayHora.slice(0,2);
                let hora = horaArray[0] + ":" + horaArray[1];
                return(
                  <tr className="border-b" key={element.id_cita}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {element.nombre_usuario}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {element.documento}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {element.correo}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {element.celular}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {element.nota}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {fecha}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {hora + element.ampm}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {element.estado}
                    </td>
                    <td className={(element.estado === "Rechazada" ? "hidden": "")}>
                      <button className={element.estado === "Confirmada" ? "hidden": "text-sm p-2 bg-green-700 text-white"} onClick={()=>{confirmarCita(element.id_cita)}}>Confirmar</button>
                    </td>
                    <td className={element.estado === "Rechazada" ? "hidden": ""}>
                      <button className='text-sm p-2 bg-stone-800 text-white' onClick={()=>{verModal(true); establecerId(element.id_cita)}}>Reprogramar</button>
                    </td>
                    <td className={element.estado === "Rechazada" ? "hidden": ""}>
                      <button className={element.estado === "Confirmada" ? "hidden" : 'text-sm p-2 bg-red-400 text-white'} onClick={()=>{rechazarCita(element.id_cita)}}>Rechazar</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
      </table>
      {modalRepramar ? (
        <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Reprogramar Cita
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => verModal(false)}
                >
                </button>
              </div>
              <form method='POST' className="relative p-6 flex-auto">
                <div className='flex flex-col mt-5'>
                  <label htmlFor="diaNuevo"><span className='text-red-500'>*</span> Digite la fecha en la que desea reprogramar la cita</label>
                  <input type="date" name="diaNuevo" min={fechaInicio} max={fechaFinal} onChange={establecerDatosReprogramar} id='diaNuevo' className='mt-2 p-3 border-2 outline-none rounded-lg shadow-2xl border-red-400 max-w-min bg-transparent marker:text-red-400 cursor-pointer text-xl'/>
                </div>
                <div className="mt-2 p-3 max-w-min bg-white border-2 border-red-400 rounded-lg shadow-xl">
                  <div className="flex">
                    <select name="horas" className="bg-transparent text-xl appearance-none outline-none cursor-pointer" onChange={obtenerHora}>
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
                    <select name="minutos" className="bg-transparent text-xl appearance-none outline-none mr-4 cursor-pointer" onChange={obtenerHora}>
                      <option value="00">00</option>
                      <option value="30">30</option>
                    </select>
                    <select name="ampm" className="bg-transparent text-xl appearance-none outline-none cursor-pointer" onChange={obtenerHora}>
                      <option value="am">AM</option>
                      <option value="pm">PM</option>
                    </select>
                  </div>
                </div>
              </form>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => verModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => reprogramarCita()}
                >
                  Reprogramar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ):null}
    </div>
  )
}

export default GrillaCitas