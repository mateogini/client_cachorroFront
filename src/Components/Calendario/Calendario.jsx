import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Calendario/Calendario.css";
import { Context } from "../Context/Context";

export default function Calendario() {
  const [, , , , , , , , , , traerCliente, , , buscarVentas] =
    useContext(Context);
  const [selectedDate, setSelectedDate] = useState(null);
  const [clientesConTotales, setClientesConTotales] = useState([]); // Estado para clientes con totales
  const [error, setError] = useState(null);
  const [totalDia, setTotalDia] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
  
      try {
        const ventas = await buscarVentas(formattedDate);
  
        // Usar un Map para agrupar ventas por cliente
        const clienteMap = new Map();
  
        for (const venta of ventas) {
          const cliente = clienteMap.get(venta.dni_cliente)
            || (await traerCliente(venta.dni_cliente));
  
          if (!clienteMap.has(venta.dni_cliente)) {
            clienteMap.set(venta.dni_cliente, { ...cliente, total: 0 });
          }
  
          clienteMap.get(venta.dni_cliente).total += venta.total;
        }
  
        // Convertir el Map en una lista
        const clientesAgrupados = Array.from(clienteMap.values());
        setClientesConTotales(clientesAgrupados);
  
        // Calcular el total del día
        const total = clientesAgrupados.reduce((acc, cliente) => acc + cliente.total, 0);
        setTotalDia(total);
  
        setError(null);
      } catch (err) {
        console.error("Error al buscar clientes o ventas:", err);
        setError("No se pudieron cargar las ventas o los clientes.");
      }
    }
  };
  
  const cantidadVendida = () => {
    const total = clientesConTotales.reduce(
      (acc, cliente) => acc + cliente.total,
      0
    );
    setTotalDia(total);
  };

  return (
    <div className="calendario-contenedor">
      <h2 className="calendario-titulo">Selecciona una fecha</h2>
      <div className="calendario-picker">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Elige una fecha"
          className="calendario-input"
        />
        <button
          onClick={handleSubmit}
          disabled={!selectedDate}
          className={`calendario-boton ${
            !selectedDate ? "boton-desactivado" : ""
          }`}
        >
          Confirmar Fecha
        </button>
      </div>

      {error && <p className="calendario-error">{error}</p>}
      <h3 className="ventas-titulo total">Total del dia: ${totalDia}</h3>
      <div className="calendario-clientes">
        <h3 className="ventas-titulo">Ventas por Cliente</h3>
        {clientesConTotales.length > 0
          ? clientesConTotales.map((cliente, index) => (
              <div key={index} className="cliente-item">
                <p>
                  <strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}
                </p>
                <p>
                  <strong>DNI:</strong> {cliente.dni}
                </p>
                <p>
                  <strong>Total Ventas:</strong> ${cliente.total}
                </p>
                <hr />
              </div>
            ))
          : selectedDate && (
              <p className="sin-ventas">
                No se encontraron ventas para esta fecha.
              </p>
            )}
      </div>
    </div>
  );
}
