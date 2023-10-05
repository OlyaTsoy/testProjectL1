// 28.	Задача: Создать и добавить элемент с использованием шаблонов: Напишите функцию, которая создает новый элемент с использованием шаблонов (например, с помощью тега <template>) и добавляет его в DOM.

const ul = document.querySelector("ul");
// Находим шаблон для списка
const sample = document.querySelector("#sampleList");

// Создаем функцию, которая создает элемент с использованием тега <template>
function addNewElem() {
  addSample("Побег из Шоушенка");
  addSample("Форрест Гамп");
  addSample("1+1");
  addSample("Список Шиндлера");
};

function addSample(text) {
  // Создаем дубликаты и устанавливаем текст перед каждым клонированием
  let span = sample.content.querySelector("span");
  span.textContent = text; // Устанавливаем текст для элемента
  let li = sample.content.cloneNode(true);
  ul.appendChild(li); // Добавляем дубликат как дочерний элемент к ul
};

// Вызываем функцию
addNewElem();