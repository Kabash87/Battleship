import { letters, shipSizes, dimention } from "./globalData.js";
import { getRandomInt } from "./mathUtils.js";
import { printTable } from "./printer.js";

//Configuracion de los jugadores
// Configuracion del jugador y su respectiva tabla

export class Player {
  constructor(name) {
    this.name = name;
    this.board = [];
    this.shipPositions = [];
    this.hits = [];
    this.turns = 0;
    this.shots = [];
    this.availableShots = Array.from(Array(100).keys());
  }
  //Configuracioon Inicial
  setup() {
    this.setBoard();
    this.positionShips();
  }
  //Se establece un tablero inicial, y se asigna una posicion del 1 al 10
  setBoard() {
    letters.forEach((letter) => {
      letters.forEach((elem, elemIndex) => {
        this.board.push(letter + elemIndex);
      });
    });
  }
  //Posicionamiento de los Barocs
  positionShips() {
    shipSizes.forEach((ship) => this.shufflePositionForShipOfSize(ship));
  }
  //Se genera una pocision aleatoria para el barco
  shufflePositionForShipOfSize(size) {
    let indexSet = [];
    const takenPositions = this.shipPositions.flatMap((num) => num);

    do {
      const indexFrom = getRandomInt(dimention);
      const letterFrom = letters[indexFrom];

      if (indexFrom + size - 1 < dimention) {
        // De derecha a izquierda
        for (let i = indexFrom; i < indexFrom + size; i++) {
          const position = letterFrom + i;
          const index = this.board.indexOf(position);
          if (takenPositions.includes(index)) {
            indexSet = [];
            break;
          } else {
            indexSet.push(index);
          }
        }
      } else if (indexFrom - size + 1 > 0) {
        // De izquierda a derecha
        for (let i = indexFrom; i > indexFrom - size; i--) {
          const position = letterFrom + i;
          const index = this.board.indexOf(position);
          if (takenPositions.includes(index)) {
            indexSet = [];
            break;
          } else {
            indexSet.push(index);
          }
        }
      }
    } while (indexSet.length == 0);
    this.shipPositions.push(indexSet);
  }
  //Muestra el estado actual
  display() {
    console.log(`\nJugador: ${this.name}`);
    this.showStatus();
  }

  showStatus() {
    printTable(this.board, this.shipPositions);
  }
}
