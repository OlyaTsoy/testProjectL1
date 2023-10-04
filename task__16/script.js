// 16.	Задача на модули и использование внешних библиотек: напишите модуль, который экспортирует функцию для работы с датами. Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.

// Импортируем все функции из модуля
import { getCurrentDate, calcRelativeTime, calcCalendarTime, addDaysToDate } from "./moduleDate.js";

// Вычисляем текущую дату
const currentDate = getCurrentDate();
console.log('Текущая дата:', currentDate);

// Вычисляем будущую дату, прибавляем 15 дней к текущей дате
const futureDate = addDaysToDate(currentDate, 15);
console.log('Будущая дата:', futureDate);

// Вычисляем относительное время, используя дату в форме строки "20111031" и формата даты
const relativeTime = calcRelativeTime("20111031", "YYYYMMDD");
console.log('Относительное время:', relativeTime);

// Вычисляем календарное время, отнимаем 3 дня из текущей даты
const calendarTime = calcCalendarTime(3);
console.log('Календарное время:', calendarTime);