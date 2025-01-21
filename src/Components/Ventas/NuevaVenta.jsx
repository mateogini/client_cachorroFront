import { Link } from "react-router-dom";
import FormVenta from "./FormVenta";
import "../Ventas/NuevaVenta.css"

export default function NuevaVenta(){
    return(
        <>
        <div className="navNuevaVenta">
        <nav className="navPrenda">
        <Link to="/">
          {" "}
          <button className="inicioPrenda">Inicio</button>

        </Link>
      </nav>
      </div>
      <h1 className="titleVenta">
        Venta
      </h1>
      <FormVenta/>
        </>
    )
}