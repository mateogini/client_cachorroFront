import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [borrado, setBorrado] = useState(false);
  const [prendas, setPrendas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cliente,setCliente] = useState();

  // PRENDAS
  const fetchData = () => {
    return axios
      .get("http://46.202.150.123:8080/prenda")
      .then((response) => setPrendas(response.data));

  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchDataOrder = () => {
    return axios
      .get("http://46.202.150.123:8080/prenda/asc")
      .then((response) => setPrendas(response.data));

  };

  const borrarPrenda = (codigo) => {
    axios
      .delete(`http://46.202.150.123:8080/prenda/${codigo}`)
      .then(() => {
        console.log(`Prenda con código ${codigo} eliminada.`);
        fetchData(); // Recargar prendas después de eliminar
      })
      .catch((error) => {
        console.error("Error al eliminar la prenda:", error);
      });
  };

  const prendaNueva = (formData) => {
    axios
      .post("http://46.202.150.123:8080/prenda", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Muy importante para archivos
        },
      })
      .then((response) => {
        console.log("Prenda agregada:", response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error al agregar prenda:", error);
      });
  };
  const editarPrenda = (codigo, formData) => {
    axios
      .put(`http://46.202.150.123:8080/prenda/${codigo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Muy importante para archivos
        },
      })
      .then((response) => {
        console.log("Prenda editada:", response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error al editar prenda:", error);
      });
  };

  // Clientes
  const fetchDataClientes = () => {
    return axios
      .get("http://46.202.150.123:8080/cliente")
      .then((response) => setClientes(response.data));
  };
  useEffect(() => {
    fetchDataClientes();
  }, []);
  const editarCliente = (viejodni, formData) =>{
    return axios
      .put(`http://46.202.150.123:8080/cliente/${viejodni}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Cliente editado:", response.data);
        // Llamar a fetchDataClientes después de agregar el cliente
        fetchDataClientes();
      })
      .catch((error) => {
        console.error("El cliente no logro editarse:", error);
        throw error; // Lanzar el error para que sea manejado en el componente
      });
  }

  const clienteNuevo = (formData) => {
    return axios
      .post("http://46.202.150.123:8080/cliente", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Cliente agregado:", response.data);
        // Llamar a fetchDataClientes después de agregar el cliente
        fetchDataClientes();
      })
      .catch((error) => {
        console.error("El cliente ya existe:", error);
        throw error; // Lanzar el error para que sea manejado en el componente
      });
  };
  const borrarCliente = (dni) => {
    axios
      .delete(`http://46.202.150.123:8080/cliente/${dni}`)
      .then(() => {
        console.log(`Cliente con dni ${dni} eliminado.`);
        fetchDataClientes(); // Recargar clientes después de eliminar
      })
      .catch((error) => {
        console.error("Error al eliminar el cliente:", error);
      });
    }

    const traerCliente = (dni) => {
      return axios
        .get(`http://46.202.150.123:8080/cliente/${dni}`)
        .then((response) => {
          console.log(`Cliente con dni ${dni} traido.`);
          fetchDataClientes(); // Si esta función es necesaria
          return response.data; // Devuelve los datos del cliente
        })
        .catch((error) => {
          console.error("Error al traer el cliente:", error);
          throw error; // Lanza el error para manejarlo en el componente
        });
    };
    const pagaDeuda = (dni, formData) => {
      axios
      .put(`http://46.202.150.123:8080/cliente/${dni}/paga`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Pago realizado", response.data);
        fetchDataClientes(); // Recargar clientes después de eliminar
      })
      .catch((error) => {
        console.log("error al realizar pago", error);
      });
    };
    


    //VENTAS
    const nuevaVenta = (dni, prendas, paga, total) => {
      if(paga == null){
        paga=0;
      }
      return axios
        .post(`http://46.202.150.123:8080/venta/${dni}?paga=${paga}&total=${total}`, prendas, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Venta realizada:", response.data);
          fetchData();
          fetchDataClientes(); // Recargar clientes después de eliminar
        })
        .catch((error) => {
          console.error("Error al realizar venta:", error);
          throw error; // Lanzar el error para que sea manejado en el componente
        });
    };

    const buscarVentas = (fecha) =>{
      return axios
      .get(`http://46.202.150.123:8080/venta/fecha/${fecha}`)
      .then((response) => {
        console.log(`Ventas el ${fecha} traidas.`);
        return response.data; // Devuelve los datos del cliente
      })
      .catch((error) => {
        console.error("Error al traer las ventas en la fecha:", error);
        throw error; // Lanza el error para manejarlo en el componente
      });
    }
    const ventasXDni = (dni) =>{
      return axios
      .get(`http://46.202.150.123:8080/venta/${dni}`)
      .then((response) => {
        console.log(`Compras del el ${dni} traidas.`);
        return response.data; // Devuelve los datos del cliente
      })
      .catch((error) => {
        console.error("Error al traer las compras con ese dni:", error);
        throw error; // Lanza el error para manejarlo en el componente
      });
    }

    return (
      <Context.Provider
        value={[
          borrado,
          setBorrado,
          prendas,
          clientes,
          borrarPrenda,
          prendaNueva,
          clienteNuevo,
          borrarCliente,
          nuevaVenta,
          editarPrenda,
          traerCliente,
          cliente,
          pagaDeuda,
          buscarVentas,
          ventasXDni,
          fetchDataOrder,
          fetchData, 
          editarCliente
        ]}
      >
        {children}
      </Context.Provider>
    );
  }
