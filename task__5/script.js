// 5.	Разработайте функцию преобразования JSON в связный список. На входе функция должна получать JSON, содержащий список объектов, на выходе объект, представляющий из себя односвязный список.

// Создаем JSON с массивом объектов
const jsonString =
  '[{"id": 1,"fname": "Jonathan", "lname": "Lau", "city": "Flushing"}, {"id": 2,"fname": "Luigino", "lname": "Wagner", "city": "Elmwood Park"}, {"id": 3,"fname": "Michael", "lname": "Contreras", "city": "Joliet"}, {"id": 4,"fname": "Maegan", "lname": "Aresti", "city": "Janesville"}, {"id": 5,"fname": "Tamika", "lname": "Anglin", "city": "North Kingstown"}]';

// Создаем класс для элемента списка
class LinkedListNode {
  constructor(value) {
    // текущий элемент
    this.value = value;
    // следующий элемент
    this.next = null;
  }
}

// Создаем функцию для преобразования массива объектов в односвязный список, принимает строку json
function JSONToLinkedList(json) {
  // Преобразуем json в массив объектов js
  const newArr = JSON.parse(json);
  // Проверяем, если массив пустой, то возвращает null
  if (newArr.length === 0) {
    return null;
  }

  // Создаем первый элемент списка
  const head = new LinkedListNode(newArr[0]);
  let current = head;

  for (let i = 1; i < newArr.length; i++) {
    // Создаем следующий элемент списка
    current.next = new LinkedListNode(newArr[i]);
    current = current.next;
  }

  return head;
}

// Преобразуем массив объектов в односвязный список
const linkedList = JSONToLinkedList(jsonString);

// Выводим результат
console.log(linkedList);