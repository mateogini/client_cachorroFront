import { Link } from "react-router-dom";
import FormClienteNuevo from "./FormClienteNuevo";

export default function AgregarCliente(){

    return(
        <>
        <nav className="navCliente">
      <Link to="/clientes">
        <button className="nuevaCliente">Clientes</button>
        </Link>

        <Link to="/">
          {" "}
          <button className="inicioCliente">Inicio</button>
        </Link>
      </nav>
      <FormClienteNuevo/>
        </>
    )
}