import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./VistaCliente.css";

export default function VistaCliente() {
  const { clienteId } = useParams();
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const [compras, setCompras] = useState();
  const [cargando, setCargando] = useState(true);
  const [paga, setPago] = useState("");
  const [menuPagar, setMenuPagar] = useState(false);
  const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoApellido, setNuevoApellido] = useState("");
  const [nuevoCelular, setNuevoCelular] = useState("");
  const [nuevoDni, setNuevodni] = useState("");
  const [viejoDni, setViejoDni] = useState("");

  
  const [, , , , , , , , , , traerCliente, , pagaDeuda, , ventasXDni,,, editarCliente] = useContext(Context);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        setCargando(true);
        const data = await traerCliente(clienteId);
        setCliente(data);
        setNuevoNombre(data.nombre);
        setViejoDni(data.dni);
        setNuevodni(data.dni);
        setNuevoApellido(data.apellido);
        setNuevoCelular(data.celular);
        setError(null);
      } catch (err) {
        console.error("Error al traer el cliente:", err);
        setError("No se pudo cargar el cliente. Intenta nuevamente.");
      } finally {
        setCargando(false);
      }
    };
    if (!cliente && clienteId) {
      fetchCliente();
    }
  }, [clienteId, cliente, traerCliente]);

  useEffect(() => {
    const fetchComprasCliente = async () => {
      try {
        const data = await ventasXDni(clienteId);
        setCompras(data);
      } catch (err) {
        console.error("Error al traer las compras:", err);
        setError("No se pudo cargar las compras. Intenta nuevamente.");
      }
    };
    if (!cliente && clienteId) {
      fetchComprasCliente();
    }
  }, [clienteId, cliente, traerCliente]);

  const handleGuardarEdicion = async () => {
    try {
      const datosEditados = {
        dni: nuevoDni,
        nombre: nuevoNombre,
        apellido: nuevoApellido,
        celular: nuevoCelular
      };
      await editarCliente(viejoDni,datosEditados);
      setCliente((prevCliente) => ({ ...prevCliente, ...datosEditados }));
      setMostrarFormularioEditar(false);
    } catch (error) {
      console.error("Error al editar el cliente:", error);
    }
  };

  if (cargando) {
    return <p>Cargando cliente...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cliente) {
    return <p>No se encontró el cliente.</p>;
  }

  return (
    <>
      <nav className="navCliente">
        <Link to="/clientes">
          <button className="nuevaCliente">Clientes</button>
        </Link>
        <Link to="/">
          <button className="inicioCliente">Inicio</button>
        </Link>
      </nav>

      <section className="clientePago-perfil">
        <header className="clientePago-header">
          <h1 className="clientePago-nombre">
            {cliente.nombre} {cliente.apellido}
          </h1>
        </header>
        <p className="clientePago-dni"><strong>DNI:</strong> {cliente.dni}</p>
        <p className="clientePago-celular"><strong>Celular:</strong> {cliente.celular}</p>
        
        {cliente.deuda.toFixed(2) < 0 ? (
          <p className="clientePago-deuda"><strong>A favor:</strong> ${cliente.deuda.toFixed(2) * -1}</p>
        ) : (
          <p className="clientePago-deuda"><strong>Deuda:</strong> ${cliente.deuda.toFixed(2)}</p>
        )}

        <button onClick={() => setMostrarFormularioEditar(true)} className="clientePago-botonEditar">
          Editar Cliente
        </button>
      </section>

      {mostrarFormularioEditar && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Cliente</h2>
            <label>Nombre:</label>
            <input type="text" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />

            <label>Apellido:</label>
            <input type="text" value={nuevoApellido} onChange={(e) => setNuevoApellido(e.target.value)} />
            <label>DNI:</label>
            <input type="text" value={nuevoDni} onChange={(e) => setNuevodni(e.target.value)} />

            <label>Celular:</label>
            <input type="text" value={nuevoCelular} onChange={(e) => setNuevoCelular(e.target.value)} />

            <button onClick={handleGuardarEdicion}>Guardar</button>
            <button onClick={() => setMostrarFormularioEditar(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <section>
        <h2>Compras del cliente:</h2>
        {compras && compras.length > 0 ? (
          compras.map((compra, index) => (
            <div key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <p><strong>Fecha:</strong> {compra.fecha}</p>
              <p><strong>Total:</strong> ${compra.total.toFixed(2)}</p>
              <p><strong>Prendas:</strong></p>
              <ul>
                {compra.prendas.map((prenda, idx) => (
                  <li key={idx}>{prenda}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No se han encontrado compras para este cliente.</p>
        )}
      </section>

      <style>
        {`
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 300px;
            text-align: center;
          }
          .modal-content input {
            width: 100%;
            margin-bottom: 10px;
            padding: 5px;
          }
          .modal-content button {
            margin: 5px;
            padding: 8px;
          }
        `}
      </style>
    </>
  );
}
