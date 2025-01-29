import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../Context/Context";
import ".//VistaCliente.css";

export default function VistaCliente() {
  const { clienteId } = useParams();
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const [compras, setCompras] = useState();
  const [cargando, setCargando] = useState(true);
  const [paga, setPago] = useState("");
  const [menuPagar, setMenuPagar] = useState(false);
  const [, , , , , , , , , , traerCliente, , pagaDeuda, , ventasXDni] =
    useContext(Context);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        setCargando(true); // Indica que la solicitud está en proceso
        const data = await traerCliente(clienteId); // Llama a la API
        setCliente(data); // Guarda los datos obtenidos
        setError(null); // Limpia errores previos
      } catch (err) {
        console.error("Error al traer el cliente:", err);
        setError("No se pudo cargar el cliente. Intenta nuevamente.");
      } finally {
        setCargando(false); // Indica que la solicitud ha terminado
      }
    };
    if (!cliente && clienteId) {
      fetchCliente();
    }
  }, [clienteId, cliente, traerCliente]); // Solo depende de clienteId y cliente
  useEffect(() => {
    const fetchComprasCliente = async () => {
      try {
        const data = await ventasXDni(clienteId); // Llama a la API
        setCompras(data); // Guarda los datos obtenidos
      } catch (err) {
        console.error("Error al traer las compras:", err);
        setError("No se pudo cargar lkas compras. Intenta nuevamente.");
      } finally {
      }
    };
    if (!cliente && clienteId) {
      fetchComprasCliente();
    }
  }, [clienteId, cliente, traerCliente]); // Solo depende de clienteId y cliente

  const verForm = () => {
    setMenuPagar(true);
  };

  const noVerForm = () => {
    setMenuPagar(false);
  };

  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append("deuda", paga);
      await pagaDeuda(cliente.dni, formData); // Realiza el pago
      // Actualiza la deuda localmente sin recargar la página
      setCliente((prevCliente) => ({
        ...prevCliente,
        deuda: prevCliente.deuda - parseFloat(paga), // Actualiza la deuda
      }));
      setMenuPagar(false); // Cierra el formulario de pago
    } catch (error) {
      console.error("Error al pagar la deuda:", error);
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
        <p className="clientePago-dni">
          <strong>DNI:</strong> {cliente.dni}
        </p>
        <p className="clientePago-celular">
          <strong>Celular:</strong> {cliente.celular}
        </p>
        {cliente.deuda.toFixed(2) < 0 ? ( <>
          <p className="clientePago-deuda">
          <strong>A favor:</strong> ${cliente.deuda.toFixed(2) * - 1}
        </p>
        </>) : (<>
          <p className="clientePago-deuda">
          <strong>Deuda:</strong> ${cliente.deuda.toFixed(2)}
        </p>
        </>)}
        
        <button onClick={verForm} className="clientePago-botonPagar">
          Paga
        </button>
        {menuPagar && (
          <div className="clientePago-formulario">
            <h2 className="clientePago-formTitulo">Paga:</h2>
            <label className="clientePago-label">Dinero a pagar $:</label>
            <input
              className="clientePago-input"
              type="number"
              min={0}
              value={paga}
              onChange={(e) => setPago(e.target.value)}
            />
            <button
              onClick={handleClick}
              className="clientePago-botonConfirmar"
            >
              Pagar
            </button>
            <button onClick={noVerForm} className="clientePago-botonCerrar">
              Cerrar
            </button>
          </div>
        )}
      </section>
      <ul>
      <section>
  <h2>Compras del cliente:</h2>
  {compras && compras.length > 0 ? (
    compras.map((compra, index) => (
      <div key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
        <p>
          <strong>Fecha:</strong> {compra.fecha}
        </p>
        <p>
          <strong>Total:</strong> ${compra.total.toFixed(2)}
        </p>
        <p>
          <strong>Prendas:</strong>
        </p>
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

      </ul>
    </>
  );
}
