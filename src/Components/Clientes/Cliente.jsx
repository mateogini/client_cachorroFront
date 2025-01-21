import React, { useContext } from "react";
import "../Clientes/Cliente.css";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";

export default function Cliente({ cli }) {
  const [,,,,,,,borrarCliente] = useContext(Context);
  const handleOnClick = (dni) => {
    borrarCliente(dni)
  }
  return (
    <>
      <div className="cardCliente" key={cli.dni}>
        
        <div className="infoCard">
          <p className="nombreCard">{cli.nombre} {cli.apellido}</p>
          <p className="dniCard">{cli.dni}</p>
          <p>Deuda: ${cli.deuda}</p>
          <Link to="/clientes">
          <button className="borrarPrenda" onClick={() => handleOnClick(cli.dni)}>🗑️</button>
          </Link>
        </div>
      </div>
    </>
  );
}
