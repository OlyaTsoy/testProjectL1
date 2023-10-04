// 28.	Задача: Создать и добавить элемент с использованием шаблонов: Напишите функцию, которая создает новый элемент с использованием шаблонов (например, с помощью тега <template>) и добавляет его в DOM.

// Создаем функцию, которая создает элемент с использованием тега <template>
function addNewElem() {
  // Получаем тег <ul> и сохраняем в переменную
  const ul = document.querySelector("ul");

  // Находим шаблон для списка
  const sample = document.querySelector("#sampleList");
  // Находим тег внутри шаблона, с помощью, которого установим текст для элементов
  const span = sample.content.querySelector("span");

  // Устанавливаем текст для элемента
  span.textContent = "Побег из Шоушенка";

  // Создаем дубликат шаблона, и сохраняем его в li
  let li = sample.content.cloneNode(true);
  // Добавляем дубликат как дочерний элемент к ul
  ul.appendChild(li);

  // Создаем для дубликата новый текст
  span.textContent = "Побег из Шоушенка";

  // Второй дубликат
  li = sample.content.cloneNode(true);
  ul.appendChild(li);

  span.textContent = "Форрест Гамп";

  // Третий дубликат
  li = sample.content.cloneNode(true);
  ul.appendChild(li);

  span.textContent = "1+1";

  // Четвертый дубликат
  li = sample.content.cloneNode(true);
  ul.appendChild(li);

  span.textContent = "Список Шиндлера";
};

// Вызываем функцию
addNewElem();