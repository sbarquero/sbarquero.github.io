/*---------------------------------------------------------------------------*/
/* blackjack-v2.js                                                              */
/*                                                                           */
/* Autor: Santiago Barquero                                                  */
/* Fecha: 08/06/2018                                                         */
/*---------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------*/
/* BARAJA */
/*---------------------------------------------------------------------------*/

var baraja = {
  // Función que devuelve una nueva baraja completa creada.
  crearBaraja: function() {
    var nuevaBaraja = [];
    // Simbolo para visualizar en la carta
    var simbolos = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
                     "J", "Q", "K" ];
    // Palos: hearts= Corazón, diams= Diamantes, spades= Picas, clubs= Trébol
    // Los utilizo para visualizar el carácter correspondiente con "&palo;"
    var palos = [ "hearts", "diams", "spades", "clubs" ];  
    // valor en puntos de las cartas
    var valores = [ 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10 ];
    // colores de las cartas y lo utilizo en "class"
    var colores = [ "rojo", "rojo", "negro", "negro" ];
    for (var i = 0; i < simbolos.length; i++) {
      for (var j = 0; j < palos.length; j++) {
        // voy añadiendo la nueva carta al final del array
        nuevaBaraja[nuevaBaraja.length] = { simbolo: simbolos[i], 
            palo: palos[j], valor: valores[i], color: colores[j] };
      }
    }
    return nuevaBaraja;
  }
}

/*---------------------------------------------------------------------------*/
/* CRUPIER */
/*---------------------------------------------------------------------------*/

var crupier = { // Objeto crupier
  // Array Cartas del crupier, que barajará y repartirá
  cartas : [], 
  // Array Mano de carta del crupier
  mano : [], 

  // Recibe juego de cartas nuevas como parámtero y vacia el array de su mano
  inicializar : function (cartas) {
    console.log("crupier.inicializar()");
    this.cartas = [];
    this.mano = [];
    // copiamos la cartas recibidas como parámetro al array de cartas del crupier
    for (var i= 0; i < cartas.length; i++) {
      this.cartas[this.cartas.length] = cartas[i];
    }
  },

  // Función para barajar las cartas el número de veces recibido como parámetro
  barajar : function(num) {
    console.log("crupier.barajar() - " + num + " intercambios");
    // Posiciones de dos cartas para hacer el intercambio
    var pos1 = 0; // posición de la primera carta
    var pos2 = 0; // posición de la segunda carta
    var aux = null; // variable temporal que almacena carta en intercambio
    for (var i = 0; i < num; i++) {
      // dos número aleatorios entre 0 y 51 ambos inclusive para intercambio 
      pos1 = Math.floor(Math.random() * 52);
      pos2 = Math.floor(Math.random() * 52);
      // intercambio de cartas con variable auxiliar temporal
      aux = this.cartas[pos1];
      this.cartas[pos1] = this.cartas[pos2];
      this.cartas[pos2] = aux;
    }
  },

  // Función que devuelve una carta
  darCarta : function() {
    var nueva = []; // Baraja resultante tras dar carta
    var carta = this.cartas[0]; // Cogemos primera carta
    // guardamos el resto de cartas en el nuevo array
    for (var i = 1; i<this.cartas.length; i++) {
      nueva[nueva.length] = this.cartas[i];
    }
    this.cartas = nueva; // actualizamos baraja tras quitarle una carta
    return carta; 
  },

  // Función que coge una carta que recibe como parámetro y añade a su mano
  cogerCarta : function(carta) {
    this.mano[this.mano.length] = carta;
  },

  // Función que puntua una mano recibida como parámetro
  puntuar : function(mano) {
    var totalPuntos = 0; // total punto a retornar

    for (var i = 0; i < mano.length; i++) {
      totalPuntos = totalPuntos + mano[i].valor;
    }
    return totalPuntos;
  },

  // Función que visualiza en la página las cartas del crupier y
  // devuelve un string con la mano y su puntuación
  mostrar : function() {
    // Visualiza las cartas y la puntuación del crupier en la página HTML
    elementoCartasCrupier.innerHTML = htmlArrayCartas("crupier", this.mano);
    elementoPuntosCrupier.innerHTML = crupier.puntuar(this.mano);
    // prepara mensaje de retorno para la consola
    var mensaje = "Mano crupier: " + strMano(this.mano) + 
        "  Puntuación: " + crupier.puntuar(this.mano);
    return mensaje;
  }
}

/*---------------------------------------------------------------------------*/
/* JUGADOR */
/*---------------------------------------------------------------------------*/
var jugador = {

  // Array Mano de cartas del jugador.
  mano : [],

  // Inicializamos la mano de jugador al empezar una nueva partida
  inicializar : function() {
    this.mano = [];
  },

  // Función que añade una carta, que recibe como parámetro, a su mano
  pedirCarta : function(carta) {
    this.mano[this.mano.length] = carta;
  },

  // Función que le muestra información al jugador y le pregunta si pasar.
  // También pasa automáticamente cuando el jugador supera 21 puntos.
  pasar : function() {
    // forma cadena con información del jugador y del crupier
    var mensaje = this.mostrar() + crupier.mostrar();

    // si la puntuación es menor de 21 pregunta al jugador si quiere otra carta
    if (crupier.puntuar(this.mano) < 21) {
      elementoMensaje.innerHTML = "¿Pasar o Pedir Carta?";
    } // sino es que la puntuación es igual o mayor a 21
    else {
      console.log("Jugador ha llegado a 21 o lo ha superado");
      return true;
    }
  },

  // Función que visualiza en la página las cartas del jugador y
  // devuelve un string con la mano y su puntuación
  mostrar : function() {
    // Visualiza las cartas y la puntuación del jugador en la página HTML
    elementoCartasJugador.innerHTML = htmlArrayCartas("jugador", this.mano);
    elementoPuntosJugador.innerHTML = crupier.puntuar(this.mano);
    // prepara mensaje de retorno para la consola
    var mensaje = "Tu mano: " + strMano(this.mano) + 
        "  Puntuación: " + crupier.puntuar(this.mano) + '\n';
    return mensaje;
  }
}

/*---------------------------------------------------------------------------*/
/* FUNCIONES AUXILIARES */
/*---------------------------------------------------------------------------*/

// Función auxiliar que devuelve el string de una mano para visualizar
function strMano(mano) {
  var resultado = "";
  //console.log(mano.length);
  for (var i = 0; i < mano.length; i++) {
    resultado = resultado + mano[i].simbolo + "-" + mano[i].palo + " ";
  }
  return resultado; 
};

function htmlArrayCartas(sujeto, cartas) {
  var str = "";
  var numCartas = cartas.length;
  var NUM_CARTAS_TOTALES = 9;
  var desplazamiento = 400 / 2 -((numCartas+1)*20);
  for(var i = 0; i < cartas.length; i++) {
    str += "<div class=\"carta " + 
    cartas[i].color + "\" style=\"position: absolute; left: " +
      (desplazamiento + i * 40) + "px;\">" +  cartas[i].simbolo + 
      "<br>&" + cartas[i].palo + ";</div>";
  }
  return str;
}

/*---------------------------------------------------------------------------*/
/* BLACKJACK - OBJETO PRINCIPAL */
/*---------------------------------------------------------------------------*/
var blackjack = {
  iniciarPartida : function() {
    // Inicializo referencias a elementos de la página HTML
    elementoMensaje         = document.getElementById("mensaje");
    elementoPuntosCrupier   = document.getElementById("puntos_crupier");
    elementoPuntosJugador   = document.getElementById("puntos_jugador");
    elementoCartasCrupier   = document.getElementById("cartas_crupier");
    elementoCartasJugador   = document.getElementById("cartas_jugador");
    elementoBotonPasar      = document.getElementById("pasar");
    elementoBotonPedirCarta = document.getElementById("pedir_carta");

    var mensaje = "";
    // Activo botones "Pasar" y "Pedir Carta"
    elementoBotonPasar.disabled = false;
    elementoBotonPedirCarta.disabled = false;

    // inicializo valores de la página 
    elementoPuntosJugador.innerHTML = "0";
    elementoPuntosCrupier.innerHTML = "0";

    console.clear();
    console.log("miBaraja");
    console.log(blackjack.miBaraja);

    miCrupier.inicializar(miBaraja); // inicializo crupier con una baraja nueva
    miCrupier.barajar(200); // barajar cartas con 200 intercambios
    console.log("\ncrupier.cartas después de barajar");
    console.log(crupier.cartas);

    miJugador.inicializar(); // inicializo mano del jugador

    // Crupier reparte dos cartas al jugador
    miJugador.pedirCarta(miCrupier.darCarta());
    miJugador.pedirCarta(miCrupier.darCarta());
    // Crupier coge una carta para él
    miCrupier.cogerCarta(miCrupier.darCarta());

    console.log("\nmiCrupier.cartas - Cartas que quedan tras el reparto inicial");
    console.log(miCrupier.cartas);

    console.log("-------- Manos tras reparto inicial ---------\n" + 
                miJugador.mostrar() + miCrupier.mostrar());

    // Si el jugador consigue 21 en la primer mano
    puntosJugador = miCrupier.puntuar(miJugador.mano);
    if (puntosJugador > 20) {
      this.comprobarGanador();
    }
    else {
      console.log("------------- Turno del jugador -------------");
      elementoMensaje.innerHTML = "¿Pasar o Pedir Carta?";
    }
  },
  
  botonPedirCarta : function() {
    console.log("Jugador pide carta");
    miJugador.pedirCarta(miCrupier.darCarta());
    console.log(miJugador.mostrar());
    puntosJugador = miCrupier.puntuar(miJugador.mano);
    if (puntosJugador > 20) {
      this.comprobarGanador();
    }
  },

  botonPasar : function() {
    console.log("Jugador pasa");
    this.comprobarGanador();
  },
  
  comprobarGanador : function() {
    // Desactivo botones "Pasar" y "Pedir Carta"
    elementoBotonPasar.disabled = true;
    elementoBotonPedirCarta.disabled = true;
    puntosJugador = miCrupier.puntuar(miJugador.mano);
    puntosCrupier = miCrupier.puntuar(miCrupier.mano);
    // Si el jugador no se ha pasado de 21, le toca al crupier jugar
    if (puntosJugador <= 21) {
      console.log("------------- Turno del crupier -------------");
      // por las reglas del juego el crupier coge carta hasta tener 17 como mínimo
      while(puntosCrupier < 17) {
        // Crupier coge una carta para él
        miCrupier.cogerCarta(miCrupier.darCarta());
        puntosCrupier = miCrupier.puntuar(miCrupier.mano);
        console.log("Crupier tiene puntuación < 17 y coge carta.\n" + 
                    crupier.mostrar());
      }  
      // Cuando el crupier supera la puntuación de 17, para y comprueba quién gana
      console.log("---------- Comprobación del ganador ---------");
      if (puntosCrupier > 21 || puntosCrupier < puntosJugador) {
        console.log("Crupier se ha pasado de 21");      
        mensaje = "¡Enhorabuena ganas la partida!\n";
      } 
      else {
        if (puntosCrupier > puntosJugador) {
          console.log("Crupier obtiene más puntos"); 
          mensaje = "¡Lo siento has perdido la partida!<br>" + 
              "El crupier obtiene más puntuación\n";
        } 
        else {
          console.log("Crupier y jugador empatan");        
          mensaje = "¡Has empatado la partida!";
        }
      }
    } 
    else { // sino es que el jugador se ha pasado de 21
      console.log("-------- Jugador se ha pasado de 21 ---------");
      mensaje = "¡Lo siento, has perdido la partida!<br>Te has pasado de 21.\n";
    }

    console.log("--------------- Resultado -------------------");
    console.log(mensaje + miJugador.mostrar() + miCrupier.mostrar());
    elementoMensaje.innerHTML = mensaje;

  }
}

/*---------------------------------------------------------------------------*/
/* VARIABLES GLOBALES */
/*---------------------------------------------------------------------------*/

// Objetos
var miBaraja = baraja.crearBaraja();
var miCrupier = crupier;
var miJugador = jugador;

// Puntuaciones
var puntosJugador = 0;
var puntosCrupier = 0;

// Referencias a elementos de la página HTML
var elementoMensaje;
var elementoPuntosCrupier;
var elementoPuntosJugador;
var elementoCartasCrupier;
var elementoCartasJugador;
var elementoBotonPasar;
var elementoBotonPedirCarta;
