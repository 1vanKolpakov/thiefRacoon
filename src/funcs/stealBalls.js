export default function stealBalls(capacity, balls) {

  // Вычисляем общее количество мячей в массиве balls
  const totalBalls = balls.reduce((sum, count) => sum + count, 0);
  
  // обработка крайнего случая
  if (totalBalls <= capacity) return [...balls];
  
  // инициализщация массива мячей которые будем красть
  let stolen = new Array(balls.length).fill(0);

  let remainingCapacity = capacity;
  
  //  Начинаем перераспределение мячей пропорционально количеству мячей в корзинах
  let allocatedSum = 0;
  for (let i = 0; i < balls.length; i++) {

     // Вычисляем, сколько мячей следует украсть из каждой корзины
    let allocated = Math.floor(balls[i] * (capacity / totalBalls));

    // Записываем количество украденных мячей для текущей корзины
    stolen[i] = allocated;

    // Суммируем количество перераспределенных мячей
    allocatedSum += allocated;
  }
  // Обновляем оставшуюся вместимость, вычитая распределенные мячи
  remainingCapacity -= allocatedSum;
  
  for (let i = 0; i < balls.length && remainingCapacity > 0; i++) {
    if (stolen[i] === 0 && balls[i] > 0) {
      // Если в корзине нет украденных мячей и она не пуста, забираем один мяч
      stolen[i]++;
      remainingCapacity--;
    }
  }
  
  let indexedBalls = balls
    .map((count, i) => ({ index: i, value: count }))
    .sort((a, b) => b.value - a.value);
  
  let i = 0;
  while (remainingCapacity > 0) {
    // Индекс корзины, из которой будет украден мяч
    let index = indexedBalls[i % indexedBalls.length].index;
    // Если в корзине еще можно украсть мяч, украдем
    if (stolen[index] < balls[index]) {
      stolen[index]++;
      remainingCapacity--;
    }
    i++;
  }
  
  return stolen;
}