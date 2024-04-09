document.addEventListener('DOMContentLoaded', function () {
    //Definicion de elementos a modificar en el programa
    const startRecognitionBtn = document.getElementById('startRecognition');
    const orderResultDiv = document.getElementById('orderResult');
    const controlTexto = document.getElementById("texto");

    //Metodo asincrono para escuchar el reconocimiento de texto

    startRecognitionBtn.addEventListener('click', function () {
        // Comprobar si el navegador soporta reconocimiento de voz
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'es-ES'; // Establecer el idioma a español

            // Configurar evento de resultado
            recognition.onresult = function (event) {
                const result = event.results[0][0].transcript;

                console.log('Orden identificada:', result);

                switch (true) {
                    //Aumenta el tamaño del texto a 16px al decir "Cambia a tamaño 4"
                    case result.includes("Cambiar tamaño a 16 pixeles") || result.includes("Cambiar tamaño a 16 píxeles"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        controlTexto.style.fontSize = '16px';
                        //Metodo que inserta la acción realizada y fecha en MockApi
                        insertarJson("Aumentar tamaño de texto");
                        break;

                    //Visita Google al decir "Abre google"
                    case result.includes("Abre Google"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        insertarJson("Visitar Google");
                        window.open('https://www.google.com/');
                        break;

                    //Crea una pestaña nueva en el navegador
                    case result.includes("Abre una nueva pestaña y ciérrala en dos segundos"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        insertarJson("Abrir nueva pestaña y cerrarla en 2 segundos");
                        const nuevaVentana = window.open('');
                        // Cerrar la ventana después de 2 segundos
                        setTimeout(function () {
                            nuevaVentana.close();
                        }, 2000); // 2000 milisegundos = 2 segundos
                        break;

                    //Crea una pestaña nueva en el navegador
                    case result.includes("Abre una nueva pestaña y ciérrala en cinco segundos") || result.includes("Abre una nueva pestaña y ciérrala en 5 segundos"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        insertarJson("Abrir nueva pestaña y cerrarla en 5 segundos");
                        const ventana = window.open('');
                        // Cerrar la ventana después de 5 segundos
                        setTimeout(function () {
                            ventana.close();
                        }, 5000); // 2000 milisegundos = 5 segundos
                        break;

                    case result.includes("Abre una nueva pestaña con un tamaño de 800 por 600") || result.includes("Abre una nueva pestaña y ciérrala en 5 segundos"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        insertarJson("Abrir nueva pestaña y cambiar el tamaño");
                        // Abrir una nueva ventana con dimensiones específicas y sin barras de herramientas
                        window.open('https://www.google.com', '_blank', 'width=800,height=600,toolbar=no');

                        break;

                    //Cierra la pestaña actual
                    /*  case result.includes("Cerrar pestaña actual"):
                         orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                         //Operacion asincrona para insertar en Json ya que si no la ventana se cierra antes de insertar la informacion Json
                         insertarJson("Cerrar pestaña actual").then(() => {
                             window.close();
                         })
                             .catch(error => {
                                 console.error('Error al insertar JSON:', error);
                             });
                         break; */

                    case result.includes("Cerrar navegador"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        //Operacion asincrona para insertar en Json ya que si no la ventana se cierra antes de insertar la informacion Json
                        insertarJson('Cerrar navegador')
                            .then(() => {
                                window.open('', '_self').close();
                            })
                            .catch(error => {
                                console.error('Error al insertar JSON:', error);
                            });
                        break;

                    default:
                        orderResultDiv.innerHTML = `<p>Orden desconocida, intenta de nuevo</p>`;
                        break;
                }

            };

            // Iniciar reconocimiento
            recognition.start();
        } else {
            alert('El reconocimiento de voz no es soportado por este navegador.');
        }
    });

    //Funcion para guarda ordenes o acciones realizadas de acuerdo a la accion definida en el parametro

    function insertarJson(accion) {
        //La funcion trabaja con promesas para asegurar que los datos se inserten antes de que se realice la acción ya que si no
        //al cerrar una ventana esto ocurrira antes de que se envien los datos a MockApi
        return new Promise((resolve, reject) => {
            //Definicion de la fecha actual formateandola al formato local de la PC
            const fechaHoraActual = new Date();
            const fechaHoraFormateada = fechaHoraActual.toLocaleString();

            //Se crea un objeto que almacena la fecha obtenida y la accion del parametro
            const recurso = {
                id: 1,
                accion: accion,
                fecha: fechaHoraFormateada
            };

            // Se confierte el objeto a JSON
            const recursoJSON = JSON.stringify(recurso);

            // Se envia la solicitud HTTP a MockAPi usando el metodo POST, cabecera que indica que es Json y el cuerpo del json del objeto
            fetch('https://6614b1e72fc47b4cf27cc5a3.mockapi.io/accion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: recursoJSON
            })
                //Operacion asincrona en la que se espera a la respuesta de MockApi, si esta es invalida se indica que no se subio el archivo
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al subir el recurso');
                    }
                    return response.json();
                })
                //Operacion asincrona en la que si la informacion se subio correctamente se devuelve a la consola y la promesa se resuelve
                .then(data => {
                    console.log('Recurso subido exitosamente:', data);
                    resolve(data);
                })
                //Operacion asincrona en la que si la informacion no subio correctamente se devuelve un error en la consola y se rechaza la promesa
                .catch(error => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    }
});
