import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import "./FormVenta.css"; // Importar los estilos

export default function FormVenta() {
  const [, , prendas] = useContext(Context);
  const [buscarPrenda, setBuscarPrenda] = useState(""); // Para buscar prendas
  const [prendasElegidas, setPrendasElegidas] = useState([]); // Prendas seleccionadas
  const [menuVisible, setMenuVisible] = useState(false); // Controla si el menú está visible
  const [paga, setPaga] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    prendasElegidas.forEach((prenda) => {
      let aux = total + prenda.precio;
      setTotal(aux);
    });
  }, [prendasElegidas]);

  // Filtrar prendas según el término de búsqueda
  const filteredPrendas = prendas.filter((prenda) => {
    // Excluir las prendas con stock 1 que ya fueron seleccionadas
    const yaSeleccionada = prendasElegidas.some(
      (p) => p.codigo === prenda.codigo
    );
    return (
      prenda.nombre.toLowerCase().includes(buscarPrenda.toLowerCase()) &&
      prenda.stock > 0 &&
      (!yaSeleccionada || prenda.stock > 1) // Si ya fue seleccionada y tiene stock 1, no aparece
    );
  });

  // Agregar prenda seleccionada
  const handleSelectPrenda = (prenda) => {
    setPrendasElegidas((prev) => {
      // Si la prenda tiene stock 1 y ya está en la lista, no la agregamos de nuevo
      if (prenda.stock === 1 && prev.some((p) => p.codigo === prenda.codigo)) {
        return prev;
      }
      return [...prev, prenda];
    });

    setBuscarPrenda(""); // Limpiar barra de búsqueda
    setMenuVisible(false); // Ocultar menú después de seleccionar
  };

  // Eliminar prenda de la lista de seleccionadas
  const handleRemovePrenda = (codigo) => {
    setPrendasElegidas((prev) => prev.filter((p) => p.codigo !== codigo));
  };

  const [, , , clientes] = useContext(Context);
  const [buscarCliente, setBuscarCliente] = useState(""); // Para buscar cliente
  const [cliente, setCliente] = useState(null); // Cliente seleccionado
  const [menuCliente, setMenuCliente] = useState(false); // Controla si el menú de clientes está visible

  // Filtrar clientes según el término de búsqueda
  const filteredClientes = clientes.filter((cliente) => {
    return (
      cliente.nombre.toLowerCase().includes(buscarCliente.toLowerCase()) ||
      cliente.dni.toString().includes(buscarCliente) ||
      cliente.apellido.toLowerCase().includes(buscarCliente.toLowerCase())
    );
  });

  // Agregar cliente seleccionado
  const handleSelectCliente = (cliente) => {
    setCliente(cliente); // Establecer el cliente seleccionado
    setBuscarCliente(""); // Limpiar barra de búsqueda
    setMenuCliente(false); // Ocultar menú después de seleccionar
  };

  // Eliminar cliente
  const handleRemoveCliente = () => {
    setCliente(null); // Eliminar cliente seleccionado
  };
  const [error, setError] = useState();
  const [venta, setVenta] = useState();
  const [, , , , , , , , nuevaVenta] = useContext(Context);
  const realizarVenta = () => {
    if (prendasElegidas.length > 0) {
      const result = [];
      prendasElegidas.forEach((prenda) => {
        result.push(prenda.codigo);
      });
      setError(null);
      nuevaVenta(cliente.dni, result, paga, total);
      setCliente(null);
      setPaga(0);
      setTotal(0);
      setPrendasElegidas([]);
      setVenta("Venta realizada! ✅");
    } else {
      setError("Completa al menos la prenda!");
      setVenta("");
    }
  };
  return (
    <>
      <div className="form">
        <h2>Seleccionar Prendas</h2>

        {/* Barra de búsqueda para prendas */}
        <input
          type="text"
          placeholder="Buscar prenda por nombre..."
          value={buscarPrenda}
          onChange={(e) => {
            setBuscarPrenda(e.target.value);
            setMenuVisible(true); // Mostrar el menú al escribir
          }}
          className="input-busqueda"
          onBlur={() => setTimeout(() => setMenuVisible(false), 200)} // Ocultar menú al salir del input
        />

        {/* Menú desplegable personalizado para prendas */}
        {menuVisible && filteredPrendas.length > 0 && (
          <div className="menu-desplegable">
            {filteredPrendas.map(
              (prenda) =>
                prenda.stock > 0 && (
                  <div
                    key={prenda.codigo}
                    onClick={() => handleSelectPrenda(prenda)}
                    className="opcion-menu"
                  >
                    {prenda.nombre} - $: {prenda.precio} - {prenda.talle}
                  </div>
                )
            )}
          </div>
        )}

        {/* Mostrar prendas seleccionadas */}
        {prendasElegidas.length == 0 ? (
          <h3></h3>
        ) : (
          <>
            <h3>Prendas Seleccionadas</h3>
            <ul className="lista-prendas">
              {prendasElegidas.map((prenda) => (
                <li key={prenda.codigo} className="item-prenda">
                  {prenda.nombre} - $: {prenda.precio} - {prenda.talle}
                  <button
                    onClick={() => handleRemovePrenda(prenda.codigo)}
                    className="boton-quitar"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2>Selecciona Cliente</h2>

        {/* Barra de búsqueda para clientes */}
        <input
          type="text"
          placeholder="Buscar cliente por nombre o dni..."
          value={buscarCliente}
          onChange={(e) => {
            setBuscarCliente(e.target.value);
            setMenuCliente(true); // Mostrar el menú al escribir
          }}
          className="input-busqueda"
          onBlur={() => setTimeout(() => setMenuCliente(false), 200)} // Ocultar menú al salir del input
        />

        {/* Menú desplegable personalizado para clientes */}
        {menuCliente && filteredClientes.length > 0 && (
          <div className="menu-desplegable">
            {filteredClientes.map((cliente) => (
              <div
                key={cliente.dni}
                onClick={() => handleSelectCliente(cliente)}
                className="opcion-menu"
              >
                {cliente.nombre} {cliente.apellido} - DNI: {cliente.dni}
              </div>
            ))}
          </div>
        )}

        {/* Mostrar cliente seleccionado */}

        {cliente ? (
          <>
            <h3>Cliente elegido:</h3>
            <ul className="lista-prendas">
              <li key={cliente.dni} className="item-prenda">
                {cliente.nombre} {cliente.apellido} - DNI: {cliente.dni}
                <button onClick={handleRemoveCliente} className="boton-quitar">
                  Quitar
                </button>
              </li>
            </ul>
          </>
        ) : (
          <ul className="lista-prendas"></ul>
        )}

        <h4 htmlFor="">Entrega:</h4>
        <input
          type="number"
          min={0}
          placeholder="Entrega:"
          value={paga}
          onChange={(e) => {
            setPaga(e.target.value);
          }}
          className="input-paga"
        />
        <h4 htmlFor="">Total:</h4>
        <input
          min={0}
          type="number"
          placeholder="Total:"
          value={total}
          onChange={(e) => {
            setTotal(e.target.value);
          }}
          className="input-paga"
        />
        {error && <h4 className="error">{error}</h4>}
        {venta && <h4 className="enviada"> {venta}</h4>}
        <button className="realizarVenta" onClick={realizarVenta}>
          Realizar Venta
        </button>
      </div>
    </>
  );
}
