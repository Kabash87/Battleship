import { icons, iconList, iconFor, letters } from "./globalData.js";

//Configuracion de la Impresion del tablero
export function printTable(board, shipPositions) {
  let graphicBoard = board.slice();

  // Establece los Iconos del tablero
  for (let i = 0; i < shipPositions.length; i++) {
    const ship = shipPositions[i];

    for (let j = 0; j < ship.length; j++) {
      const icon = iconFor(ship.length);
      const index = ship[j];
      if (
        icon.length > 0 &&
        graphicBoard[index] != icons.hit &&
        graphicBoard[index] != icons.sunk
      ) {
        graphicBoard[index] = icon;
      }
    }
  }

  // Posicisiones Vacias
  for (let i = 0; i < graphicBoard.length; i++) {
    if (!iconList.includes(graphicBoard[i])) {
      graphicBoard[i] = icons.empty;
    }
  }

  const boardLine = "-".repeat(71);
  const header = `\n| 😸😸😸  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  |`;
  let table = `\n${boardLine}${header}\n${boardLine}`;

  for (let i = 0; i < letters.length; i++) {
    let row = `|    ${letters[i]}    |`;
    for (let j = 0; j < letters.length; j++) {
      const index = i * 10 + j;
      if (graphicBoard[index] == icons.empty) {
        row += ` ${graphicBoard[index]} |`;
      } else {
        row += ` ${graphicBoard[index]}  |`;
      }
    }
    table += `\n${row}\n${boardLine}`;
  }
  //Se imprime en la consola el tablero de juego
  console.log(table);
}
