// 18.	Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

// Создаем функцию подсчета максимального объема данных в браузере Opera
function calcMaxLocalStorage() {
  // Сначала очищаем локальное хранилище
  localStorage.clear();
  // Время начала подсчета
  const timeStart = Date.now();
  // Создаем переменную, которая будет отслеживать заполненный объем данных
  let occupiedData = 0;
  // Создаем переменную, которая будет генерировать уникальные ключи
  let uniqueKeys = 0;
  // Создаем переменную для обработки ошибок
  let error;
  // Запускаем цикл до момента возникновения ошибки
  while (!error) {
    try {
      // Добавляем данные в локальное хранилище
      localStorage.setItem(
        `testKey${uniqueKeys}`,
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum amet voluptatem reiciendis impedit tempora optio magni dolor ad soluta, aspernatur vero! Debitis eligendi praesentium temporibus illum labore, recusandae expedita neque?'
      );
    } catch (e) {
      error = e;
    }
    uniqueKeys++;
  }

  if (error) {
    // Проходимся циклом по ключам и вычисляем занимаемый объем данных
    for (let i = 0; i < localStorage.length; i++) {
      let countKey = localStorage.key(i);
      let countValue = localStorage.getItem(localStorage.key(i));
      let itemLength = countKey.length + countValue.length;
      occupiedData += itemLength;
    }
    // Вычисляем заполненный объем данных в мегабайтах
    occupiedData = ((occupiedData * 16) / (8 * 1024) / 1024).toFixed(2);
    localStorage.clear();
  }
  // Время окончания подсчета
  const timeEnd = Date.now();
  // Вычисляем время выполнения
  const timeTotal = timeEnd - timeStart;
  // Создаем переменную с информацией о времени выполнения и занимаемом объеме данных в local storage
  const message = `Finished in: ${timeTotal}ms\nMaximum localStorage size: ${occupiedData} Mb`;
  const testWrap = document.querySelector('#testWrap');
  testWrap.style.fontSize = '20px';
  testWrap.innerText = message;
}

// Вызываем функцию
calcMaxLocalStorage();