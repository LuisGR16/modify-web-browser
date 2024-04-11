import { interpretCommand } from './interpretCommand.js';

// setInterval -> está función tiene dos parámetros, el nombre de una función y el tiempo (ms) que tiene que esperar
// para que se repita esa función.
document.addEventListener('DOMContentLoaded', function () {

    // Función para iniciar el reconocimiento de voz
    function startSpeechRecognition() {
        const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
        recognition.lang = 'es-ES'; // Configura el idioma de reconocimiento

        recognition.onresult = function (event) {
            const result = event.results[event.results.length - 1];
            const command = result[0].transcript.trim().toLowerCase();
            console.log("Comando reconocido:", command);
            interpretCommand(command);
        }

        recognition.onend = function () {
            console.log("Reconocimiento de voz detenido. Reiniciando...");
            startSpeechRecognition(); // Reinicia el reconocimiento de voz para que esté siempre escuchando
        }

        recognition.start();
        console.log("Escuchando...");
    }

    // Iniciar el reconocimiento de voz al cargar la página
    window.onload = startSpeechRecognition;
});