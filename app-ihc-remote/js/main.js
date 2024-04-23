import { ultimaOrden } from "./ultimaOrden.js";

let ultimaOrdenConocida = null; // Variable para almacenar la última orden conocida
const txtModify = document.getElementById("text-modify");

// Función para actualizar la orden si es diferente de la última conocida
const actualizarOrden = async () => {
    const { value } = await ultimaOrden();
    const pOrden = document.getElementById("orden");
    pOrden.innerText = value.accion;
    if (value.accion !== ultimaOrdenConocida) { // Verificar si la nueva orden es diferente
        ultimaOrdenConocida = value.accion; // Actualizar la última orden conocida
        ejecutarOrden(value.accion); // Ejecutar la nueva orden
    }
};

const ejecutarOrden = (orden) => {
    
    if (orden === "Aumentar tamaño de texto") {
        txtModify.style.fontSize = '16px';
    }
    
    if (orden === "Buscar pandas") {
        window.open('https://www.google.com/search?q=pandas+animales&sca_esv=5d0811d5ae0715ef&sxsrf=ACQVn0-1bkGYJQ5k8ZLJtZ64-gj8Pq8Pjg%3A1713887693767&ei=zdknZsHBLsOvur8PsoSLuAM&gs_ssp=eJzj4tDP1TcwTsoyNGD04i9IzEtJLFZIzMvMTcxJLQYAbNMIqQ&oq=pandas+anoimales&gs_lp=Egxnd3Mtd2l6LXNlcnAiEHBhbmRhcyBhbm9pbWFsZXMqAggAMgcQLhiABBgNMgYQABgNGB4yCBAAGAUYDRgeMgoQABgFGA0YHhgPMggQABgIGA0YHjIIEAAYCBgNGB4yCBAAGAgYDRgeMgoQABgIGA0YHhgPMgoQABgIGA0YHhgPMgoQABgIGA0YHhgPMhYQLhiABBgNGJcFGNwEGN4EGN8E2AEBSM4hUKACWO0QcAJ4AZABAJgBrAGgAaYMqgEEMC4xMbgBA8gBAPgBAZgCDqAC7hXCAgoQABiwAxjWBBhHwgINEAAYgAQYsAMYQxiKBcICEBAAGIAEGLEDGEMYgwEYigXCAgoQABiABBhDGIoFwgIFEAAYgATCAggQLhiABBixA8ICBRAuGIAEwgIHEAAYgAQYE8ICCBAAGBMYFhgewgIFECEYoAHCAgcQABiABBgNwgIIEAAYDRgeGA-YAwCIBgGQBgq6BgYIARABGBSSBwgyLjExLjYtMaAHunQ&sclient=gws-wiz-serp');
    }
    
    if (orden === "Visitar Google") {
        window.open('https://www.google.com/');
    }

    if (orden === "Abrir nueva pestaña y cerrarla en 2 segundos") {
        window.open('https://www.google.com/');
        const nuevaVentana = window.open('');
        setTimeout(function () {
            nuevaVentana.close();
        }, 2000);
    }
    if (orden === "Abrir nueva pestaña y cerrarla en 5 segundos") {
        window.open('https://www.google.com/');
        const nuevaVentana = window.open('');
        setTimeout(function () {
            nuevaVentana.close();
        }, 5000);
    }
    if (orden === "Abrir nueva pestaña y cambiar el tamaño") {
        window.open('https://www.google.com', '_blank', 'width=800,height=600,toolbar=no');
    }
}

// Llamar a la función actualizarOrden() cada 2 segundos usando setInterval()
setInterval(actualizarOrden, 2000);

// Llamar a la función actualizarOrden() inicialmente
actualizarOrden();
