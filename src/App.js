import { useEffect, useState } from "react";
import { Inicio } from "./componentes/Inicio";
import RegistroPersona from "./componentes/cliente/RegistroPersona";
import LoginUsuario from "./componentes/cliente/LoginUsuario";
import SistemaAgendamiento from "./componentes/cliente/SistemaAgendamiento";
import SistemaAgendamientoAdmin from "./componentes/empresa/SistemaAgendamientoAdmin";
import "@fontsource/raleway";
import "@fontsource/poppins"
import "@fontsource/oswald"
import 'tw-elements';

function App() {

  const [vista,setVista] = useState("inicio");
  
  useEffect(()=>{
    if ((sessionStorage.getItem("login") === true || sessionStorage.getItem("tipo_usuario") === "natural") && (sessionStorage.getItem("login") !== null || sessionStorage.getItem("tipo_usuario") !== null)) {
      setVista("usuarioNatural");
    }else if ((sessionStorage.getItem("login") === true || sessionStorage.getItem("tipo_usuario") === "admin") && (sessionStorage.getItem("login") !== null || sessionStorage.getItem("tipo_usuario") !== null)){
      setVista("usuarioAdmin");
    }else {
      setVista("inicio");
    }
  },[])
  

  const aparecerLogin = ()=>{
    setVista("login");
  }

  const aparecerRegistro = ()=>{
    setVista("registro");
  }

  const aparecerInicio = ()=>{
    setVista("inicio");
  }

  const aparecerSistemaUsuario = (condicion)=>{
    if (condicion === true) {
      setVista("usuarioNatural")
    }
  }

  const aparecerSistemaAdmin = (condicion)=>{
    if (condicion === true) {
      setVista("usuarioAdmin")
    }
  }

  if (vista === "inicio") {
    return(<Inicio aparecerLogin={aparecerLogin} aparecerRegistro={aparecerRegistro}  />)
  }
  if (vista === "registro") {
    return(<RegistroPersona aparecerInicio={aparecerInicio} aparecerLogin={aparecerLogin}/>)
  }

  if (vista === "login") {
    return (<LoginUsuario aparecerSistemaUsuario={aparecerSistemaUsuario} aparecerSistemaAdmin={aparecerSistemaAdmin}  aparecerInicio={aparecerInicio} aparecerRegistro={aparecerRegistro}/>)
  }

  if(vista === "usuarioNatural"){
    return (<SistemaAgendamiento aparecerInicio={aparecerInicio} />)
  }

  if (vista === "usuarioAdmin") {
    return (<SistemaAgendamientoAdmin aparecerInicio={aparecerInicio} />)
  }

}

export default App;
