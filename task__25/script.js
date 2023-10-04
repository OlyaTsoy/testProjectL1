// 25.	Задача: Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент, добавляет его в DOM и устанавливает для него стиль с помощью CSS.

// Первый способ - добавляем стили из css

// Создаем функцию, которая создает новый элемент и добавляет его в дом-дерево, устанавливая стили
function createNewElemVer1() {
  // Находим и сохраняем элемент в переменную, в которую будем добавлять новый элемент
  const wrapElements = document.querySelector(".main__elements");

  // При помощи createElement создаем новый div
  const newElem = document.createElement("div");
  // Создаем текст новому элементу при помощи createTextNode
  const newText = document.createTextNode("Элемент, созданный в js - ver.1");
  // Устанавливаем готовый класс из css для нового элемента
  newElem.className = "main__newElem";
  // Добавляем текст внутрь нового элемента
  newElem.appendChild(newText);

  // Добавляем новый элемент внутрь элемента wrapElements (appendChild вставит после дочернего эелемента)
  wrapElements.appendChild(newElem);
};
// Вызываем функцию
createNewElemVer1();


// Второй способ - добавляем стили при помощи js

// Создаем функцию, которая создает новый элемент и добавляет его в дом-дерево, устанавливая стили
function createNewElemVer2() {
  // Находим и сохраняем элемент в переменную, в которую будем добавлять новый элемент
  const wrapElements = document.querySelector(".main__elements");

  // При помощи createElement создаем новый div
  const newElem = document.createElement("div");
  // Создаем и добавляем текст новому элементу при помощи innerText
  newElem.innerText = "Элемент, созданный в js - ver.2";

  // Для нового элемента добавляем стили при помощи .style
  newElem.style.backgroundColor = "#b59696";
  newElem.style.borderRadius = "15px";
  newElem.style.width = "200px";
  newElem.style.padding = "20px";
  newElem.style.color = "#e0dada";

  // Добавляем новый элемент внутрь элемента wrapElements (prepend вставит элемент перед дочерним элементом)
  wrapElements.prepend(newElem);
};
// Вызываем функцию
createNewElemVer2();