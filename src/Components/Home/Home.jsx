import { Link } from "react-router-dom";
import "./Home.css";
export default function Home() {
  return (
    <>
      <div className="home">
        <Link to={"/nuevaventa"}>
          <button className="homeVenta"> Realizar Venta</button>
        </Link>
        <Link to={"/prendas"}>
          <button className="homePrendas">Prendas</button>
        </Link>
        <Link to={"/clientes"}>
          <button className="homeCliente"> Clientes</button>
        </Link>
        <Link to={"/ventas"}>
          <button className="homeVentas">Ventas</button>
        </Link>
      </div>
    </>
  );
}
