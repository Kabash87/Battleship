# Battleship, programado en Javascript

Para ejecutar el codigo, se debe abrir una terminal y ejecutar el comando "node index.js"
Es necesario tener instalado Node para ejecutar el juego correctamente

El mapa se divide en casillas 10x10
Existen 8 simbolos dentro del tablero:

  - 🛶 - Barco de 2 casillas
  - ⛵️ - Barco de 3 casillas
  - 🚤 - Barco de 4 casillas
  - 🚢 - Barco de 5 casillas
  - 💥 - Tiro a un barco dentro del Mapa
  - 💦 - Tiro al agua, no afecto a ningun barco
  - 🔥 - Barco Hundido
  - ❔ - Casilla sin golpear

El juego acaba cuando un jugador haya hecho estallar todas las naves del tival contrario
Hay un total de 2 jugadores y cada uno tiene 10 naves, puestos de manera aleatoria.

El tablero de arriba es del enemigo (Jugador 2), mientras que el tablero de abajo es "nuestro" tablero (Jugador 1)

El Codigo se divide en 5 partes
1. game.js - Configuracion y logica general del juego
2. globalData.js - Datos del juego, Iconos y letras del tablero
3. mathUtils.js - Generador de numeros aleatorios para la posicion de los Barcos
4. player.js - Configuracion y logica de los jugadores
5. printer.js - Codigo que imprime en la consola el tablero de los 2 jugadores

El proyecto incluye un archivo "Index.js" con que se ejecuta todo el juego

Todo el codigo esta siendo comentado en Castellano, pero las funciones y variables estan puestas mayormente en Ingles.

Cualquier otra duda o cuestión, escribir a diegohs1503@gmail.com
