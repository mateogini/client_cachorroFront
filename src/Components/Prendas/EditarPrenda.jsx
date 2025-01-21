import React, { useContext, useState } from "react";
import "../Prendas/EditarPrenda.css";
import { Context } from "../Context/Context";
export default function EditarPrendaForm({ prenda, onClose }) {
  const [nombre, setNombre] = useState(prenda.nombre);
  const [precio, setPrecio] = useState(prenda.precio);
  const [stock, setStock] = useState(prenda.stock);
  const [talle, setTalle] = useState(prenda.talle);
  const [imagen, setImagen] = useState(prenda.imagen);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagen(file); // Guardamos solo el archivo en el estado
    } else {
      setError("Por favor, selecciona un archivo de imagen.");
      setEnviada("");
    }
  };

  const [, , , , , , , , , editarPrenda] = useContext(Context);
  const handleSubmit = () => {
    // Aquí puedes hacer la lógica para editar la prenda
    // Por ejemplo, actualizar la prenda en el contexto o hacer una petición a la API
    console.log("Editando prenda:", { nombre, precio, stock, talle });
    const formData = new FormData();
    formData.append("codigo", prenda.codigo);
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("talle", talle);
    formData.append("stock", stock);
    formData.append("imagen", imagen);

    editarPrenda(prenda.codigo, formData);
    onClose(); // Cerrar el formulario después de editar
  };

  return (
    <div className="form-editar-prenda">
      <h2>Editar Prenda</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label>Precio</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <label>Talle</label>
        <input
          type="text"
          value={talle}
          onChange={(e) => setTalle(e.target.value)}
        />
        <label>Imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // Aquí solo se guarda el archivo
        />
        <button type="submit">Guardar Cambios</button>
        <button onClick={onClose}>Cerrar</button>
      </form>
    </div>
  );
}
