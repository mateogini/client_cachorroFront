import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import ".//FormClienteNuevo.css";

export default function FormClienteNuevo() {
  const [,,,,,,clienteNuevo] = useContext(Context);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [celular, setCelular] = useState("");

  const [error, setError] = useState(null);
  const [enviado, setEnviado] = useState(null);

  const handleSubmit = () => {
    if (!nombre || !apellido || !dni || !celular) {
      setError("Completa todos los campos");
      setEnviado("");
      return;
    }

    const formData = { dni, nombre, apellido, celular };

    clienteNuevo(formData)
      .then(() => {
        setNombre("");
        setApellido("");
        setDni("");
        setCelular("");
        setError(null);
        setEnviado("Cliente agregado correctamente ✅");
      })
      .catch(() => {
        setError("El cliente ya existe");
        setEnviado(null);
      });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Nuevo Cliente</h2>
        <div className="form-field">
          <label>Nombre</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>
        <div className="form-field">
          <label>Apellido</label>
          <input 
            type="text" 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)} 
          />
        </div>
        <div className="form-field">
          <label>DNI</label>
          <input 
          min={1}
            type="number" 
            value={dni} 
            onChange={(e) => setDni(e.target.value)} 
          />
        </div>
        <div className="form-field">
          <label>Celular</label>
          <input 
            type="number" 
            value={celular} 
            onChange={(e) => setCelular(e.target.value)} 
          />
        </div>
        {error && <div className="form-message error">{error}</div>}
        {enviado && <div className="form-message success">{enviado}</div>}
        <div className="form-field">
          <button onClick={handleSubmit}>Agregar Cliente</button>
        </div>
      </div>
    </div>
  );
}
