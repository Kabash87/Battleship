//Configuracion basica del juego
//Se declaran las letras del tableto, el numero de los Barcos y la dimesion del tablero
export const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
export const shipSizes = [2, 2, 2, 3, 3, 4, 5];
export const dimention = 10;
export const icons = {
  ship2: "🛶", //2 casillas
  ship3: "⛵️", //3 casillas
  ship4: "🚤", //4 casillas
  ship5: "🚢", //5 casillas
  hit: "💥", //Tiro
  water: "💦", //Tiro al agua
  sunk: "🔥", //Hundido
  empty: "❔", //Casilla sin golpear
};
export const iconList = ["🛶", "⛵️", "🚤", "🚢", "💥", "💦", "🔥"];
export const line = "_".repeat(72);

//Se exportan los iconos del juego
export function iconFor(length) {
  switch (length) {
    case 2:
      return icons.ship2;
    case 3:
      return icons.ship3;
    case 4:
      return icons.ship4;
    case 5:
      return icons.ship5;
    default:
      return "";
  }
}
