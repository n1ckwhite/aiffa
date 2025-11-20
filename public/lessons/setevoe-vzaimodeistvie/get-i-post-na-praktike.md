#  Использование HTTP методов GET и POST на практике

HTTP методы GET и POST — самые часто используемые для взаимодействия клиента с сервером. Давайте разберём, как их применять на практике с помощью JavaScript и встроенного API `fetch`.

##  Как работает метод GET

Метод **GET** используется для запроса данных с сервера. Он не изменяет данные на сервере, а только запрашивает их. Все параметры передаются через URL (query string).

###  Пример: Получение данных о пользователе
```javascript
const url = 'https://jsonplaceholder.typicode.com/users/1';

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(userData => {
        console.log("User Data:", userData);
    })
    .catch(error => {
        console.error("Error:", error);
    });
```
- В этом примере мы отправляем GET-запрос и выводим полученные данные о пользователе.

---

##  Как работает метод POST

Метод **POST** используется для отправки данных на сервер, например, для создания нового ресурса. Данные передаются в теле запроса, обычно в формате JSON.

###  Пример: Создание нового пользователя
```javascript
const url = 'https://jsonplaceholder.typicode.com/users';
const newUser = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com"
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(createdUser => {
        console.log("Created User:", createdUser);
    })
    .catch(error => {
        console.error("Error:", error);
    });
```
- Здесь мы отправляем POST-запрос, передавая данные нового пользователя. Если запрос успешен, выводим результат.

---

##  Советы и типичные ошибки

- **GET** не должен использоваться для передачи конфиденциальных данных — параметры видны в URL.
- **POST** подходит для отправки больших объёмов данных и передачи личной информации.
- Не забывайте указывать заголовок `'Content-Type': 'application/json'` при отправке JSON через POST.
- Проверяйте статус ответа (`response.ok`), чтобы обработать ошибки сети или сервера.
- Используйте `catch` для обработки ошибок — это поможет избежать "тихих" сбоев.
- Не отправляйте чувствительные данные через GET-запросы!

---

##  Сравнение GET и POST

| Критерий         | GET                                  | POST                                 |
|------------------|--------------------------------------|--------------------------------------|
| Где параметры?   | В URL (query string)                 | В теле запроса (body)                |
| Видны в адресе?  | Да                                   | Нет                                  |
| Размер данных    | Ограничен (обычно до 2048 символов)  | Практически не ограничен             |
| Кэшируется       | Да                                   | Нет                                  |
| Используется для | Получения данных                     | Отправки/создания данных             |
| Безопасность     | Низкая для личных данных             | Выше (но используйте HTTPS!)         |

---

##  Итог

- **GET** — для получения информации, параметры в URL, не изменяет сервер.
- **POST** — для отправки данных, параметры в теле, изменяет состояние на сервере.
- Используйте `fetch` для работы с HTTP-запросами в JavaScript.

##  ЗАДАЧИ

Задачи по теме `GET и POST на практике`:

---

###  Задача 1: Получение списка постов
Сделайте GET-запрос к API `https://jsonplaceholder.typicode.com/posts` и выведите в консоль первые 3 поста.
<details>
<summary> Решение</summary>

```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(posts => {
    console.log(posts.slice(0, 3));
  });
```
</details>

---

###  Задача 2: Отправка нового поста
С помощью POST-запроса отправьте на `https://jsonplaceholder.typicode.com/posts` объект:
```javascript
{
  title: "Test Post",
  body: "This is a test.",
  userId: 1
}
```
Выведите результат в консоль.
<details>
<summary> Решение</summary>

```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "Test Post",
    body: "This is a test.",
    userId: 1
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```
</details>

---

###  Задача 3: Ошибка при GET-запросе
Что произойдёт, если сделать GET-запрос на несуществующий адрес? Как обработать ошибку?
<details>
<summary> Решение</summary>

Если адрес не существует, `response.ok` будет `false`, и нужно выбросить ошибку:

```javascript
fetch('https://jsonplaceholder.typicode.com/unknown')
  .then(res => {
    if (!res.ok) throw new Error('Not found');
    return res.json();
  })
  .catch(err => console.error(err));
```
</details>

---

###  Задача 4: GET или POST?
В каких случаях лучше использовать GET, а в каких — POST? Приведите по 2 примера для каждого случая.
<details>
<summary> Решение</summary>

**GET:**
- Получение списка товаров в интернет-магазине
- Загрузка профиля пользователя

**POST:**
- Отправка формы регистрации
- Загрузка файла на сервер

</details>

---

 Эти задачи помогут закрепить навыки работы с HTTP-запросами GET и POST в реальных сценариях! 