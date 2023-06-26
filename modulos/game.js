import { getRandomInt } from "./mathUtils.js";
import { line, icons } from "./globalData.js";
import { Player } from "./player.js";

//Battleship game made in Javascript
//Juego de Javascript hecho en Javascript

let Jugador1 = new Player("Jugador 1");
let Jugador2 = new Player("Jugador 2");

/**GAME CONFIGURATION */
/**CONFIGURACION GENERAL DEL JUEGO**/
export function setupGame() {
  // 1. Create boards & place ships
  Jugador1.setup();
  Jugador2.setup();

  // Informacion de Inicio, Muestra las reglas del juegos y los Iconos

  const header = `${line}\n\n--------------Battleship----------------\n${line}`;
  const description = `\nReglas del Juego: \n\n${icons.ship2}  | Barco de 2 casillas \n${icons.ship3}  | Barco de 3 casillas \n${icons.ship4}  | Barco de 4 casillas \n${icons.ship5}  | Barco de 5 casillas  \n${icons.hit}  | Golpe a un Barco \n${icons.water}  Golpe al mar \n${icons.sunk}  | Barco Hundido \n${icons.empty} | Casilla Vacia`;
  console.log(`${header}\n${description}`);

  Jugador1.display();
  Jugador2.display();
}

//Empieza el juego
export function play() {
  console.log(`\n${line}\n\nEmpieza el Juego!\n${line}`);

  let gameOver;
  let flatShipPositionsA = Jugador1.shipPositions.flatMap((num) => num);
  let flatShipPositionsB = Jugador2.shipPositions.flatMap((num) => num);

  let jugadorActual = Jugador1;
  let rival = Jugador2;
  let objetivos = flatShipPositionsB;

  //Turnos de Jugador
  do {
    jugadorActual.turns += 1;
    console.log(
      `\nEs el turno de: ${jugadorActual.name} \nRonda n°${jugadorActual.turns}`
    );
    shoot(jugadorActual, rival, objetivos);

    if (jugadorActual.hits.length == objetivos.length) {
      gameOver = true;
      break;
    }

    // Se cambia de jugador
    if (jugadorActual.name == Jugador1.name) {
      jugadorActual = Jugador2;
      rival = Jugador1;
      objetivos = flatShipPositionsA;
    } else {
      jugadorActual = Jugador1;
      rival = Jugador2;
      objetivos = flatShipPositionsB;
    }
  } while (typeof winner == "undefined"); //Ganador indefinido mientras no acaba el juego
  //Imprime los resultados
  showResults(jugadorActual, rival);
}

//Logica de Disparos por turnos

function shoot(shooter, rival, target) {
  const i = getRandomInt(shooter.availableShots.length);
  const index = shooter.availableShots[i];
  const shot = rival.board[index].slice();

  shooter.shots.push(index);
  shooter.availableShots.splice(i, 1);

  if (target.includes(index)) {
    rival.board[index] = icons.hit;
    shooter.hits.push(index);
    const sunkShipslog = checkForSunkShips(rival, index);

    //Muestra el resultado de los Disparos
    if (sunkShipslog.length > 0) {
      console.log(
        `Disparo en la casilla: ${shot} -> ${sunkShipslog}. Has hundido un barco enemigo`
      );
    } else {
      console.log(
        `Disparo en la casilla: ${shot} -> ${icons.hit}, Has golpeado un barco enemigo`
      );
    }

    //Logica de Disparos por jugadores, se checa si todos los botes del rival no estan hundidos.
    if (shooter.hits.length < target.length) {
      shoot(shooter, rival, target);
    } else {
      showStatus(shooter, rival);
    }
  } else {
    rival.board[index] = icons.water;
    console.log(`Disparo en la casilla: ${shot} -> ${rival.board[index]}`);
    showStatus(shooter, rival);
  }
}

//Buscador de Barcos Hundidos y cambia el Icono correspondiente
function checkForSunkShips(player, hit) {
  let hitShip = [];

  // Buscador de tiro
  for (let i = 0; i < player.shipPositions.length; i++) {
    const ship = player.shipPositions[i];
    const found = ship.find((elem) => elem == hit);
    if (typeof found != "undefined") {
      hitShip = ship.slice();
      break;
    }
  }
  //No resultado
  if (hitShip.length == 0) {
    return "";
  }

  //Verifica si el barco se encuentra hundido
  for (let j = 0; j < hitShip.length; j++) {
    const index = hitShip[j];
    if (player.board[index] != icons.hit) {
      return "";
    }
  }
  //Se establece el barco Hundido
  hitShip.forEach((index) => (player.board[index] = icons.sunk));
  return icons.sunk.repeat(hitShip.length);
}

//Se muestra el estatus del Jugador actual y del rival actual
function showStatus(shooter, rival) {
  console.log(`\nRonda actual`);
  console.log(
    `Turno de: ${shooter.name} - Disparos Restantes: ${
      100 - shooter.shots.length
    }`
  );
  shooter.showStatus();
  console.log(
    `\nRival: ${rival.name} - Turnos Restantes: ${100 - rival.shots.length}`
  );
  rival.showStatus();
}

//FIN DEL JUEGO, RESULTADOS
//GAME OVER, RESULTS
function showResults(winner, defeated) {
  console.log(`\n\nFin del Juego. Ganador: ${winner.name}`);
  console.log(`Gracias por Jugar, esperamos que se haya divertido`);
  console.log(`\nResultados de la partida:`);
  console.log(
    `\nEl Perdedor es: ${defeated.name} - Terminó con: ${
      100 - defeated.shots.length
    } disparos restantes`
  );
  defeated.showStatus();
  console.log(
    `\n👑 El ganador es: ${winner.name} - Con disparos restantes: ${
      100 - winner.shots.length
    } 👑`
  );
  winner.showStatus();
}
