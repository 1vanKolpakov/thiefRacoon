import stealBalls from './funcs/stealBalls'; // Путь до вашей функции

describe('stealBalls', () => {

  it('Базовый пример', () => {
    expect(stealBalls(12, [20, 10, 30])).toEqual([4, 2, 6]);
  });

  it('Базовый пример два', () => {
    expect(stealBalls(50, [10, 10, 10])).toEqual([10, 10, 10]);
  });

  it('Более сложная пропорция', () => {
    expect(stealBalls(10, [10, 1, 1, 10])).toEqual([4, 1, 1, 4]);
  });

  it('Случай если в мешок ничего нельзя вместить', () => {
    expect(stealBalls(0, [10, 10, 10])).toEqual([0, 0, 0]);
  });

  it('Пустой склад', () => {
    expect(stealBalls(10, [])).toEqual([]);
  });

  it('Вариация сложных пропорций', () => {
    expect(stealBalls(10, [5, 5, 5, 5])).toEqual([3, 3, 2, 2]);
  });

});

