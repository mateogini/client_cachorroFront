import { Link } from "react-router-dom";
import "./ListPrenda.css";
import React, { useContext, useState } from "react";
import Prenda from "./Prenda";
import { Context } from "../Context/Context";
import EditarPrenda from "./EditarPrenda";
export default function ListPrenda() {
  const [,,prendas,,,,,,,,,,,,,fetchDataOrder, fetchData] = useContext(Context);
  const [buscarPrenda, setBuscarPrenda] = useState(""); // Para buscar prendas
  const filteredPrendas = prendas.filter((prenda) =>
    prenda.nombre.toLowerCase().includes(buscarPrenda.toLowerCase())
  );
  const [orderStock, setOrder] = useState(false);


  const orderByStock = () =>{
    if(orderStock){
      setOrder(false);
      fetchData();
    }
    else{
      setOrder(true);
      fetchDataOrder();
    }
  }
  const [formVisible, setFormVisible] = useState(false);
  const [prendaParaEditar, setPrendaParaEditar] = useState(null);
  const handleEditarPrenda = (prenda) => {
    setPrendaParaEditar(prenda);
    setFormVisible(true); // Mostrar el formulario de edición
  };

  return (
    <>
      <nav className="navPrenda">
        <Link to="/prendanueva">
          <button className="nuevaPrenda">Crear Nueva</button>
        </Link>

        <Link to="/">
          {" "}
          <button className="inicioPrenda">Inicio</button>
        </Link>
      </nav>
      <div className="listPrendas">
        <div className="inputBuscar">
        <h1>Prendas</h1>
        <input
        type="text"
        placeholder="Buscar prenda por nombre..."
        value={buscarPrenda}
        onChange={(e) => {
          setBuscarPrenda(e.target.value);
        }}
        className="input-busqueda"
      />
      {orderStock ? (<>
        <button className="orderByStock" onClick={orderByStock}> Ordenar por nombre</button>

      </>) : (<>
        <button className="orderByStock" onClick={orderByStock}> Ordenar por stock</button>

      </>)}
        </div>
       
        <div className="prendasTodas">
          {filteredPrendas.map((prenda) => (
            <Prenda
              key={prenda.codigo}
              pre={prenda}
              onEdit={handleEditarPrenda} // Pasamos la función al componente Prenda
            />
          ))}
        </div>
      </div>
         {/* Si el formulario de edición está visible, lo mostramos por encima de todo */}
         {formVisible && prendaParaEditar && (
        <EditarPrenda
          prenda={prendaParaEditar}
          onClose={() => setFormVisible(false)}  // Cerrar el formulario
        />
      )}
    </>
  );
}
