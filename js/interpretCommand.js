import { insertarJson } from './sendData.js';
// Función para interpretar los comandos de voz
export function interpretCommand(result) {
    //Definicion de elementos a modificar en el programa
    const orderResultDiv = document.getElementById('orderResult');
    const controlTexto = document.getElementById("texto");
    if (result.includes("helen")){
        
            //Aumenta el tamaño del texto a 16px al decir "Cambia a tamaño 4"
            if (result.includes("cambiar tamaño a 16 pixeles") || result.includes("cambiar tamaño a 16 píxeles")){
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                controlTexto.style.fontSize = '16px';
                //Metodo que inserta la acción realizada y fecha en MockApi
                insertarJson("Aumentar tamaño de texto");
            }

            //Visita Google al decir "Abre google"
            if (result.includes("abre google")){
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                insertarJson("Visitar Google");
                window.open('https://www.google.com/');
            }

            //Crea una pestaña nueva en el navegador
            if (result.includes("abre una nueva pestaña y ciérrala en dos segundos") || result.includes("abre una nueva pestaña y ciérrala en 2 segundos")){
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                insertarJson("Abrir nueva pestaña y cerrarla en 2 segundos");
                const nuevaVentana = window.open('');
                // Cerrar la ventana después de 2 segundos
                setTimeout(function () {
                    nuevaVentana.close();
                }, 2000); // 2000 milisegundos = 2 segundos
            }

            //Crea una pestaña nueva en el navegador
            if (result.includes("abre una nueva pestaña y ciérrala en cinco segundos") || result.includes("abre una nueva pestaña y ciérrala en 5 segundos")){
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                insertarJson("Abrir nueva pestaña y cerrarla en 5 segundos");
                const ventana = window.open('');
                // Cerrar la ventana después de 5 segundos
                setTimeout(function () {
                    ventana.close();
                }, 5000); // 2000 milisegundos = 5 segundos
            }

            if (result.includes("abre una nueva ventana con un tamaño de 800 por 600")){
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                insertarJson("Abrir nueva pestaña y cambiar el tamaño");
                // Abrir una nueva ventana con dimensiones específicas y sin barras de herramientas
                window.open('https://www.google.com', '_blank', 'width=800,height=600,toolbar=no');

            }

            //Cierra la pestaña actual
            /*  if (result.includes("Cerrar pestaña actual")){
                 orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                 //Operacion asincrona para insertar en Json ya que si no la ventana se cierra antes de insertar la informacion Json
                 insertarJson("Cerrar pestaña actual").then(() => {
                     window.close();
                 })
                     .catch(error => {
                         console.error('Error al insertar JSON:', error);
                     });
                } */

            if (result.includes("cerrar navegador")){
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                //Operacion asincrona para insertar en Json ya que si no la ventana se cierra antes de insertar la informacion Json
                insertarJson('Cerrar navegador')
                    .then(() => {
                        window.open('', '_self').close();
                    })
                    .catch(error => {
                        console.error('Error al insertar JSON:', error);
                    });
            }

            /* else {
                orderResultDiv.innerHTML = `<p>Orden desconocida, intenta de nuevo</p>`;
            } */
        

    }
}