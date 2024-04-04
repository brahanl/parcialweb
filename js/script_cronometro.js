let running = false; // Variable que controla si el Cronometro está en ejecución o no.
let startTime, interval; // Variables para el tiempo de inicio y el intervalo del Cronometro.
let laps = []; // Array que almacenará las vueltas del Cronometro.
let lastTime = 0; // Variable que almacena el tiempo de la última ejecución del Cronometro.


function update() {
    // Función para actualizar el tiempo
    const currentTime = Date.now(); // Obtiene el tiempo actual en milisegundos
    let timeDiff = currentTime - startTime + lastTime; // Calcula la diferencia de tiempo desde un punto inicial (suponiendo que 'startTime' y 'lastTime' están definidos en otro lugar)

    const hours = Math.floor(timeDiff / (1000 * 60 * 60)); // Calcula el número de horas en la diferencia restante de tiempo
    timeDiff -= hours * (1000 * 60 * 60); // Resta los milisegundos correspondientes a las horas

    const minutes = Math.floor(timeDiff / (1000 * 60)); // Calcula el número de minutos en la diferencia restante de tiempo
    timeDiff -= minutes * (1000 * 60); // Resta los milisegundos correspondientes a los minutos

    const seconds = Math.floor(timeDiff / 1000); // Calcula el número de segundos en la diferencia restante de tiempo
    timeDiff -= seconds * 1000; // Resta los milisegundos correspondientes a los segundos

    document.getElementById("display").textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${timeDiff.toString().padStart(3, "0")}`; // Actualiza el elemento HTML con el tiempo en formato horas:minutos:segundos.milisegundos
}

document.getElementById("startStop").addEventListener("click", function () {
    // Agrega un event listener al clic del elemento con el id 'startStop'
    if (running) {
        // Verifica si la variable 'running' es verdadera
        clearInterval(interval); // Detiene el intervalo de tiempo previamente establecido
        running = false; // Establece 'running' como falso, indicando que se detuvo el tiempo
        this.textContent = "Iniciar"; // Cambia el texto del elemento clicado a 'Iniciar'
        document.getElementById("lap").disabled = true; // Deshabilita el elemento con id 'lap'
        document.getElementById("resetbtn").style.display = "inline-block"; // Muestra el elemento con id 'reset'
        lastTime += Date.now() - startTime; // Actualiza 'lastTime' sumando la diferencia de tiempo desde el inicio
    } else {
        // En caso contrario, si 'running' es falso
        running = true; // Establece 'running' como verdadero, indicando que se está ejecutando el tiempo
        this.textContent = "Parar"; // Cambia el texto del elemento clicado a 'Parar'
        document.getElementById("lap").disabled = false; // Habilita el elemento con id 'lap'
        document.getElementById("resetbtn").style.display = "none"; // Oculta el elemento con id 'reset'
        startTime = Date.now(); // Actualiza el 'startTime' con el tiempo actual
        interval = setInterval(update, 10); // Inicia un intervalo que ejecuta la función 'update' cada 10 milisegundos
    }
});

document.getElementById("lap").addEventListener("click", function () {
    // Agrega un event listener al clic en el elemento con id 'lap'
    if (running) {
        // Verifica si la variable 'running' es verdadera
        laps.push(document.getElementById("display").textContent); // Agrega el contenido del elemento con id 'display' al final de un array llamado 'laps'
        const lapList = document.getElementById("laps"); // Obtiene el elemento con id 'laps' y lo almacena en la variable lapList
        const li = document.createElement("li"); // Crea un nuevo elemento de lista ('li')
        li.textContent = laps[laps.length - 1]; // Establece el texto del nuevo elemento de lista como el último elemento agregado al array 'laps'
        lapList.appendChild(li); // Agrega el nuevo elemento de lista al elemento con id 'laps'
    }
});

document.getElementById("resetbtn").addEventListener("click", function () {
    // Agrega un event listener al clic en el elemento con id 'reset'
    clearInterval(interval); // Detiene el intervalo de tiempo
    running = false; // Establece la variable 'running' como falsa
    document.getElementById("startStop").textContent = "Iniciar"; // Cambia el texto del elemento con id 'startStop' a 'Iniciar'
    document.getElementById("display").textContent = "00:00:00.000"; // Establece el texto del elemento con id 'display' a '00:00:00.000'
    document.getElementById("laps").innerHTML = ""; // Limpia el contenido del elemento con id 'laps'
    laps = []; // Reinicia el array 'laps' vaciándolo
    lastTime = 0; // Restablece 'lastTime' a cero
    this.style.display = "none"; // Oculta el elemento clicado ('reset')
});
