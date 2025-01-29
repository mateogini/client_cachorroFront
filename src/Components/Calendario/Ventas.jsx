import { Link } from "react-router-dom";
import Calendario from "./Calendario";

export default function Ventas() {
  return (
    <>
      <nav className="navPrenda" style={{display:"flex", flexDirection:"row-reverse"}}>
        
        <Link to="/">
          {" "}
          <button className="inicioPrenda" >Inicio</button>
        </Link>
      </nav>
      <Calendario />
    </>
  );
}
