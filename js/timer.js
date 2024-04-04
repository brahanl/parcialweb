const btnStart = document.getElementById("btn-start"); // Obtiene el elemento con el id "btn-start" y lo almacena en la variable btnStart
const btnPause = document.getElementById("btn-pause"); // Obtiene el elemento con el id "btn-pause" y lo almacena en la variable btnPause
const btnContinue = document.getElementById("btn-continue"); // Obtiene el elemento con el id "btn-continue" y lo almacena en la variable btnContinue
const btnReset = document.getElementById("btn-reset"); // Obtiene el elemento con el id "btn-reset" y lo almacena en la variable btnReset


let interval; // Variable para almacenar el intervalo del temporizador
let remainingTime; // Variable para almacenar el tiempo restante

btnPause.style.display = "none";
btnContinue.style.display = "none";
btnReset.style.display = "none";

btnStart.addEventListener("click", () => { // Agrega un event listener al hacer clic en el botón con el id 'btnStart'
    if (!interval) { // Verifica si 'interval' es falso o no está definido
      const hours = document.getElementById("hour"); // Obtiene el elemento con el id 'hour' y lo almacena en la variable 'hours'
      const minutes = document.getElementById("minute"); // Obtiene el elemento con el id 'minute' y lo almacena en la variable 'minutes'
      const seconds = document.getElementById("second"); // Obtiene el elemento con el id 'second' y lo almacena en la variable 'seconds'
  
      let hoursValue = hours.value.trim() === '' || isNaN(parseInt(hours.value)) ? 0 : parseInt(hours.value); // Obtiene el valor de 'hours', verifica si está vacío o no es un número, y lo convierte a entero
      let minutesValue = minutes.value.trim() === '' || isNaN(parseInt(minutes.value)) ? 0 : parseInt(minutes.value); // Obtiene el valor de 'minutes', verifica si está vacío o no es un número, y lo convierte a entero
      let secondsValue = seconds.value.trim() === '' || isNaN(parseInt(seconds.value)) ? 0 : parseInt(seconds.value); // Obtiene el valor de 'seconds', verifica si está vacío o no es un número, y lo convierte a entero
  
      let duration = hoursValue * 60 * 60 + minutesValue * 60 + secondsValue; // Calcula la duración total en segundos sumando las horas, minutos y segundos
  
      const display = document.getElementById("timer"); // Obtiene el elemento con el id 'timer' y lo almacena en la variable 'display'
      startTimer(duration, display); // Inicia un temporizador con la duración y el elemento donde se mostrará

      btnPause.style.display = "block";
        btnStart.style.display = "none";
    }
  });
  

  btnPause.addEventListener("click", () => { // Agrega un event listener al hacer clic en el botón identificado como 'btnPause'
    if (interval) { // Comprueba si 'interval' está definido y, por lo tanto, el temporizador está en marcha
        clearInterval(interval); // Detiene el temporizador
        interval = undefined; // Establece 'interval' como 'undefined' para indicar que el temporizador está pausado

        btnContinue.style.display = "block";
        btnPause.style.display = "none";
        btnReset.style.display = "block";
    }
});


btnContinue.addEventListener("click", () => { // Agrega un event listener al hacer clic en el botón identificado como 'btnContinue'
    if (!interval && remainingTime > 0) { // Comprueba si 'interval' no está definido (temporizador pausado) y si aún queda tiempo restante
        const display = document.getElementById("timer"); // Obtiene el elemento con el id 'timer' y lo almacena en la variable 'display'
        startTimer(remainingTime, display); // Inicia un temporizador con el tiempo restante y el elemento donde se mostrará

        btnPause.style.display = "block";
        btnContinue.style.display = "none";
        btnReset.style.display = "none";
    }
});


btnReset.addEventListener("click", () => { // Agrega un event listener al hacer clic en el botón identificado como 'btnReset'
    if (interval) { // Comprueba si 'interval' está definido, lo que significa que el temporizador está en marcha
        clearInterval(interval); // Detiene el temporizador
        interval = undefined; // Establece 'interval' como 'undefined' para indicar que el temporizador está detenido
    }
    const display = document.getElementById("timer"); // Obtiene el elemento con el id 'timer' y lo almacena en la variable 'display'
    display.innerHTML = "00:00:00"; // Restablece el contenido del temporizador a "00:00:00"
    remainingTime = 0; // Establece el tiempo restante a cero

    btnStart.style.display = "block";
    btnPause.style.display = "none";
    btnContinue.style.display = "none";
    btnReset.style.display = "none";
});


const startTimer = (duration, display) => { // Función que inicia un temporizador con una duración y un elemento donde mostrarlo
    let timer = duration; // Establece el temporizador en la duración inicial recibida
    let hours, minutes, seconds; // Variables para almacenar horas, minutos y segundos

    interval = setInterval(() => { // Inicia un intervalo que se ejecuta cada segundo
        hours = Math.floor(timer / 60 / 60); // Calcula las horas restantes
        minutes = Math.floor(timer / 60 - hours * 60); // Calcula los minutos restantes
        seconds = Math.floor(timer % 60); // Calcula los segundos restantes

        hours = hours < 10 ? "0" + hours : hours; // Asegura que las horas tengan un formato de dos dígitos
        minutes = minutes < 10 ? "0" + minutes : minutes; // Asegura que los minutos tengan un formato de dos dígitos
        seconds = seconds < 10 ? "0" + seconds : seconds; // Asegura que los segundos tengan un formato de dos dígitos

        display.innerHTML = `${hours}:${minutes}:${seconds}`; // Muestra el temporizador en el elemento 'display'

        remainingTime = timer; // Actualiza el tiempo restante

        timer -= 1; // Reduce el temporizador en un segundo

        if (timer < 0) { // Si el temporizador llega a cero
            display.innerHTML = "Finalizó!"; // Muestra un mensaje de finalización en el elemento 'display'
            clearInterval(interval); // Detiene el temporizador
            interval = undefined; // Marca 'interval' como 'undefined' para indicar que el temporizador ha finalizado
            btnReset.style.display = "block";
            btnPause.style.display = "none";
        }
    }, 1000); // El intervalo se ejecuta cada 1000 milisegundos (1 segundo)
};

