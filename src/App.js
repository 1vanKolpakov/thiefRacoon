import React, { useRef, useState } from 'react';
import './App.css';
import raccoonpic from './imgs/raccoon.png'
import stealBalls from './funcs/stealBalls';
import classNames from 'classnames';

function App() {
  const [capacity, setCapacity] = useState('');
  const [balls, setBalls] = useState(['']);
  const [loading, setLoading] = useState(false);  // Состояние для загрузки результата
  const [result, setResult] = useState([]);  // Состояние для результата распределения
  const [error, setError] = useState(''); // Состояние для ошибки мешка
  const inputRefs = useRef([]); 

  // Функция для обновления количества шаров
  const handleBallChange = (index, value) => {
    const newBalls = [...balls];
    newBalls[index] = value === '' ? '' : Number(value);
    setBalls(newBalls);
  };
  
  // Функция для добавления нового инпута шаров
  const addBallInput = () => {
    setBalls([...balls, '']);
    setTimeout(() => {
      // Перемещаем фокус на последний добавленный инпут
      inputRefs.current[balls.length].focus();
    }, 0);
  };
  
  // Функция для удаления последнего инпута
  const removeBallInput = () => {
    if (balls.length > 1) {
      setBalls(balls.slice(0, balls.length - 1));
    }
  };

  // Функция для обработки нажатия на кнопку "Посчитать"
  const handleCalculate = () => {
    setError('');

    // выдаем ошибку, если емкость мешка не назначена
    if (!capacity ) {
      setError('Пожалуйста, введите положительное значение для емкости мешка.');
      return; 
    }
    setLoading(true);  // Включаем загрузку
    setResult([]);  // Сбрасываем предыдущий результат
    
    // Имитация загрузки с задержкой
    setTimeout(() => {
      const calculatedResult = stealBalls(Number(capacity), balls);
      setResult(calculatedResult);  // Устанавливаем результат
      setLoading(false);  // Отключаем загрузку
    }, 2000);  // 2 секунды задержки для имитации загрузки
  };
  return (
    <div className="App">
      <h1>Распределение шаров по мешку</h1>
      
      <div>
        <label>Емкость мешка: </label>
        <input
          className={classNames({ 'error': error })}
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div>
        <h2>Количество шаров по цветам</h2>
        {balls.map((ball, index) => (
          <div key={index}>
            <label>Цвет {index + 1}: </label>
            <input
            type="number"
              value={ball}
              onChange={(e) => handleBallChange(index, e.target.value)}
              ref={(el) => inputRefs.current[index] = el}
              onKeyDown={(e) => {
                if (e.key === 'Tab' && index === balls.length - 1) {
                  e.preventDefault(); 
                  addBallInput(); 
                }
                if (e.key === 'Enter') {
                  e.preventDefault(); 
                  handleCalculate(); 
                }
              }}
            />
          </div>
        ))}
        <button onClick={addBallInput}>Добавить цвет</button>
        <button onClick={removeBallInput}>Удалить последний цвет</button>
      </div>

      <div>
        <button onClick={handleCalculate} disabled={loading}>
          {loading ? 'Загружается...' : 'Посчитать'}
        </button>
      </div>

      <div>
      <img className={classNames('raccoon', { 'raccoon-rotate': loading })} src={raccoonpic} width={50} height={50} alt='raccoon' />
        <h2>Результат распределения:</h2>
        {loading ? (
          <p>Загрузка...</p>  // Показываем загрузку, если идет процесс
        ) : result.length > 0 ? (
          <p>{result.join(', ')}</p>  // Отображаем результат после загрузки
        ) : (
          // начальный экран
          <p>Введите данные и нажмите "Посчитать".</p>
        )}
      </div>
    </div>
  );
}

export default App;
