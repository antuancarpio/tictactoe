var turno = false;      // false = mal (✖), true = bien (✔)
var contador = 0;
var terminado = false;

function activo(boton) {
    boton.disabled = true;
    boton.value = ""; // Borramos el texto

    var imagen = turno ? './img/bien.png' : './img/mal.png';
    boton.style.backgroundImage = `url('${imagen}')`;
    boton.dataset.jugador = turno ? "bien" : "mal"; // para saber quién ganó sin depender de la ruta

    turno = !turno;

    verificar();

    if (!terminado) {
        document.getElementById("estado").textContent = "Turno: " + (turno ? "✔" : "✖");
    }
}

function verificar(){
    var botones = document.querySelectorAll("input[type='button']");

    // [casilla1, casilla2, casilla3, clase de la línea roja]
    var combinaciones = [
        [0, 1, 2, "f0"],  // primera horizontal
        [3, 4, 5, "f1"],  // segunda horizontal
        [6, 7, 8, "f2"],  // tercera horizontal
        [0, 3, 6, "c0"],  // primera vertical
        [1, 4, 7, "c1"],  // segunda vertical
        [2, 5, 8, "c2"],  // tercera vertical
        [0, 4, 8, "d1"],  // diagonal \
        [2, 4, 6, "d2"]   // diagonal /
    ];

    for (var i = 0; i < combinaciones.length; i++) {
        var a = botones[combinaciones[i][0]];
        var b = botones[combinaciones[i][1]];
        var c = botones[combinaciones[i][2]];

        if (a.style.backgroundImage == b.style.backgroundImage &&
            b.style.backgroundImage == c.style.backgroundImage &&
            a.style.backgroundImage !== "") {

            var nombre = a.dataset.jugador == "bien" ? "la palomita ✔" : "la cruz ✖";
            document.getElementById("ganador").textContent = "¡Ganó " + nombre + "!";
            document.getElementById("estado").textContent = "Fin del juego";
            document.getElementById("rejilla").classList.add(combinaciones[i][3]);

            terminado = true;
            bloquear();
            return; // ya hay ganador, no revisamos más
        }
    }

    // Empate: solo si se llenó el tablero y nadie ganó
    if (++contador === 9) {
        document.getElementById("ganador").textContent = "¡Empate! Gana el gato 🐱";
        document.getElementById("estado").textContent = "Fin del juego";
        terminado = true;
    }
}

function bloquear(){
    document.querySelectorAll("input[type='button']").forEach(boton => {boton.disabled = true});
}

function reiniciar(){
    // Se reinicia todo a mano (más confiable que recargar la página)
    document.querySelectorAll("input[type='button']").forEach(boton => {
        boton.disabled = false;
        boton.style.backgroundImage = "";
        delete boton.dataset.jugador;
    });
    document.getElementById("rejilla").className = "rejilla";
    document.getElementById("ganador").textContent = "";
    document.getElementById("estado").textContent = "Turno: ✖";
    turno = false;
    contador = 0;
    terminado = false;
}
