// 8.	Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.

// Создаем массив функций
const arrFunc = [
  function firstFunc() {
    return 1;
  },
  function secondFunc() {
    return 2;
  },
  function thirdFunc() {
    return 3;
  },
];

// Создаем функцию, которая принимает масссив функций
function mainFunction(arr) {
  // Возвращаем новую функцию
  return function () {
    const result = [];
    // Перебираем каждую функцию в массиве
    for (const func of arr) {
      // Вызывается каждая функция и добавляется в пустой массив результатов
      result.push(func());
    }
    return result;
  };
}

// Создаем экземпляр функции, в которой лежат все функции из массива
const combinedFunc = mainFunction(arrFunc);
// Вызываем фукнцию
const result = combinedFunc();
// Выводим результат в консоль
console.log(result);