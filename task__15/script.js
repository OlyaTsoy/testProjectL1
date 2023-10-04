// 15.	Задача на асинхронность: напишите асинхронную функцию, которая использует ключевое слово await для ожидания выполнения других асинхронных операций, и возвращает результат выполнения.

// Создаем асинхронную функцию
async function asyncFunc() {
  // Ожидаем выполнение функции otherAsyncFunc ниже
  const response = await otherAsyncFunc();

  // К результату из otherAsyncFunc(там вернули 1) прибавляем 1
  return response + 1;
}

// Вызываем асинхронную функцию otherAsyncFunc
async function otherAsyncFunc() {
  // Ждем когда промис завершится успешно, через 1 секунду
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  // После завершения возвращаем 1
  return 1;
}

// Вызываем асинхронную функцию asyncFunc, через then обрабатываем результат
asyncFunc().then((result) => {
  // В консоле выведет 2
  console.log(result); 
});