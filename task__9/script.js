// 9.	Реализовать функцию конвертации JSON в строку

// Создаем функцию, аналог json.stringify
function analogueStringify(obj) {
  if (typeof obj !== 'object' || obj === null) {
    // Если переданный аргумент строка, оборачиваем в кавычки
    if (typeof obj === 'string') {
      return `"${obj}"`;
      // Если переданный аргумент число, булиновое значение или null, преобразовываем в строку
    } else if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
      return String(obj);
    } else {
      return 'null';
    }
    // Если переданный аргумент массив
  } else if (Array.isArray(obj)) {
    // При помощи метода map преобразуем каждый элемент в строку
    const arrayStr = obj.map((item) => analogueStringify(item)).join(',');
    return `[${arrayStr}]`;
  } else {
    const objectStr = Object.keys(obj).map((key) => `"${key}":${analogueStringify(obj[key])}`).join(',');
    return `{${objectStr}}`;
  }
}

// Проверяем
// Создаем js объект
const jsObject = { name: 'Jack', age: 33, city: 'Halloween Town' };
// Конвертируем js объект при помощи функции
const jsonString = analogueStringify(jsObject);
// Выводим в консоль
console.log(jsonString);