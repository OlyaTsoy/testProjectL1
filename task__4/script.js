// 4.	Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
// ●	112 сообщения
// ●	12 сообщений
// ●	1 сообщение
// ●	1024 пользователя
// ●	1026 пользователей
// ●	121 пользователь`
// 	Функцию надо упаковать в модуль.

// Испортируем все функции
import {declOfMsg, declOfUser} from "./moduleDeclWord.js";

// Проверяем
console.log(declOfUser(1024));
console.log(declOfMsg(2));