// 6.	Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. Напишите код, который сортирует этот массив по возрастанию возраста, а при равных возрастах сортирует по алфавиту по полю name.

// Создаем массив объектов
const people = [
  {
    name: 'Jack',
    age: 33,
  },
  {
    name: 'Victor',
    age: 19,
  },
  {
    name: 'Sally',
    age: 28,
  },
  {
    name: 'Harry',
    age: 11,
  },
  {
    name: 'Emily',
    age: 19,
  },
  {
    name: 'Coraline',
    age: 15,
  },
  {
    name: 'Edward',
    age: 17,
  },
  {
    name: 'William',
    age: 21,
  },
  {
    name: 'Elizabeth',
    age: 20,
  },
  {
    name: 'Bella',
    age: 17,
  },
  {
    name: 'Bella',
    age: 11,
  },
];

// Сортируем массив, в качестве аргументов А - начальный элемент, Б - следующий за ним
people.sort(function (a, b) {
  // Если возраст А меньше возраста Б, тогда возвращаем -1, и А будет идти перед Б
  if (a.age < b.age) {
    return -1;
  }
  // Если возраст А больше возраста Б, тогда возвращаем 1, и А будет идти после Б
  if (a.age > b.age) {
    return 1;
  }

  // Если возраста равны, тогда начинаем сравнивать имена

  // Если имя А меньше имени Б, тогда возвращаем -1, и А будет идти перед Б
  if (a.name < b.name) {
    return -1;
  }
  // Если имя А больше имени Б, тогда возвращаем 1, и А будет идти после Б
  if (a.name > b.name) {
    return 1;
  }
  // Если имена равны, возвращает ноль
  return 0;
});


// Сортируем массив
// (a.age - b.age) - используем вычитание А возраста из Б, если А меньше Б, тогда А будет идти перед Б
// .localeCompare - если возраста равны, тогда данная функция сравнивает их имена
// people.sort((a, b) => (a.age - b.age) || a.name.localeCompare(b.name));

// Выводим в консоль отсортированный массив
console.log(people);