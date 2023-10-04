// 11.	Задача о замыканиях и области видимости: напишите функцию, которая возвращает другую функцию. Внутренняя функция должна иметь доступ к переменной, определенной во внешней функции, даже после того, как внешняя функция завершила свое выполнение.

// Создаем внешнюю функцию
function createExternalFunc() {
  // Создаем значение для внешней переменной
  const externalVariable = 'Это переменная из внешней функции';

  // Создаем внутреннюю функцию и сразу возвращаем
  return function() {
  // Внутренняя функция имеет доступ к внешней переменной
    console.log(externalVariable);
  }
};

// Создаем экземпляр внешней функции
const createInternalFunc = createExternalFunc();
// Вызываем внутреннюю функцию
createInternalFunc();