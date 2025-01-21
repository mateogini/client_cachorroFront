import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListPrenda from "./Components/Prendas/ListPrenda";
import ListClientes from "./Components/Clientes/ListClientes";
import AgregarPrenda from "./Components/Prendas/PrendaNueva/AgregarPrenda";
import { ContextProvider } from "./Components/Context/Context";
import AgregarCliente from "./Components/Clientes/ClienteNuevo/AgregarCliente";
import NuevaVenta from "./Components/Ventas/NuevaVenta";
import VistaCliente from "./Components/Clientes/VistaCliente/VistaCliente";
import Ventas from "./Components/Calendario/Ventas";

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/prendas" element={<ListPrenda />} />
            <Route exact path="/clientes" element={<ListClientes />} />
            <Route exact path="/ventas" element={<Ventas/>} />
            <Route exact path="/prendanueva" element={<AgregarPrenda />} />
            <Route exact path="/clientenuevo" element={<AgregarCliente />} />
            <Route exact path="/nuevaventa" element={<NuevaVenta />} />
            <Route
              exact
              path="/cliente/:clienteId"
              element={<VistaCliente />}
            />
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
