// 27.	Задача: Добавить анимацию для элемента: Напишите функцию, которая добавляет анимацию для элемента на веб-странице, например, плавное изменение его положения или размера.

// Переменная, хранит начальное положение элемента
let position = 0;
// Переменная, хранит идентификатор интервала
let intervalId;
// Получаем элемент обертки для изображения
const animationWrap = document.querySelector('#animationWrap');
// Вешаем обработчик события клика на обертку, чтобы перезапускать анимацию
animationWrap.addEventListener("click", () => startAnimation(2, 1660, 1)); // Передаем параметры для проверки

// Функция, которая запускает анимацию, принимает шаг перемещения анимации, конечное положение, интервал времени
function startAnimation(step, endPosition, intervalTime) {
  // Останавливаем анимацию, если она уже запущена
  clearInterval(intervalId);
  position = 0; // Сбрасываем положение к начальному
  intervalId = setInterval(() => moveElem(step, endPosition), intervalTime);
}

// Функция, которая отвечает за передвижение изображения
function moveElem(step, endPosition) {
  // Получаем элемент изображения
  const animationImage = document.querySelector('#animationImage');
  // Перемещаем положение элемента
  position += step;
  animationImage.style.left = position + "px";

  if (position >= endPosition) {
    clearInterval(intervalId); // Если изображение дошло до конечного положения, тогда останавливаем анимацию
  }
}