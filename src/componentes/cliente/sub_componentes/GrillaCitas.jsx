import React, {useState, useEffect} from 'react'
import axios from 'axios';
import swal from 'sweetalert';

const GrillaCitas = (props) => {

  const [citasInformacion, establecerInformacionCitas] = useState([]);
  const visibility = props.visibility;

  useEffect(()=>{
    obtenerInformacionDeCitas();
  },[])
  
  const obtenerInformacionDeCitas = async()=>{
    let nombre = {"nombre_usuario":sessionStorage.getItem("nombre_usuario")}
    let peticion = await axios.post("http://localhost:3001/InformacionCitasUsuario",nombre);
    establecerInformacionCitas(peticion.data);
  }

  const eliminarCita = async (id)=>{
    let idJson = {
      "id":id
    }
    let peticion = await axios.post("http://localhost:3001/eliminarCita",idJson);
    if (peticion.data.estado === true) {
      swal({
        "title":"Cita cancelada exitosamente",
        "text":"Tu cita ha sido cancelada, recuerda que si quieres agendar una cita puedes ir al apartado AGENDAR UNA CITA",
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
    <div className={visibility === 2 ? "mt-4 m-auto":"hidden"}>
      <table className="min-w-full max-w-full overflow-auto">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-xl font-medium text-gray-900 px-6 py-4 text-left">
                Documento
              </th>
              <th scope="col" className="text-xl font-medium text-gray-900 px-6 py-4 text-left">
                Fecha
              </th>
              <th scope="col" className="text-xl font-medium text-gray-900 px-6 py-4 text-left">
                Hora
              </th>
              <th scope="col" className="text-xl font-medium text-gray-900 px-6 py-4 text-left">
                Nota
              </th>
              <th scope="col" className="text-xl font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
              <th>

              </th>
            </tr>
          </thead>
          <tbody>

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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element.documento}</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {fecha}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {hora + element.ampm}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {element.nota}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {element.estado}
                    </td>
                    <td className={element.estado === "Pendiente" ? "":"hidden"}>
                      <button className='text-sm p-2 bg-red-400 text-white' onClick={()=>{eliminarCita(element.id_cita)}}>Cancelar cita</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
      </table>
    </div>
  )
}

export default GrillaCitas