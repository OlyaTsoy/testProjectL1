// 19.	Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много). Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки. При прокрутке содержимого виджета до конца должны подгружаться новые посты. Необходимо реализовать возможность кэширования уже загруженных данных: если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).
// При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.

const postsList = document.querySelector('.widget__list');
// Переменные для хранения параметров запроса к VK API
const access_token = '651e2509651e2509651e250949660bf4b46651e651e25090004f462cc7746086263359e'; // Укажите свой токен
const owner_id = '-199318376'; // id паблика в VK
const api_version = '5.154';
const api_url = 'https://api.vk.com/method/wall.get';

let endOfWidget = false; // Переменная для отслеживания конца виджета
let loadedPostCount = 0; // Переменная для отслеживания количества уже загруженных постов
let posts = JSON.parse(localStorage.getItem('cachedPosts')) || []; // Загрузка постов из localStorage
let deletedPostsCounter = localStorage.getItem('offsetDeletedPosts') || 0; //Переменная для отслеживания удаленных постов
const renderedPostIds = []; // Переменная для отслеживания идентификаторов

// Функция для отправки запроса к VK API для загрузки постов.
function requestDataFromAPI() {
  const script = document.createElement('script');
  script.src = `${api_url}?access_token=${access_token}&owner_id=${owner_id}&offset=${posts.length + deletedPostsCounter}&count=10&v=${api_version}&callback=callbackFunc`;
  document.body.appendChild(script);
}

// Функция, которая обрабатывает данные, полученные от VK API
function callbackFunc(data) {
  if (data.error) {
    throw new Error('Error loading data from VK API:', data.error);
  } else {
    posts.push(...data.response.items);
    try {
      // Добавляем данные в локальное хранилище
      localStorage.setItem('cachedPosts', JSON.stringify(posts));
    } catch (e) {
      // При преполнении удаляем первые 100 постов и добавляем offset для пропуска постов
      console.log('Удаление первых 100 постов')
      posts = posts.slice(100, posts.length)
      deletedPostsCounter += 100
      localStorage.setItem('offsetDeletedPosts', deletedPostsCounter);
      localStorage.setItem('cachedPosts', JSON.stringify(posts));
    }

    renderPosts(posts);
  }
}

// Функция для отображения постов
function renderPosts(posts) {
  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    if (renderedPostIds.includes(post.id)) {
      return;
    }
    const formattedText = post.text.replace(/\n/g, '<br>'); // Перенос текста

    // Перевод даты из unixtime
    const unixTimestamp = post.date;
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Добавляем ноль перед месяцем
    const day = String(date.getDate()).padStart(2, '0'); // Добавляем ноль перед днем
    const formattedDate = `${day}.${month}.${year}`;

    let allPhoto = '';
    post.attachments.forEach((el) => {
      if (el.photo && el.photo.sizes && el.photo.sizes.length > 2) {
        const img = document.createElement('img');
        img.src = el.photo.sizes[2].url;
        allPhoto += `<img src="${el.photo.sizes[2].url}" class="widget__photo" />`;
      }
    });

  // Создаем элементы списка и вставляет их в DOM
    const listItem = document.createElement('li');
    listItem.classList = 'widget__item';
    listItem.innerHTML = `<span>Опубликовано: ${formattedDate}</span><p>${formattedText}</p><div class="widget__allPhoto">${allPhoto}</div><div class="widget__desc"><div class="widget__like"><img src="./assets/like.svg" width="20px" height="20px"></img>${post.likes.count}</div><div class="widget__comment"><img src="./assets/comment.svg" width="20px" height="20px"></img>${post.comments.count}</div></div>`;
    fragment.appendChild(listItem);
    renderedPostIds.push(post.id)
  });

  postsList.appendChild(fragment);
}

const widgetWrap = document.querySelector('.widget__wrapper');
// Функция для определения, прокручен ли виджет до конца
function isScrolledToBottom() {
  const widgetScrollHeight = widgetWrap.scrollHeight;
  const widgetScrollTop = widgetWrap.scrollTop;
  const widgetHeight = widgetWrap.clientHeight;

  return (widgetScrollHeight - widgetScrollTop) <= widgetHeight;
}

// Вешаем событие, и когда виджет прокручивается до конца, вызывается функция для загрузки дополнительных постов
widgetWrap.addEventListener('scroll', () => {
    if (isScrolledToBottom()) {
      endOfWidget = true;
      requestDataFromAPI();
    }
});

// Вызываем функцию
requestDataFromAPI();