#  Пользовательские хуки (Custom Hooks)

**Пользовательские хуки (Custom Hooks)** — это функции, которые позволяют переиспользовать логику состояния или побочных эффектов в разных компонентах. Это обычные JavaScript-функции, которые используют встроенные хуки React для инкапсуляции логики, делая код более читаемым, модульным и удобным для тестирования.

---

##  Что такое пользовательские хуки?

###  Основные характеристики:
- **Переиспользование логики** — одна логика в разных компонентах
- **Инкапсуляция** — скрытие сложной логики внутри хука
- **Читаемость** — упрощение компонентов
- **Тестируемость** — легче тестировать изолированную логику

###  Базовый синтаксис:
```jsx
import { useState, useEffect } from 'react';

function useCustomHook(initialValue) {
  // Используем встроенные хуки
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Логика эффекта
  }, []);

  // Возвращаем значения для использования в компонентах
  return [state, setState];
}

// Использование в компоненте:
function MyComponent() {
  const [value, setValue] = useCustomHook('начальное значение');
  
  return <div>{value}</div>;
}
```

---

##  Правила создания пользовательских хуков

###  1. Именование
**Все пользовательские хуки должны начинаться с префикса `use`.**

####  Пример:
```jsx
//  Правильно
function useCounter() { /* ... */ }
function useLocalStorage() { /* ... */ }
function useApi() { /* ... */ }

//  Неправильно
function counter() { /* ... */ }
function localStorage() { /* ... */ }
function api() { /* ... */ }
```

###  2. Соблюдение правил хуков
**Пользовательские хуки должны следовать тем же правилам, что и встроенные хуки.**

####  Правила:
- Вызывайте хуки только на верхнем уровне
- Не вызывайте хуки внутри циклов, условий или вложенных функций
- Вызывайте хуки только в React-компонентах или других хуках

```jsx
//  Правильно
function useCounter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // логика
  }, []);
  
  return [count, setCount];
}

//  Неправильно
function useCounter() {
  if (someCondition) {
    const [count, setCount] = useState(0); // Ошибка!
  }
  
  return [count, setCount];
}
```

---

##  Примеры пользовательских хуков

###  1. Хук для работы с размером окна
**Отслеживает изменения размера окна браузера.**

####  Реализация:
```jsx
import { useState, useEffect } from 'react';

function useWindowSize() {
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

  return windowSize;
}

// Использование:
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <h2>Размер окна</h2>
      <p>Ширина: {width}px</p>
      <p>Высота: {height}px</p>
      <p>Тип: {width < 768 ? 'Мобильный' : 'Десктоп'}</p>
    </div>
  );
}
```

###  2. Хук для работы с API
**Упрощает загрузку данных с сервера.**

####  Реализация:
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
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
}

// Использование:
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Загрузка пользователей...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

###  3. Хук для работы с localStorage
**Синхронизирует состояние с локальным хранилищем.**

####  Реализация:
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

  return [value, setValue];
}

// Использование:
function SettingsComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'ru');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Светлая тема</option>
        <option value="dark">Темная тема</option>
      </select>
      
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
```

---

##  Когда использовать пользовательские хуки?

###  **Подходящие случаи:**
- **Повторяющаяся логика** — одна логика в нескольких компонентах
- **Сложные эффекты** — много кода в useEffect
- **Управление состоянием** — сложная логика состояния
- **Работа с API** — стандартные паттерны загрузки данных
- **Формы** — валидация и обработка ввода

###  **Неподходящие случаи:**
- **Простая логика** — если логика используется только в одном месте
- **UI-логика** — логика, связанная с отображением
- **Бизнес-логика** — сложная бизнес-логика лучше в отдельных модулях

---

##  Продвинутые паттерны

###  1. Хук с параметрами и опциями
**Гибкий хук с настройками.**

####  Пример:
```jsx
import { useState, useEffect } from 'react';

function useApi(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body = null,
    immediate = true
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (customOptions = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...customOptions.headers
        },
        body: body ? JSON.stringify(body) : customOptions.body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [url, immediate]);

  return { data, loading, error, execute };
}

// Использование:
function ApiComponent() {
  const { data, loading, error, execute } = useApi('/api/users', {
    immediate: false
  });

  const handleRefresh = () => {
    execute();
  };

  return (
    <div>
      <button onClick={handleRefresh} disabled={loading}>
        {loading ? 'Загрузка...' : 'Обновить'}
      </button>
      {error && <div>Ошибка: {error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

###  2. Композиция хуков
**Объединение нескольких хуков в один.**

####  Пример:
```jsx
import { useState, useEffect } from 'react';

function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

function useTimer(initialTime = 0) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  return { time, isRunning, start, stop, reset };
}

// Композиция хуков
function useGame() {
  const counter = useCounter(0, 1);
  const timer = useTimer(0);

  const startGame = () => {
    counter.reset();
    timer.reset();
    timer.start();
  };

  const endGame = () => {
    timer.stop();
  };

  return {
    score: counter.count,
    time: timer.time,
    isRunning: timer.isRunning,
    incrementScore: counter.increment,
    startGame,
    endGame
  };
}

// Использование:
function GameComponent() {
  const { score, time, isRunning, incrementScore, startGame, endGame } = useGame();

  return (
    <div>
      <h2>Игра</h2>
      <p>Счет: {score}</p>
      <p>Время: {time}с</p>
      <p>Статус: {isRunning ? 'Игра идет' : 'Игра остановлена'}</p>
      
      <button onClick={startGame} disabled={isRunning}>
        Начать игру
      </button>
      <button onClick={incrementScore} disabled={!isRunning}>
        Увеличить счет
      </button>
      <button onClick={endGame} disabled={!isRunning}>
        Завершить игру
      </button>
    </div>
  );
}
```

---

##  Тестирование пользовательских хуков

###  Использование @testing-library/react-hooks:
```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test('should reset counter', () => {
  const { result } = renderHook(() => useCounter(5));

  act(() => {
    result.current.increment();
    result.current.reset();
  });

  expect(result.current.count).toBe(5);
});
```

---

##  Итог

**Пользовательские хуки** — мощный инструмент для переиспользования логики в React.

**Ключевые принципы:**
- Начинайте название с `use`
- Соблюдайте правила хуков
- Инкапсулируйте сложную логику
- Делайте хуки переиспользуемыми
- Тестируйте изолированно

---

##  ЗАДАЧИ

Задачи для практики: `пользовательские хуки (Custom Hooks)`

---

###  Задача 1: Создайте хук useToggle
Создайте пользовательский хук, который:
- Переключает булево значение между true и false
- Принимает начальное значение
- Возвращает текущее значение и функцию переключения

<details>
<summary> Решение</summary>

```jsx
import { useState } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, { toggle, setTrue, setFalse }];
}

// Использование:
function ToggleComponent() {
  const [isVisible, { toggle, setTrue, setFalse }] = useToggle(false);

  return (
    <div className="toggle-component">
      <h2>Демонстрация useToggle</h2>
      
      <div className="controls">
        <button onClick={toggle}>
          {isVisible ? 'Скрыть' : 'Показать'}
        </button>
        <button onClick={setTrue}>Показать</button>
        <button onClick={setFalse}>Скрыть</button>
      </div>

      {isVisible && (
        <div className="content">
          <h3>Скрытый контент</h3>
          <p>Этот контент виден только когда isVisible = true</p>
        </div>
      )}

      <div className="status">
        <p>Статус: {isVisible ? 'Видимый' : 'Скрытый'}</p>
      </div>
    </div>
  );
}

export default ToggleComponent;
```

</details>

---

###  Задача 2: Создайте хук useDebounce
Создайте хук, который:
- Задерживает обновление значения на указанное время
- Полезен для поиска и валидации
- Принимает значение и задержку в миллисекундах

<details>
<summary> Решение</summary>

```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Использование:
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Выполняется поиск по:', debouncedSearchTerm);
      // Здесь можно выполнить API запрос
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="search-component">
      <h2>Поиск с задержкой</h2>
      
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Введите поисковый запрос..."
      />
      
      <div className="info">
        <p>Текущий ввод: <strong>{searchTerm}</strong></p>
        <p>Поиск выполнится по: <strong>{debouncedSearchTerm}</strong></p>
        <p>Задержка: 500мс</p>
      </div>

      {debouncedSearchTerm && (
        <div className="search-results">
          <p>Результаты поиска для: "{debouncedSearchTerm}"</p>
          {/* Здесь будут отображаться результаты поиска */}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
```

</details>

---

###  Задача 3: Создайте хук useForm
Создайте хук для управления формой, который:
- Управляет состоянием полей формы
- Валидирует данные
- Обрабатывает отправку формы
- Поддерживает сброс формы

<details>
<summary> Решение</summary>

```jsx
import { useState, useCallback } from 'react';

function useForm(initialValues = {}, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Очищаем ошибку при изменении значения
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateField = useCallback((name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    if (rule.required && (!value || value.trim() === '')) {
      return rule.required;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return rule.minLength;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.pattern;
    }

    if (rule.custom && typeof rule.custom === 'function') {
      return rule.custom(value);
    }

    return '';
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValue(name, fieldValue);
  }, [setValue]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setFieldTouched(name);
    
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [setFieldTouched, validateField, values]);

  const handleSubmit = useCallback((onSubmit) => (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(values);
    }
  }, [validateForm, values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateForm,
    isValid: Object.keys(errors).length === 0
  };
}

// Использование:
function ContactForm() {
  const validationRules = {
    name: {
      required: 'Имя обязательно',
      minLength: 'Имя должно содержать минимум 2 символа'
    },
    email: {
      required: 'Email обязателен',
      pattern: {
        test: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Некорректный email'
      }
    },
    phone: {
      required: 'Телефон обязателен',
      pattern: {
        test: /^\+?[\d\s\-\(\)]+$/,
        message: 'Некорректный номер телефона'
      }
    },
    message: {
      required: 'Сообщение обязательно',
      minLength: 'Сообщение должно содержать минимум 10 символов'
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid
  } = useForm({
    name: '',
    email: '',
    phone: '',
    message: ''
  }, validationRules);

  const onSubmit = (formData) => {
    console.log('Отправка формы:', formData);
    alert('Форма успешно отправлена!');
    resetForm();
  };

  return (
    <div className="contact-form">
      <h2>Форма обратной связи</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.name && errors.name ? 'error' : ''}
          />
          {touched.name && errors.name && (
            <span className="error-message">{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.email && errors.email ? 'error' : ''}
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.phone && errors.phone ? 'error' : ''}
          />
          {touched.phone && errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Сообщение:</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="4"
            className={touched.message && errors.message ? 'error' : ''}
          />
          {touched.message && errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={!isValid}>
            Отправить
          </button>
          <button type="button" onClick={resetForm}>
            Сбросить
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
```

</details>

---

###  Задача 4: Создайте хук useOnlineStatus
Создайте хук, который:
- Отслеживает статус подключения к интернету
- Обновляется при изменении статуса
- Предоставляет информацию о типе соединения

<details>
<summary> Решение</summary>

```jsx
import { useState, useEffect } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState('unknown');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Отслеживание изменений статуса подключения
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Получение информации о типе соединения
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setConnectionType(connection.effectiveType || 'unknown');

      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType || 'unknown');
      };

      connection.addEventListener('change', handleConnectionChange);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getConnectionInfo = () => {
    if (!isOnline) return 'Нет подключения';
    
    if ('connection' in navigator) {
      const connection = navigator.connection;
      return {
        type: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 'unknown',
        rtt: connection.rtt || 'unknown',
        saveData: connection.saveData || false
      };
    }
    
    return 'Подключение есть, детали недоступны';
  };

  return {
    isOnline,
    connectionType,
    connectionInfo: getConnectionInfo()
  };
}

// Использование:
function NetworkStatus() {
  const { isOnline, connectionType, connectionInfo } = useOnlineStatus();

  return (
    <div className="network-status">
      <h2>Статус сети</h2>
      
      <div className="status-indicator">
        <div className={`status-dot ${isOnline ? 'online' : 'offline'}`}></div>
        <span className="status-text">
          {isOnline ? 'Онлайн' : 'Офлайн'}
        </span>
      </div>

      {isOnline && (
        <div className="connection-details">
          <h3>Детали подключения:</h3>
          <div className="details-grid">
            <div className="detail-item">
              <strong>Тип соединения:</strong>
              <span>{connectionType}</span>
            </div>
            
            {typeof connectionInfo === 'object' && (
              <>
                <div className="detail-item">
                  <strong>Скорость загрузки:</strong>
                  <span>{connectionInfo.downlink} Mbps</span>
                </div>
                
                <div className="detail-item">
                  <strong>Задержка (RTT):</strong>
                  <span>{connectionInfo.rtt} ms</span>
                </div>
                
                <div className="detail-item">
                  <strong>Режим экономии:</strong>
                  <span>{connectionInfo.saveData ? 'Включен' : 'Выключен'}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="status-message">
        {isOnline ? (
          <p className="success"> Подключение к интернету активно</p>
        ) : (
          <p className="error"> Нет подключения к интернету</p>
        )}
      </div>

      <div className="instructions">
        <h3>Инструкции для тестирования:</h3>
        <ul>
          <li>Отключите интернет в настройках браузера</li>
          <li>Включите режим "В самолете" на устройстве</li>
          <li>Отключите Wi-Fi или мобильные данные</li>
          <li>Статус должен обновиться автоматически</li>
        </ul>
      </div>
    </div>
  );
}

export default NetworkStatus;
```

</details>

---

 Эти задачи помогут освоить создание и использование пользовательских хуков в React!

---
