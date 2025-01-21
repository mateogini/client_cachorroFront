import { Link } from "react-router-dom";
import Calendario from "./Calendario";

export default function Ventas() {
  return (
    <>
      <nav className="navPrenda">
        <Link to="/ventas">
          <button className="nuevaPrenda">Ventas</button>
        </Link>

        <Link to="/">
          {" "}
          <button className="inicioPrenda">Inicio</button>
        </Link>
      </nav>
      <Calendario />
    </>
  );
}
