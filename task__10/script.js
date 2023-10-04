// 10.	Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

// Создаем функцию, аналог json.parse
function analogueParse(jsonString) {
  let index = 0;

  // Функция выброса ошибки
  function throwError(message) {
    throw new Error(`JSON parsing error: ${message} at index ${index}`);
  }

  // Функция проверки текущего символа
  function checkCurrentSymbol(symbol) {
    if (jsonString[index] === symbol) {
      index++;
    } else {
      throwError(`Expected '${symbol}'`);
    }
  }

  // Создаем функцию, которая разбирает json
  function parseValue() {
    const symbol = jsonString[index];
    if (symbol === '{') {
      return parseObject();  // Если фигурная скобка, то вызываем фукнцию для разбора объекта
    } else if (symbol === '[') {
      return parseArray(); // Если квадратная скобка, то вызываем фукнцию для разбора массива
    } else if (symbol === '"') {
      return parseString(); // Если кавычки, то вызываем фукнцию для разбора строки
    } else if (symbol === 't' && jsonString.slice(index, index + 4) === 'true') { // Если t и следующие символы = true, то возвращаем true и увеличиваем индекс на 4
      index += 4;
      return true;
    } else if (symbol === 'f' && jsonString.slice(index, index + 5) === 'false') { // Если f и следующие символы = false, то возвращаем false и увеличиваем индекс на 5
      index += 5;
      return false;
    } else if (symbol === 'n' && jsonString.slice(index, index + 4) === 'null') { // Если n и следующие символы = null, то возвращаем null и увеличиваем индекс на 4
      index += 4;
      return null;
    } else if (/[\d-]/.test(symbol)) {
      return parseNumber(); // Иначе вызываем функцию для разбора цифр
    } else {
      throwError(`Unexpected symbol '${symbol}'`);
    }
  }

  // Создаем функцию, которая разбирает объект json
  function parseObject() {
    const obj = {};
    checkCurrentSymbol('{');
    let waitingComma = false; // Переменная, которая отслеживает ожидание запятой
    while (jsonString[index] !== '}') {
      if (waitingComma) {
        checkCurrentSymbol(',');
      }
      const key = parseString();
      checkCurrentSymbol(':');
      const value = parseValue();
      obj[key] = value;
      waitingComma = true; // Следующее свойство должно быть разделено запятой
    }
    checkCurrentSymbol('}');
    return obj;
  }

  // Создаем функцию, которая разбирает массив
  function parseArray() {
    const arr = [];
    checkCurrentSymbol('[');
    let waitingComma = false;
    while (jsonString[index] !== ']') {
      if (waitingComma) {
        checkCurrentSymbol(',');
      }
      const value = parseValue();
      arr.push(value);
      waitingComma = true;
    }
    checkCurrentSymbol(']');
    return arr;
  }

  // Создаем функцию, которая разбирает строку
  function parseString() {
    let result = '';
    checkCurrentSymbol('"');
    while (jsonString[index] !== '"') {
      result += jsonString[index];
      index++;
    }
    checkCurrentSymbol('"');
    return result;
  }

  // Создаем функцию, которая разбирает цифры
  function parseNumber() {
    let result = '';
    while (/[\d.eE+-]/.test(jsonString[index])) {
      result += jsonString[index];
      index++;
    }
    const num = parseFloat(result);
    if (isNaN(num)) {
      throwError(`Invalid number: ${result}`);
    }
    return num;
  }

  try {
    const parsedValue = parseValue();
    // Проверка на наличие оставшихся символов после разбора
    if (index !== jsonString.length) {
      throwError(`Unexpected symbols after JSON: '${jsonString.slice(index)}'`);
    }
    return parsedValue;
  } catch (error) {
    throw error;
  }
}

// Менее безопасный способ, с ипользованием eval
function analogueParseEval(jsonString) {
  return eval(`(${jsonString})`);
}

// Проверяем
// Создаем строку json
const jsonString = '{"name":"Jack","age":33,"city":"Halloween Town"}';
const parsedObject = analogueParse(jsonString);
console.log(parsedObject);
// Пример использования с eval
const parsedObjectEval = analogueParseEval(jsonString);
console.log(parsedObjectEval);