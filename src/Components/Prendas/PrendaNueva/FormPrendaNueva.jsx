import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import ".//FormPrendaNueva.css";

export default function FormPrendaNueva() {
  const [,,,,,prendaNueva] = useContext(Context);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [talle, setTalle] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState(null);
  const [enviada, setEnviada] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagen(file);
    } else {
      setError("Por favor, selecciona un archivo de imagen.");
      setEnviada(null);
    }
  };

  const handleSubmit = () => {
    if (!nombre || !precio || !talle || !stock || !imagen) {
      setError("Completa todos los campos");
      setEnviada(null);
      return;
    }

    if (stock < 1) {
      setError("El stock debe ser mayor a 0");
      setEnviada(null);
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("talle", talle);
    formData.append("stock", stock);
    formData.append("imagen", imagen);

    prendaNueva(formData);
    setNombre("");
    setPrecio("");
    setTalle("");
    setStock("");
    setImagen(null);
    setError(null);
    setEnviada("Prenda agregada correctamente ✅");
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Nueva Prenda</h2>
        <div className="form-field">
          <label>Nombre</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>
        <div className="form-field">
          <label>Precio</label>
          <input 
            type="number" 
            value={precio} 
            onChange={(e) => setPrecio(e.target.value)} 
          />
        </div>
        <div className="form-field">
          <label>Talle</label>
          <input 
            type="text" 
            value={talle} 
            onChange={(e) => setTalle(e.target.value)} 
          />
        </div>
        <div className="form-field">
          <label>Stock</label>
          <input 
            type="number" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)} 
          />
        </div>
        <div className="form-field">
          <label>Imagen</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>
        {error && <div className="form-message error">{error}</div>}
        {enviada && <div className="form-message success">{enviada}</div>}
        <div className="form-field">
          <button onClick={handleSubmit}>Agregar Prenda</button>
        </div>
      </div>
    </div>
  );
}
