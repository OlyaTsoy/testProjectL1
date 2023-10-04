// 13.	Задача на классы и наследование: создайте базовый класс Shape (фигура), который имеет методы для расчета площади и периметра. Затем создайте подклассы, представляющие различные фигуры, такие как прямоугольник, круг и треугольник. Реализуйте методы расчета площади и периметра для каждой фигуры.

// Создаем класс Фигуры
class Shape {
  // Инициализируем значения для площади и периметра
  constructor() {
    this.area = 0;
    this.perimeter = 0;
  }
  // Создаем метод для расчета площади
  // выбросит ошибку, если не будет переопределен в подклассах
  calculateArea() {
    throw new Error('This function needs to be reassigned');
  }
  // Создаем метод для расчета периметра
  // выбросит ошибку, если не будет переопределен в подклассах
  calculatePerimeter() {
    throw new Error('This function needs to be reassigned');
  }
}

// Создаем подкласс прямоугольника
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  // Используем формулу подсчета площади S = a * b
  calculateArea() {
    this.area = this.width * this.height;
    return this.area;
  }

  // Используем формулу подсчета периметра P = (a + b) * 2
  calculatePerimeter() {
    this.perimeter = (this.width + this.height) * 2;
    return this.perimeter;
  }
}

// Создаем подкласс Круга
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  // Используем формулу подсчета площади S = число пи * радиус в квадрате
  calculateArea() {
    this.area = Math.PI * this.radius * this.radius;
    return this.area;
  }

  // Используем формулу подсчета периметра P = 2 * число пи * радиус
  calculatePerimeter() {
    this.perimeter = 2 * Math.PI * this.radius;
    return this.perimeter;
  }
}

// Создаем подкласс треугольника
class Triangle extends Shape {
  constructor(side1, side2, side3) {
    super();
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  // Используем формулу подсчета площади через формулу Герона
  calculateArea() {
    // Создаем переменную для вычисления полупериметра
    const p = (this.side1 + this.side2 + this.side3) / 2;
    // Формула Герона: корень из p * (p - a) * (p - b) * (p - c)
    this.area = Math.sqrt(
      p * (p - this.side1) * (p - this.side2) * (p - this.side3)
    );
    return this.area;
  }

  // Используем формулу подсчета периметра P = a + b + c
  calculatePerimeter() {
    this.perimeter = this.side1 + this.side2 + this.side3;
    return this.perimeter;
  }
}

// Прямоугольник
const rectangle = new Rectangle(10, 4);
console.log('Прямоугольник:');
console.log('Площадь:', rectangle.calculateArea());
console.log('Периметр:', rectangle.calculatePerimeter());

// Круг
const circle = new Circle(6);
console.log('Круг:');
console.log('Площадь:', circle.calculateArea());
console.log('Периметр:', circle.calculatePerimeter());

// Треугольник
const triangle = new Triangle(3, 4, 5);
console.log('Треугольник:');
console.log('Площадь:', triangle.calculateArea());
console.log('Периметр:', triangle.calculatePerimeter());