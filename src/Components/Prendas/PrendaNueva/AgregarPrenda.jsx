import { Link } from "react-router-dom";
import FormPrendaNueva from "./FormPrendaNueva";
import "../PrendaNueva/AgregarPrenda.css"

export default function AgregarPrenda() {
  return (
    <>
      <nav className="navPrenda">
        <Link to="/prendas">
        <button className="nuevaPrenda">Prendas</button>
        </Link>
        <Link to="/">
          <button className="inicioPrenda">Inicio</button>
        </Link>
      </nav>
      <FormPrendaNueva />
    </>
  );
}
