import React, { useContext } from "react";
import "../Clientes/Cliente.css";
import { Context } from "../Context/Context";
import { useNavigate } from "react-router-dom";

export default function Cliente({ cli }) {
  const [, , , , , , , borrarCliente] = useContext(Context);
  const navigate = useNavigate();

  const handleOnClick = (dni) => {
    borrarCliente(dni);
    navigate("/clientes"); // Redirigir después de borrar
  };

  return (
    <div className="cardCliente" key={cli.dni}>
      <div className="infoCard">
        <p className="nombreCard">
          {cli.nombre} {cli.apellido}
        </p>
        <p className="dniCard">{cli.dni}</p>
        {cli.deuda < 0 ? (
          <p>A favor: ${cli.deuda * -1}</p>
        ) : (
          <p>Deuda: ${cli.deuda}</p>
        )}
        <button
          className="borrarPrenda"
          onClick={() => handleOnClick(cli.dni)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
