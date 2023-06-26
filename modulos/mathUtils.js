//Generador de un numero matematico aleatorio, del 0 al 9

export function getRandomInt(max) {
  const randomInt = Math.floor(Math.random() * max);
  return Math.abs(randomInt);
}
