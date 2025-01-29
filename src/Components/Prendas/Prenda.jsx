import React, { useContext, useState } from "react";
import "../Prendas/Prenda.css";
import { Context } from "../Context/Context";

export default function Prenda({ pre, onEdit }) {
  const [, , , , borrarPrenda] = useContext(Context);
  const handleOnClick = (codigo) => {
    borrarPrenda(codigo);
  };

  return (
    <>
      <div className="cardPrenda" key={pre.codigo}>
        {/* Mostrar imagen si existe y es base64 */}
        {pre.imagen ?  (<>
          <img
            className="imgPrenda"
            src={`data:image/jpeg;base64,${pre.imagen}`} // Suponiendo que la imagen esté en formato JPEG
            alt={pre.nombre}
          />
          <div className="infoCard">
          <p className="nombreCard">{pre.nombre}</p>
          <p className="precioCard">${pre.precio}</p>
          {pre.stock == 0 && <p className="cardAgotada">AGOTADA</p>}
          {pre.stock > 0 && (
            <p className="talleCard">
              Stock: {pre.stock} {pre.talle}
            </p>
          )}
          <div className="botonesCard">
          <button className="editarPrenda" onClick={() => onEdit(pre)}>
              Editar
            </button>
            <button
              className="borrarPrenda"
              onClick={() => handleOnClick(pre.codigo)}
            >
              Borrar
            </button>
            
          </div>
        </div>
          
        </>) : (<>
          <div className="infoCard" style={{marginTop:"250px"}}>
          <p className="nombreCard">{pre.nombre}</p>
          <p className="precioCard">${pre.precio}</p>
          {pre.stock == 0 && <p className="cardAgotada">AGOTADA</p>}
          {pre.stock > 0 && (
            <p className="talleCard">
              Stock: {pre.stock} {pre.talle}
            </p>
          )}
          <div className="botonesCard">
          <button className="editarPrenda" onClick={() => onEdit(pre)}>
              Editar
            </button>
            <button
              className="borrarPrenda"
              onClick={() => handleOnClick(pre.codigo)}
            >
              Borrar
            </button>
            
          </div>
        </div>
        </>)}
        
      </div>
    </>
  );
}
