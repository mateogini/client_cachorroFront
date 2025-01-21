import { Link } from "react-router-dom";
import "./Home.css";
export default function Home() {
  return (
    <>
      <div className="home">
      <Link to={"/nuevaventa"}>
        <button className="homeVenta" >
          {" "}
          Realizar Venta 
        </button>
        </Link>

        <button className="homePrendas">
          <Link to={"/prendas"}> Prendas </Link>
        </button>
        <button className="homeCliente">
          {" "}
          <Link to={"/clientes"}>Clientes </Link>
        </button>
        <button className="homeVentas">
          <Link to={"/ventas"}> Ventas </Link>
        </button>
      </div>
    </>
  );
}
