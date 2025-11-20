#  useEffect хук

**useEffect** — это один из встроенных хуков в React, который позволяет управлять побочными эффектами в функциональных компонентах. Побочные эффекты включают операции, которые не связаны напрямую с процессом рендеринга, такие как получение данных с сервера, подписка на события, изменение DOM и настройка таймеров.

---

##  Что такое useEffect?

###  Основные характеристики:
- **Управление побочными эффектами** — операции вне процесса рендеринга
- **Жизненный цикл** — аналог методов жизненного цикла в классовых компонентах
- **Очистка ресурсов** — предотвращение утечек памяти
- **Контроль выполнения** — через массив зависимостей

###  Базовый синтаксис:
```jsx
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Код эффекта
    console.log('Эффект выполнен');
    
    // Опциональная функция очистки
    return () => {
      console.log('Очистка эффекта');
    };
  }, [зависимости]); // Массив зависимостей

  return <div>Мой компонент</div>;
}
```

---

##  Типы использования useEffect

###  1. Выполнение после каждого рендера
**Эффект выполняется после каждого обновления компонента.**

####  Пример:
```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Компонент обновлен, count:', count);
  }); // Без массива зависимостей

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Увеличить
      </button>
    </div>
  );
}
```

###  2. Выполнение только при монтировании
**Эффект выполняется только один раз после первого рендера.**

####  Пример:
```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Компонент смонтирован');
    
    // Загрузка данных пользователя
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, []); // Пустой массив зависимостей

  if (!user) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

###  3. Выполнение при изменении зависимостей
**Эффект выполняется при изменении указанных зависимостей.**

####  Пример:
```jsx
import React, { useState, useEffect } from 'react';

function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    
    // Поиск по запросу
    fetch(`/api/search?q=${query}`)
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      });
  }, [query]); // Эффект выполнится при изменении query

  return (
    <div>
      {loading ? (
        <div>Поиск...</div>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

##  Очистка эффектов

###  Зачем нужна очистка?
**Очистка предотвращает утечки памяти и нежелательные побочные эффекты.**

###  Пример с таймером:
```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Функция очистки
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Выполняется только при монтировании

  return (
    <div>
      <h2>Таймер: {seconds} сек</h2>
    </div>
  );
}
```

###  Пример с подпиской на события:
```jsx
import React, { useState, useEffect } from 'react';

function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Очистка подписки
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <p>Ширина: {windowSize.width}px</p>
      <p>Высота: {windowSize.height}px</p>
    </div>
  );
}
```

---

##  Асинхронные операции в useEffect

###  Правильный способ работы с async/await:
**useEffect не поддерживает асинхронные функции напрямую.**

###  Хороший пример:
```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher({ url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

###  Плохой пример:
```jsx
//  Неправильно - useEffect не поддерживает async напрямую
useEffect(async () => {
  const data = await fetch('/api/data');
  setData(data);
}, []);
```

---

##  Множественные useEffect

###  Разделение логики:
**Используйте несколько useEffect для разделения различных побочных эффектов.**

####  Пример:
```jsx
import React, { useState, useEffect } from 'react';

function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState(false);

  // Эффект для загрузки данных пользователя
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [userId]);

  // Эффект для загрузки постов пользователя
  useEffect(() => {
    if (!userId) return;

    fetch(`/api/users/${userId}/posts`)
      .then(response => response.json())
      .then(data => setPosts(data));
  }, [userId]);

  // Эффект для отслеживания онлайн статуса
  useEffect(() => {
    const checkOnlineStatus = () => {
      setOnlineStatus(navigator.onLine);
    };

    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);

    return () => {
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
    };
  }, []);

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>Статус: {onlineStatus ? 'Онлайн' : 'Офлайн'}</p>
      <div>
        <h3>Посты:</h3>
        {posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
}
```

---

##  Предосторожности при использовании useEffect

###  **Частые ошибки:**

#### 1. Забывание массива зависимостей:
```jsx
//  Плохо - эффект выполняется при каждом рендере
useEffect(() => {
  console.log('Выполняется каждый раз');
});

//  Хорошо - эффект выполняется только при монтировании
useEffect(() => {
  console.log('Выполняется один раз');
}, []);
```

#### 2. Неполный массив зависимостей:
```jsx
//  Плохо - отсутствует count в зависимостях
useEffect(() => {
  document.title = `Счетчик: ${count}`;
}, []); // count не указан в зависимостях

//  Хорошо - count указан в зависимостях
useEffect(() => {
  document.title = `Счетчик: ${count}`;
}, [count]);
```

#### 3. Отсутствие очистки:
```jsx
//  Плохо - нет очистки таймера
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Таймер работает');
  }, 1000);
}, []);

//  Хорошо - есть очистка таймера
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Таймер работает');
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

#### 4. Бесконечные циклы:
```jsx
//  Плохо - бесконечный цикл
useEffect(() => {
  setCount(count + 1);
}, [count]); // count изменяется в эффекте

//  Хорошо - используйте функциональное обновление
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // или укажите правильные зависимости
```

---

##  Продвинутые паттерны

###  1. Кастомный хук для загрузки данных:
```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка загрузки');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Использование:
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

###  2. Эффект с отменой запроса:
```jsx
import { useState, useEffect } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    
    const searchData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal
        });
        
        const data = await response.json();
        setResults(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Ошибка поиска:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    searchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
      />
      {loading && <div>Поиск...</div>}
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

##  Итог

**useEffect** — мощный инструмент для управления побочными эффектами в функциональных компонентах.

**Ключевые принципы:**
- Всегда указывайте массив зависимостей
- Реализуйте очистку для предотвращения утечек памяти
- Используйте внутренние async функции для асинхронных операций
- Разделяйте логику на несколько useEffect
- Избегайте бесконечных циклов

##  ЗАДАЧИ

Задачи для практики: `useEffect хук`

---

###  Задача 1: Создайте компонент с таймером
Создайте компонент, который:
- Отображает текущее время
- Обновляется каждую секунду
- Останавливается при размонтировании компонента

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="clock">
      <h2>Текущее время:</h2>
      <p>{time.toLocaleTimeString()}</p>
      <p>{time.toLocaleDateString()}</p>
    </div>
  );
}

export default Clock;
```

</details>

---

###  Задача 2: Создайте компонент загрузки данных
Создайте компонент, который:
- Загружает список пользователей с API
- Показывает индикатор загрузки
- Обрабатывает ошибки
- Обновляется при изменении URL

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect } from 'react';

function UserList({ apiUrl }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        setUsers(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (apiUrl) {
      fetchUsers();
    }
  }, [apiUrl]);

  if (loading) {
    return <div className="loading">Загрузка пользователей...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="user-list">
      <h2>Список пользователей</h2>
      {users.length === 0 ? (
        <p>Пользователи не найдены</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id} className="user-item">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>Телефон: {user.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Использование:
function App() {
  const [currentApi, setCurrentApi] = useState('https://jsonplaceholder.typicode.com/users');

  return (
    <div className="app">
      <div className="controls">
        <button onClick={() => setCurrentApi('https://jsonplaceholder.typicode.com/users')}>
          Загрузить пользователей
        </button>
        <button onClick={() => setCurrentApi('https://jsonplaceholder.typicode.com/posts')}>
          Загрузить посты
        </button>
      </div>
      <UserList apiUrl={currentApi} />
    </div>
  );
}

export default App;
```

</details>

---

###  Задача 3: Создайте компонент отслеживания размера окна
Создайте компонент, который:
- Отслеживает размер окна браузера
- Показывает текущую ширину и высоту
- Обновляется при изменении размера
- Очищает подписку при размонтировании

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect } from 'react';

function WindowTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getScreenSize = () => {
    if (windowSize.width < 768) return 'Мобильный';
    if (windowSize.width < 1024) return 'Планшет';
    return 'Десктоп';
  };

  return (
    <div className="window-tracker">
      <h2>Информация о размере окна</h2>
      <div className="size-info">
        <p><strong>Ширина:</strong> {windowSize.width}px</p>
        <p><strong>Высота:</strong> {windowSize.height}px</p>
        <p><strong>Тип экрана:</strong> {getScreenSize()}</p>
      </div>
      
      <div className="visual-indicator">
        <div 
          className="size-bar"
          style={{ 
            width: `${Math.min(windowSize.width / 10, 100)}%`,
            height: `${Math.min(windowSize.height / 20, 100)}px`
          }}
        >
          Размер окна
        </div>
      </div>
    </div>
  );
}

export default WindowTracker;
```

</details>

---

###  Задача 4: Создайте компонент с локальным хранилищем
Создайте компонент, который:
- Сохраняет данные в localStorage
- Загружает данные при монтировании
- Синхронизируется с другими вкладками
- Очищает данные при размонтировании

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect } from 'react';

function LocalStorageComponent() {
  const [data, setData] = useState('');
  const [savedData, setSavedData] = useState('');

  // Загрузка данных при монтировании
  useEffect(() => {
    const saved = localStorage.getItem('userData');
    if (saved) {
      setSavedData(saved);
    }
  }, []);

  // Синхронизация с другими вкладками
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'userData') {
        setSavedData(e.newValue || '');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveData = () => {
    localStorage.setItem('userData', data);
    setSavedData(data);
    setData('');
  };

  const clearData = () => {
    localStorage.removeItem('userData');
    setSavedData('');
  };

  return (
    <div className="local-storage">
      <h2>Работа с localStorage</h2>
      
      <div className="input-section">
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Введите данные для сохранения"
        />
        <button onClick={saveData} disabled={!data.trim()}>
          Сохранить
        </button>
      </div>

      <div className="saved-section">
        <h3>Сохраненные данные:</h3>
        {savedData ? (
          <div className="saved-data">
            <p>{savedData}</p>
            <button onClick={clearData}>Очистить</button>
          </div>
        ) : (
          <p>Нет сохраненных данных</p>
        )}
      </div>

      <div className="info">
        <p><strong>Инструкция:</strong></p>
        <ul>
          <li>Введите текст и нажмите "Сохранить"</li>
          <li>Данные сохранятся в localStorage</li>
          <li>Откройте другую вкладку для проверки синхронизации</li>
          <li>Измените данные в другой вкладке - они обновятся здесь</li>
        </ul>
      </div>
    </div>
  );
}

export default LocalStorageComponent;
```

</details>

---

###  Задача 5: Создайте компонент с debounced поиском
Создайте компонент поиска, который:
- Выполняет поиск с задержкой (debounce)
- Отменяет предыдущие запросы
- Показывает индикатор загрузки
- Обрабатывает ошибки

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useEffect, useRef } from 'react';

function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Очищаем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Устанавливаем новый таймер
    timeoutRef.current = setTimeout(async () => {
      try {
        // Имитация API запроса
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`);
        
        if (!response.ok) {
          throw new Error('Ошибка поиска');
        }
        
        const data = await response.json();
        setResults(data.slice(0, 5)); // Ограничиваем результаты
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500); // Задержка 500мс

    // Очистка таймера при размонтировании
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);

  return (
    <div className="debounced-search">
      <h2>Поиск с задержкой</h2>
      
      <div className="search-input">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите запрос для поиска..."
        />
        {loading && <span className="loading-indicator">⏳</span>}
      </div>

      {error && (
        <div className="error">
          Ошибка: {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="results">
          <h3>Результаты поиска:</h3>
          <ul>
            {results.map(result => (
              <li key={result.id} className="result-item">
                <h4>{result.title}</h4>
                <p>{result.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {query && !loading && results.length === 0 && !error && (
        <div className="no-results">
          По запросу "{query}" ничего не найдено
        </div>
      )}
    </div>
  );
}

export default DebouncedSearch;
```

</details>

---

###  Задача 6: Создайте кастомный хук useLocalStorage
Создайте кастомный хук, который:
- Синхронизирует состояние с localStorage
- Обрабатывает ошибки сериализации
- Поддерживает значения по умолчанию
- Синхронизируется между вкладками

<details>
<summary> Решение</summary>

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Ошибка чтения localStorage ключа "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
    }
  }, [key, value]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Ошибка парсинга localStorage ключа "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [value, setValue];
}

// Компонент для демонстрации хука
function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [settings, setSettings] = useLocalStorage('userSettings', {
    notifications: true,
    language: 'ru',
    fontSize: 14
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="local-storage-demo">
      <h2>Демонстрация useLocalStorage</h2>
      
      <div className="form-section">
        <div className="field">
          <label>
            Имя пользователя:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
            />
          </label>
        </div>

        <div className="field">
          <label>
            Тема:
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Светлая</option>
              <option value="dark">Темная</option>
              <option value="auto">Авто</option>
            </select>
          </label>
        </div>

        <div className="field">
          <label>
            Уведомления:
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => updateSetting('notifications', e.target.checked)}
            />
          </label>
        </div>

        <div className="field">
          <label>
            Язык:
            <select 
              value={settings.language} 
              onChange={(e) => updateSetting('language', e.target.value)}
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </label>
        </div>

        <div className="field">
          <label>
            Размер шрифта: {settings.fontSize}px
            <input
              type="range"
              min="12"
              max="24"
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div className="current-values">
        <h3>Текущие значения:</h3>
        <pre>{JSON.stringify({ name, theme, settings }, null, 2)}</pre>
      </div>

      <div className="instructions">
        <h3>Инструкции:</h3>
        <ul>
          <li>Измените любые значения выше</li>
          <li>Обновите страницу - данные сохранятся</li>
          <li>Откройте новую вкладку - данные синхронизируются</li>
          <li>Измените данные в другой вкладке - они обновятся здесь</li>
        </ul>
      </div>
    </div>
  );
}

export default LocalStorageDemo;
```

</details>

---

 Эти задачи помогут освоить различные аспекты использования useEffect и управления побочными эффектами в React!

---
