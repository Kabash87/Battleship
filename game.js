
//////////////////////////////////////////////

//Diego Hernández
//Declaracion de las Variables
//Se declara las 2 tablas, enemigo y jugador

let myGrid = createGrid(10)
let enemyGrid = createGrid(10)
let size = 10

let ships = 10
let enemyShips = 10
let enemyLocations = {}
let shipLocations = {}
let contador = 0

//Comando que indica donde se pone los barcos
for(let i = 1; i < 11; i++){
  placeRamdomShip2('🚢', myGrid, 10) //Declaracion de barcos aliados
  placeRamdomShip('🚢', enemyGrid, 10) //declaracion de barcos enemigos
  
  console.table(enemyGrid) //Imprime el tablero con los barcos aleatorios
  console.table(myGrid) //Imprime el tablero con los barcos aliados aleatorios
}
drawBreak()


//Funcion de CreateGrid
function createGrid(size) {
  let grid = [];
  for (let i = 0; i < size; i++) { //Se iguala la tabla que sea del mismo tamaño eje X y Y 
    grid[i] = [];
    for (let j = 0; j < size; j++) { 
      grid[i][j] = '🔘'; //Se imprime el espacio en blanco
    }
  }
  return grid;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//MOTOR DEL JUEGO
//game loop
while (enemyShips > 0 && ships > 0) {
  let x = getRandomInt(size);
  let y = getRandomInt(size);

  if (attack(x, y, enemyGrid)) {
    enemyShips--;
  }

  x = getRandomInt(size);
  y = getRandomInt(size);
  if (enemyShips > 0 && attack(x, y, myGrid)) {
    ships--;
  }


//Se imprime los resultados de los ataques

console.log("  ")
console.log("Ronda n°"+ contador)

      console.log("Jugador 2")
      console.log("Tablero Enemigo: ")
      printGrid(enemyGrid, true)
      console.log("Jugador 1")
      console.log("Tu tablero: ")
      printGrid(myGrid)
      drawBreak()

      //Se incrementa el contador con el numero de Rondas
      contador = contador + 1
}

//Funcion de ataques
function attack(x, y, grid){
  if (grid[y][x] == '🚢') {
    grid[y][x] = '💥'
    return true
  } else if (grid[y][x] == '🔘'){
    grid[y][x] = '💦'
    return false
  } else {
    return false
  }
}


//Funcion que valida que los barcos enemigos aparescan en la tabla de arriba
function printGrid(grid, isEnemy = false) {
  const headers = createHeaders(grid.length);
  console.log(headers);
  for (let i = 0; i < grid.length; i++) {
    let rowStr = i + ' |';
    for (let cell of grid[i]) {
      if (isEnemy && cell == '🚢') {
        rowStr += '🚢';
      } else {
        rowStr += cell + '|';
      }
    }
    console.table(rowStr);
  }
}

function createHeaders(size) {
  let result = '    ';
  for (let i = 0; i < size; i++) {
    result += i + '  ';
  }
  return result;
}

//Codigo de Victoria o perdida
if (ships < enemyShips){
  drawBreak()
  console.log('Juego Perdido! Gana el Jugador 2')
  console.log('Fin del Juego')
 }else {
  drawBreak()
  console.log('Victoria! Gana el Jugador 1')
  console.log('Fin del Juego')
 }

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funcion que pone los barcos aleatoriamente

 //Funcion que pone los barcos dentro de las casillas 
 function placeShip(x, y, c, grid){
  grid[y][x] = c
}

 //Funcion que pone los barcos enemigos aleatoriamente en el mapa
 function placeRamdomShip(c, grid, max){
  let didPlace = false
  while (!didPlace){
    let x = getRandomInt(max)
    let y = getRandomInt(max)
  if (!enemyLocations[`${x}-${y}`]){
     placeShip(x, y, c, grid)
     didPlace = true
     enemyLocations[`${x}-${y}`] = true
    }
  }
}

//Funcion que pone los barcos aliados aleatoriamente en el mapa
function placeRamdomShip2(c, grid, max){
  let didPlace = false
  while (!didPlace){
    let x = getRandomInt(max)
    let y = getRandomInt(max)
  if (!shipLocations[`${x}-${y}`]){
     placeShip(x, y, c, grid)  //Si no funciona revisa aqui
     didPlace = true
     shipLocations[`${x}-${y}`] = true
     }
   }
 }


////////////////////////////////////////////////////////////////////////////////////////////////////
//Otras funciones

//Funcion que escoje numeros aleatorios
  function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max))
  }

//Separador de lineas
  function drawBreak(){
    console.log('-------------------------------------------------')
  }