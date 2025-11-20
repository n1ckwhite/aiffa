#  Props в React

**Props (сокращение от "properties")** — это механизм передачи данных от родительского компонента к дочернему. Они являются неизменяемыми (read-only) и позволяют настраивать поведение или внешний вид компонентов.

---

##  Что такое props?

###  Основные характеристики:
- **Передача данных** — от родительского компонента к дочернему
- **Неизменяемость** — дочерний компонент не может изменять props
- **Односторонний поток** — данные идут только "сверху вниз"
- **Переиспользование** — компоненты становятся универсальными

###  Простой пример:
```jsx
function Greeting({ name }) {
  return <h1>Привет, {name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="Иван" />
      <Greeting name="Мария" />
    </div>
  );
}
```

---

##  Зачем нужны props?

###  1. Передача данных между компонентами
**Родитель передаёт данные дочернему компоненту.**

####  Пример:
```jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>Возраст: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

function App() {
  const user = { name: 'Иван', age: 30, email: 'ivan@example.com' };
  
  return <UserCard user={user} />;
}
```

###  2. Конфигурация компонентов
**Настройка внешнего вида и поведения.**

####  Пример:
```jsx
function Button({ variant, size, children, onClick }) {
  const buttonClass = `btn btn-${variant} btn-${size}`;
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  return (
    <div>
      <Button variant="primary" size="large" onClick={() => alert('Привет!')}>
        Большая кнопка
      </Button>
      <Button variant="secondary" size="small" onClick={() => console.log('Клик')}>
        Маленькая кнопка
      </Button>
    </div>
  );
}
```

###  3. Делегирование действий
**Передача функций для обработки событий.**

####  Пример:
```jsx
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Удалить</button>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить React', completed: false }
  ]);

  const handleToggle = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

---

##  Деструктуризация props

###  Упрощение работы с props:
```jsx
// Без деструктуризации
function UserProfile(props) {
  return (
    <div>
      <h2>{props.user.name}</h2>
      <p>{props.user.email}</p>
      <button onClick={props.onEdit}>Редактировать</button>
    </div>
  );
}

// С деструктуризацией
function UserProfile({ user, onEdit }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={onEdit}>Редактировать</button>
    </div>
  );
}
```

---

##  Значения по умолчанию

###  Установка fallback значений:
```jsx
// Используя логический оператор ||
function Greeting({ name }) {
  return <h1>Привет, {name || 'Гость'}!</h1>;
}

// Используя параметры по умолчанию
function Button({ variant = 'primary', size = 'medium', children }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
}

// Использование
<Greeting /> // "Привет, Гость!"
<Button>Нажми меня</Button> // variant="primary", size="medium"
```

---

##  Валидация props

###  PropTypes для проверки типов:
```jsx
import PropTypes from 'prop-types';

function UserCard({ user, onEdit, showActions }) {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>Возраст: {user.age}</p>
      {showActions && (
        <button onClick={onEdit}>Редактировать</button>
      )}
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

UserCard.defaultProps = {
  showActions: true
};
```

---

##  Передача всех props

###  Использование spread оператора:
```jsx
function Input({ label, ...inputProps }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input {...inputProps} />
    </div>
  );
}

function App() {
  return (
    <Input
      label="Email"
      type="email"
      placeholder="Введите email"
      required
      className="form-input"
    />
  );
}
```

---

##  Лучшие практики

###  Что делать:
- Используйте деструктуризацию для читаемости
- Устанавливайте значения по умолчанию
- Валидируйте props с PropTypes
- Передавайте только необходимые данные

###  Чего избегать:
- Изменения props в дочернем компоненте
- Передачи слишком много props
- Сложной логики в props
- Мутации объектов props

---

##  Итог

**Props** — это ключевой механизм React для передачи данных между компонентами. Они помогают создавать универсальные, переиспользуемые компоненты с чётким потоком данных.

Ключевые принципы:
- Props неизменяемы
- Данные идут только "сверху вниз"
- Используйте деструктуризацию
- Валидируйте типы данных

##  ЗАДАЧИ

Вот набор задач, чтобы лучше понять `props в React`:

---

###  Задача 1: Создание переиспользуемого компонента

 Создайте компонент Card, который принимает различные props для отображения разных типов контента.

```jsx
// Создайте компонент Card, который:
// - Принимает title, subtitle, content, image, actions
// - Поддерживает разные варианты (user, product, article)
// - Имеет настраиваемые стили
// - Показывает/скрывает элементы в зависимости от props
```

<details>
<summary> Решение</summary>

```jsx
import React from 'react';

function Card({ 
  title, 
  subtitle, 
  content, 
  image, 
  actions, 
  variant = 'default',
  className = '',
  showImage = true,
  showActions = true
}) {
  const cardClass = `card card-${variant} ${className}`;
  
  return (
    <div className={cardClass}>
      {showImage && image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
      
      <div className="card-body">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {content && <div className="card-content">{content}</div>}
      </div>
      
      {showActions && actions && actions.length > 0 && (
        <div className="card-actions">
          {actions.map((action, index) => (
            <button 
              key={index}
              className={`btn btn-${action.variant || 'primary'}`}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Использование для пользователя
<Card
  title="Иван Петров"
  subtitle="ivan@example.com"
  content={<p>Frontend разработчик</p>}
  image="/avatars/ivan.jpg"
  actions={[
    { label: 'Профиль', onClick: () => viewProfile(1) },
    { label: 'Сообщение', variant: 'secondary', onClick: () => sendMessage(1) }
  ]}
  variant="user"
/>

// Использование для продукта
<Card
  title="iPhone 15"
  subtitle="$999"
  content={<p>Новейший смартфон Apple</p>}
  image="/products/iphone.jpg"
  actions={[
    { label: 'Купить', onClick: () => addToCart(1) },
    { label: 'Подробнее', variant: 'outline', onClick: () => viewDetails(1) }
  ]}
  variant="product"
  showActions={true}
/>

// Использование для статьи
<Card
  title="Новые возможности React 18"
  subtitle="Автор: React Team"
  content={<p>React 18 приносит множество улучшений...</p>}
  variant="article"
  showImage={false}
  showActions={false}
/>
```

</details>

---

###  Задача 2: Создание компонента с условным рендерингом

 Создайте компонент Modal, который показывает/скрывает содержимое в зависимости от props.

```jsx
// Создайте компонент Modal, который:
// - Принимает isOpen, title, children, onClose
// - Показывает/скрывает модальное окно
// - Поддерживает разные размеры (small, medium, large)
// - Имеет настраиваемые кнопки действий
// - Закрывается по клику вне окна или по Escape
```

<details>
<summary> Вывод</summary>

```jsx
import React, { useEffect } from 'react';

function Modal({ 
  isOpen, 
  title, 
  children, 
  onClose, 
  size = 'medium',
  actions = [],
  closeOnEscape = true,
  closeOnOverlayClick = true
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const sizeClasses = {
    small: 'modal-small',
    medium: 'modal-medium',
    large: 'modal-large'
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal ${sizeClasses[size]}`}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
        
        {actions.length > 0 && (
          <div className="modal-actions">
            {actions.map((action, index) => (
              <button
                key={index}
                className={`btn btn-${action.variant || 'primary'}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Использование
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Открыть модальное окно
      </button>

      <Modal
        isOpen={isModalOpen}
        title="Подтверждение действия"
        size="medium"
        onClose={() => setIsModalOpen(false)}
        actions={[
          { label: 'Отмена', variant: 'secondary', onClick: () => setIsModalOpen(false) },
          { label: 'Подтвердить', variant: 'danger', onClick: () => {
            console.log('Действие подтверждено');
            setIsModalOpen(false);
          }}
        ]}
      >
        <p>Вы уверены, что хотите выполнить это действие?</p>
      </Modal>
    </div>
  );
}
```

</details>

---

###  Задача 3: Создание компонента с валидацией props

 Создайте компонент с PropTypes и defaultProps, который демонстрирует правильную валидацию.

```jsx
// Создайте компонент DataTable, который:
// - Принимает data (массив объектов), columns (конфигурация колонок)
// - Поддерживает сортировку, фильтрацию, пагинацию
// - Имеет PropTypes для валидации
// - Использует defaultProps для значений по умолчанию
// - Показывает сообщения об ошибках при неверных props
```

<details>
<summary> Решение</summary>

```jsx
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

function DataTable({ 
  data, 
  columns, 
  pageSize = 10,
  sortable = true,
  filterable = true,
  onRowClick,
  className = ''
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterValue, setFilterValue] = useState('');

  // Валидация данных
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="data-table-error">Нет данных для отображения</div>;
  }

  if (!Array.isArray(columns) || columns.length === 0) {
    return <div className="data-table-error">Не указаны колонки</div>;
  }

  // Фильтрация данных
  const filteredData = useMemo(() => {
    if (!filterable || !filterValue) return data;
    
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }, [data, filterValue, filterable]);

  // Сортировка данных
  const sortedData = useMemo(() => {
    if (!sortable || !sortField) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortDirection, sortable]);

  // Пагинация
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (field) => {
    if (!sortable) return;
    
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleRowClick = (row) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div className={`data-table ${className}`}>
      {filterable && (
        <div className="data-table-filter">
          <input
            type="text"
            placeholder="Фильтр..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
      )}

      <table className="data-table-content">
        <thead>
          <tr>
            {columns.map(column => (
              <th 
                key={column.key}
                onClick={() => handleSort(column.key)}
                className={sortable ? 'sortable' : ''}
              >
                {column.label}
                {sortable && sortField === column.key && (
                  <span className={`sort-arrow ${sortDirection}`}>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr 
              key={row.id || index}
              onClick={() => handleRowClick(row)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map(column => (
                <td key={column.key}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="data-table-pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Назад
          </button>
          <span>Страница {currentPage} из {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Вперёд
          </button>
        </div>
      )}
    </div>
  );
}

// PropTypes для валидации
DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    render: PropTypes.func
  })).isRequired,
  pageSize: PropTypes.number,
  sortable: PropTypes.bool,
  filterable: PropTypes.bool,
  onRowClick: PropTypes.func,
  className: PropTypes.string
};

// Значения по умолчанию
DataTable.defaultProps = {
  pageSize: 10,
  sortable: true,
  filterable: true,
  className: ''
};

// Использование
const columns = [
  { key: 'name', label: 'Имя' },
  { key: 'age', label: 'Возраст' },
  { key: 'email', label: 'Email' },
  { 
    key: 'status', 
    label: 'Статус',
    render: (value) => (
      <span className={`status status-${value}`}>
        {value}
      </span>
    )
  }
];

const data = [
  { id: 1, name: 'Иван', age: 30, email: 'ivan@example.com', status: 'active' },
  { id: 2, name: 'Мария', age: 25, email: 'maria@example.com', status: 'inactive' }
];

<DataTable
  data={data}
  columns={columns}
  pageSize={5}
  onRowClick={(row) => console.log('Клик по строке:', row)}
/>
```

</details>

---

 Эти задачи помогут понять принципы работы с props и научиться создавать гибкие, переиспользуемые компоненты.

---
