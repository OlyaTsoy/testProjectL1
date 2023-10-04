// 20.	Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи. При изменении данных в localStorage в консоль должен выводиться объем занятой памяти / максимальный размер хранилища.

// Создаем функцию подсчета объема памяти занимаемого данными в LocalStorage
function calcLocalStorageSize() {
  let totalSize = 0;

  // Перебираем все ключи в хранилище
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const itemSize = (key.length + value.length) * 2 / (1024 * 1024); // Размер в МБ

    totalSize += itemSize;
  }

  return totalSize;
}

// Функция для вывода информации о занимаемой памяти в консоль
function showInfoMemory() {
  const currentSize = calcLocalStorageSize().toFixed(2);
  const maxSize = (5 * 1024 * 1024 / (1024 * 1024)).toFixed(2);

  console.log(`Объем занятой памяти составляет: ${currentSize} МБ / Максимальный размер: ${maxSize} МБ`);
}

// Обработчик события storage для отслеживания изменений в localStorage
window.addEventListener('storage', showInfoMemory);

// Вызываем функцию для вывода информации о занимаемой памяти при загрузке страницы
showInfoMemory();