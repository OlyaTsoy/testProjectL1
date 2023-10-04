// 17.	Необходимо реализовать простое поле ввода адреса с функцией геокодинга: пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес. Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.
// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

const addressInput = document.querySelector('#addressInput'); // Получаем инпут
const suggestionsList = document.querySelector('#suggestionsList'); // Получаем выпащающий список

// Создаем функцию, которая запрашивает данные с API Яндекс.Карт
async function getDataFromAPI(query) {
  const api_key = '6dc96f28-bbd7-468d-94f4-dfc81735faf1'; // Установите Ваш ключ
  const api_url = `https://geocode-maps.yandex.ru/1.x/?apikey=${api_key}&geocode=${query}&format=json`;

  try {
    const response = await fetch(api_url);
    const data = await response.json();
    return data.response.GeoObjectCollection.featureMember; // GeoObjectCollection - корневая коллекция геообъектов, а featureMember - список геообъектов
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    return [];
  }
}

// Создаем функция, которая отобразит результаты в выпадающий список
function showSuggestions(suggestions) {
  suggestionsList.innerHTML = ''; // Очищаем текущий список
  suggestions.forEach((suggestion) => {
    const name = suggestion.GeoObject.name; // Извлекаем имя из геообъекта коллекции
    const option = document.createElement('option'); // Создаем элемент для выпадающего списка
    option.textContent = name; // Добавляем ему текст
    option.addEventListener('click', () => {
      addressInput.value = name; // При клике устанавливаем значение инпута как имя местоположения
      suggestionsList.style.display = 'none'; // Скрываем список
    });
    suggestionsList.appendChild(option);
  });
  suggestionsList.style.display = 'block';
}

// Создаем функцию для выполнения дебаунсинга
function executeDebounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// Создаем функцию для выполнения защиты от троттлинга
function throttle(fn, delay) {
  let isThrottled = false;
  return function (...args) {
    if (!isThrottled) {
      fn(...args);
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}

// Создаем переменную и присваиваем ей функцию
const debouncedInputHandler = executeDebounce(async () => {
  const query = addressInput.value.trim();
  if (query.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }
  const suggestions = await getDataFromAPI(query);
  showSuggestions(suggestions);
}, 300);


addressInput.addEventListener('input', debouncedInputHandler);

suggestionsList.addEventListener('change', () => {
  addressInput.value = suggestionsList.value;
});