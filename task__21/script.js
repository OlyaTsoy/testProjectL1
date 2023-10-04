// 21.	Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).

// Создаем переменную, которая будет отслеживать количество вызовов
let counter = 0;
const testWrap = document.querySelector('#testWrap');
const depthStackWrap = document.createElement('p');
const counterWrap = document.createElement('p');

// Создаем функцию вычисления размера callstack
function calcCallstackSize() {
  try {
    counter++;
    // Рекурсивно вызываем функцию до возникновения ошибки
    calcCallstackSize();
  } catch (error) {
    // Обрабатываем ошибку
    depthStackWrap.textContent = 'Глубина стека вызовов: ' + error.stack.split('\n').length;
    counterWrap.textContent = `Функция вызывалась ${counter} раз`;
    testWrap.appendChild(depthStackWrap);
    testWrap.appendChild(counterWrap);
  }
}

// Вызываем функцию
calcCallstackSize();