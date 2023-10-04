// 3.	Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// ●	вычисление N-го числа в ряду Фибоначчи
// ●	вычисление всех чисел в ряду Фибоначчи до числа N
// ●	вычисление N-вычисление всех простых чисел до числа N
// 	Будет плюсом, если задумаетесь и об оптимизации.

// Создаем аналог библиотеки Math - MathX, которая содержит функции для математических вычислений
const MathX = (function() {

  // Функция для вычисления N-го числа в ряду Фибоначчи
  function calcFibonacci(n) {
    // Используем математическую формулу: Fn = F(n-1) + F(n-2)
    let f1 = 0; // первое значение равное F(n-1)
    let f2 = 1; // второе значение равное F(n-2)

    // Цикл начинаем с 2, т.к первые два числа уже известны
    for (let i = 2; i <= n; i++) {
      let sumf = f1 + f2;  // новое число, как сумма двух предыдущих
      f1 = f2;
      f2 = sumf;
    }
    return f2;

    // Можно реализовать при помощи рекурсии
    // return n <= 1 ? n : MathX.calcFibonacci(n - 1) + MathX.calcFibonacci(n - 2);

  }

  // Функция для вычисления всех чисел в ряду Фибоначчи до числа N
  function calcFibonacciSeriesNum(n) {
    // Создаем массив для всех чисел в ряду
    const seriesNumbers = [];
    // Цикл начинаем с 1 до числа n
    for (let i = 1; i <= n; i++) {
      seriesNumbers.push(this.calcFibonacci(i)); // Вызываем функцию calcFibonacci для каждого числа i, и добавляем в массив
    }
    return seriesNumbers;
  }

  // Функция для проверки, является ли число простым
  function isPrimeNumber(num) {
    if (num === 1) {
      return false; // Если число равно 1, то возвращаем false, т.к 1 не является простым числом
    } else {
      // Цикл начинаем с 2 и до num - 1 , т.к простые числа  делятся без остатка только на 1 и на самих себя
      for (let i = 2; i < num; i++) {
        if (num % i === 0) {
          return false; // Если число делится без остатка, то возвращаем false (не простое)
        }
      }
      return true; // Иначе возвращаем true (простое)
    }
  }

  // Функция для вычиcления всех простых чисел до числа N
  function calcPrimeNumbers(n) {
    // Создаем массив для всез простых чисел
    const seriesNumbers = [];
    // Цикл начинаем с 1 и до числа n
    for (let i = 1; i <= n; i++) {
      if (this.isPrimeNumber(i)) {
        seriesNumbers.push(i); // Вызываем функцию isPrimeNumber, чтобы проверить простое ли число, если простое, то добавляем в массив
      }
    }
    return seriesNumbers;
  }

  // Возвращаем объект, содержащий все функции
  return {
    calcFibonacci,
    calcFibonacciSeriesNum,
    isPrimeNumber,
    calcPrimeNumbers
  }
})();

// Проверяем:
console.log(MathX.calcFibonacci(10)); // Вычисление 10-го числа в ряду Фибоначчи
console.log(MathX.calcFibonacciSeriesNum(20)); // Вычисление всех чисел в ряду Фибоначчи до числа 20
console.log(MathX.isPrimeNumber(2)); // Проверяем, является ли число 2 простым числом, если нет, то выведет false, если да, то true
console.log(MathX.calcPrimeNumbers(100)); // Вычисление всех простых чисел до 100