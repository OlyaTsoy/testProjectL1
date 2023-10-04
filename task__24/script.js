// 24.	Разработайте страницу, отображающую таблицу с данными. Данные необходимо подгружать из этого источника.
// Требования:
// ●	данные должны загружаться при загрузке страницы
// ●	необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
// ●	необходимо реализовать клиентскую пагинацию (50 элементов на странице)

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.querySelector('tbody');
  // Переменная, которая хранит загруженные данные
  let data;
  // Переменная, которая отслеживает текущее поле сортировки
  let currentSortBy = '';
  // Переменная, которая отслеживает текущее страницу
  let currentPage = 0;
  // Переменная, которая хранит количество отображаемых данных на странице
  let itemPerPage = 50;

  // Загружаем данные с сервера
  const fetchData = async () => {
    const res = await fetch(
      'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true'
    );
    data = await res.json();
    return data;
  };
  fetchData().then(() => {
    renderTable();
    const sortBtns = document.querySelectorAll('thead th');
    sortBtns.forEach((el) => {
      el.addEventListener('click', () => {
        sortByField(el.id);
      });
    });
    paginationRender();
  });

  // Функция, вывода данных на страницу
  function renderTable() {
    tbody.innerHTML = '';
    const fragment = document.createDocumentFragment(); // Создаем фрагмент
    const start = currentPage * itemPerPage; // Определяем индекс начального элемента
    const end = start + itemPerPage; // Определяем индекс конечного
    const dataOnCurrentPage = data.slice(start, end); // Методом slice получаем только те данные, которые нужно отразить на текущей странице
    dataOnCurrentPage.forEach((item) => {
      const tr = document.createElement('tr'); // Для каждого ээлемента создаем тег <tr>
      tr.innerHTML = `<td>${item.fname}</td><td>${item.lname}</td><td>${item.tel}</td><td>${item.address}</td><td>${item.city}</td><td>${item.state}</td><td>${item.zip}</td>`; // Добавляем в tr полученные данные
      fragment.appendChild(tr); // Добавляем tr во фрагмент
    });
    tbody.appendChild(fragment); // Добавляем сформированные данные фрагмента в тег tbody
  }

  // Функция сортировки, в качестве аргумента принимает поле, по которому будем сортировать
  function sortByField(field) {
    data.sort((a, b) => {
      const first = field === 'address' ? a[field].replaceAll(/\d+/g, '').toLowerCase() : a[field].toLowerCase(); // Если поле равно 'address', то удаляем все цифры и приводим к нижнему регистру
      const second = field === 'address' ? b[field].replaceAll(/\d+/g, '').toLowerCase() : b[field].toLowerCase();
      if (first > second) {
        if (currentSortBy === field) {
          return -1;
        }
        return 1;
      } else if (first < second) {
        if (currentSortBy === field) {
          return 1;
        }
        return -1;
      } else {
        return 0;
      }
    });

    // Если поля совпадают, то добавляем desc, чтобы обозначить обратный порядок сортировки
    if (currentSortBy === field) {
      currentSortBy = `${field}Desc`;
    } else {
      currentSortBy = field;
    }
    renderTable();
  }

  // Функция пагинации
  function paginationRender() {
    const pagination = document.querySelector('#pagination');
    // Вычисляем общее количество страниц
    const pageCount = Math.ceil(data.length / itemPerPage);

    // Создаем элементы пагинации
    for (let i = 0; i < pageCount; i++) {
      const li = document.createElement('li'); // Создаем элемент списка
      li.innerText = i + 1; // Добавляем номер страницы
      li.addEventListener('click', () => {
        changePage(i); // Вешаем обработчик события клика для изменения страницы
      });
      pagination.appendChild(li); // Добавляем список в пагинацию
    }
  }

  // Функция изменения текущей страницы
  function changePage(page) {
    currentPage = page;
    renderTable();
  }
});