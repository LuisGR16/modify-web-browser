import { ultimaOrden } from "./ultimaOrden.js";

// Función para actualizar el contenido del elemento HTML con el valor obtenido
const actualizarOrden = async () => {
    const pOrden = document.getElementById("orden");
    const { value } = await ultimaOrden();
    pOrden.innerText = value.accion;
};

// Llamar a la función actualizarOrden() inicialmente
actualizarOrden();

// Llamar a la función actualizarOrden() cada 2 segundos usando setInterval()
setInterval(actualizarOrden, 2000);

