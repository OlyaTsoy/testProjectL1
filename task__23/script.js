// 23.	Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля. Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах. Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

const passwordInput = document.querySelector('#inputPassword');
const passwordRating = document.querySelector('#rating');

// Вешаем обработчик событий, при котором функция сработает когда пользователь отпустит клавишу
passwordInput.addEventListener('keyup', evaluatePasswordComplexity);

// Создаем функцию, которая анализирует сложность пароля
function evaluatePasswordComplexity() {
  // Находим значение из инпута
  const inputValue = passwordInput.value;

  const minLength = 8; // Минимальная длина пароля
  const specialSymbols = /[!@#$%^&*()_+\[\]{};':"\\|,.<>?]/g; // Все спецсимволы
  const numbers = /[0-9]/g; // Все цифры
  const lowercaseLetters = /[a-z]/g; // Все буквы в нижнем регистре
  const uppercaseLetters = /[A-Z]/g; // Все буквы в верхнем регистре

  // Проверяем соответствие пароля
  const isMinLength = inputValue.length >= minLength;
  const isLowercaseLetters = lowercaseLetters.test(inputValue);
  const isUppercaseLetters = uppercaseLetters.test(inputValue);
  const isNumbers = numbers.test(inputValue);
  const isSpecialSymbols = specialSymbols.test(inputValue);

  // Определение оценки сложности
  let complexityPassword = 'Слабый пароль';
  if (isMinLength && isLowercaseLetters && isUppercaseLetters && isNumbers && isSpecialSymbols) {
    complexityPassword = 'Сильный пароль'; // Если пароль содержит в себе все критерии
  } else if (isMinLength && isLowercaseLetters && isUppercaseLetters && (isNumbers || isSpecialSymbols)) {
    complexityPassword = 'Средний пароль'; // Если пароль содержит в себе не все критерии
  }

  // Формирование рекомендаций
  const recommendations = [];
  if (!isMinLength) recommendations.push('Увеличьте длину пароля');
  if (!isLowercaseLetters) recommendations.push('Добавьте строчные буквы');
  if (!isUppercaseLetters) recommendations.push('Добавьте заглавные буквы');
  if (!(isNumbers || isSpecialSymbols))
    recommendations.push('Добавьте цифры или специальные символы');

  // Отображаем на странице рекомендации
  passwordRating.textContent = `Оценка сложности: ${complexityPassword}`;
  if (recommendations.length > 0) {
    passwordRating.textContent += `Рекомендации: ${recommendations.join(
      ', '
    )}`;
  }
}

// Функция, которая показывает и скрывает пароль
function showHiddenPassword() {
  const eyeIcon = document.querySelector('.password__icon');
  if (passwordInput.type === 'password') {
    eyeIcon.classList.add('hidden');
    passwordInput.type = 'text';
  } else {
    eyeIcon.classList.remove('hidden');
    passwordInput.type = 'password';
  }
}