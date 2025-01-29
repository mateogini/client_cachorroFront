import { useContext, useEffect, useState } from "react";
import Cliente from "./Cliente";
import "../Clientes/ListClientes.css";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";

export default function ListClientes() {
  const  [,,,clientes] = useContext(Context);
  const [buscarCliente, setBuscarCliente] = useState(""); // Para buscar cliente
  const filteredClientes = clientes.filter((cliente) => {
    return (
      cliente.nombre.toLowerCase().includes(buscarCliente.toLowerCase()) ||
      cliente.dni.toString().includes(buscarCliente) ||
      cliente.apellido.toLowerCase().includes(buscarCliente.toLowerCase())
    );
  });
  return (
    <>
      <nav className="navCliente">
      <Link to="/clientenuevo">
        <button className="nuevaCliente">Crear Nuevo</button>
        </Link>
        

        <Link to="/">
          {" "}
          <button className="inicioCliente">Inicio</button>
        </Link>
      </nav>
      <div className="listClientes">
        <div className="inputBuscar">
        <h1>Clientes</h1>
        {/* Barra de búsqueda para clientes */}
      <input
        type="text"
        placeholder="Buscar cliente por nombre o dni..."
        value={buscarCliente}
        onChange={(e) => {
          setBuscarCliente(e.target.value);
        }}
        className="input-busqueda"
      />
      </div>
        <div className="clientesTodos">
          {filteredClientes.map((cliente) => (
          <Link key={cliente.dni} to={`/cliente/${cliente.dni}`}>
            <Cliente  cli={cliente} />
            </Link>
          ))
          }
        </div>
      </div>
    </>
  );
}
