#  Стилизация компонентов в React Native
**React Native не использует CSS напрямую: стили описываются JavaScript‑объектами в camelCase, работают на нативных вью и опираются на Flexbox.**

---

##  Как RN поддерживает стили
- **JS‑объекты вместо CSS**: ключи в camelCase (`backgroundColor`, `marginTop`).
- **Ограниченный набор свойств**: поддерживаются layout‑свойства (Flexbox), типографика, отступы, позиции; нет глобальных селекторов, keyframes.
- **Единицы измерения**: независимые от плотности (dp). Нет `px`, `%`, `em`, `rem`.
- **Flexbox по умолчанию**: для построения макетов.

```jsx
const styles = {
  container: {
    backgroundColor: 'blue',
    marginTop: 10,
  },
};
```

---

##  Способы стилизации

###  StyleSheet.create (рекомендуется)
Кэширует стили и даёт лучшие perf‑характеристики.

```jsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Привет, React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    color: 'blue',
  },
});
```

###  Inline‑стили
Удобно для простых случаев, но не для повторяющихся/сложных.

```jsx
<View style={{ backgroundColor: 'red', padding: 10 }}>
  <Text style={{ fontSize: 16, color: 'white' }}>Привет, мир!</Text>
  </View>
```

###  Объединение стилей
Поздние элементы массива перекрывают ранние.

```jsx
<View style={[styles.container, { backgroundColor: 'blue' }]}>
  <Text style={[styles.text, additionalStyle]}>Объединенные стили</Text>
</View>

const additionalStyle = { fontWeight: 'bold' };
```

###  Динамические стили
Генерируются из props/state.

```jsx
function MyComponent({ isActive }) {
  return (
    <View style={[styles.box, isActive && styles.activeBox]}>
      <Text>Состояние: {isActive ? 'Активно' : 'Не активно'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 20, backgroundColor: 'gray' },
  activeBox: { backgroundColor: 'green' },
});
```

---

##  Вынесение стилей во внешний файл
Организуйте переиспользование и структуру.

```jsx
// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: 'blue' },
});

export default styles;
```

```jsx
// App.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Привет, стили!</Text>
    </View>
  );
}
```

---

##  Библиотеки для стилизации

###  Styled Components
CSS‑подобный синтаксис для RN (`styled-components/native`).

```jsx
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  color: blue;
`;

export default function App() {
  return (
    <Container>
      <Title>Привет, Styled Components!</Title>
    </Container>
  );
}
```

###  Tailwind‑подход (NativeWind)
Ускоряет разработку утилитарными классами Tailwind‑стиля.

```bash
npm install nativewind
```

```jsx
// Пример использования
import { Text, View } from 'react-native';

export function Card() {
  return (
    <View className="p-4 bg-white rounded-xl">
      <Text className="text-base font-semibold text-slate-800">Заголовок</Text>
      <Text className="text-slate-500 mt-1">Описание</Text>
    </View>
  );
}
```

> Анимации через CSS‑keyframes отсутствуют — используйте `Animated` или `react-native-reanimated`.

---

##  Итог
- Стили в RN — это JS‑объекты, применяемые к нативным вью, с упором на Flexbox.
- `StyleSheet.create` — базовый стандарт; inline — для простых случаев.
- Для декларативного подхода — `styled-components`; для утилитарного — `nativewind`.

##  ЗАДАЧИ
Задачи для практики: `StyleSheet`, объединение/динамика стилей, `styled-components`, `nativewind`

---

###  Задача 1: Перенесите inline‑стили в StyleSheet
У вас есть компонент с inline‑стилями. Перенесите их в `StyleSheet.create` и подключите.

<details>
<summary> Решение</summary>

```jsx
// До
export function InlineBox() {
  return <View style={{ padding: 12, backgroundColor: '#FEE2E2' }} />;
}

// После
import { StyleSheet, View } from 'react-native';
export function SheetBox() {
  return <View style={styles.box} />;
}
const styles = StyleSheet.create({ box: { padding: 12, backgroundColor: '#FEE2E2' } });
```

</details>

---

###  Задача 2: Объединение и переопределение стилей
Создайте базовый стиль кнопки и переопределяйте цвет через массив стилей.

<details>
<summary> Решение</summary>

```jsx
const styles = StyleSheet.create({
  button: { padding: 12, borderRadius: 8, backgroundColor: '#3B82F6' },
  label: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});

export function Button({ title, color = '#3B82F6' }) {
  return (
    <View style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.label}>{title}</Text>
    </View>
  );
}
```

</details>

---

###  Задача 3: Динамическая тема (светлая/тёмная)
Сделайте компонент, который меняет фон и текст в зависимости от темы.

<details>
<summary> Решение</summary>

```jsx
import React from 'react';
import { useColorScheme, View, Text, StyleSheet } from 'react-native';

export function ThemedCard() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <View style={[styles.card, isDark ? styles.dark : styles.light]}>
      <Text style={isDark ? styles.textDark : styles.textLight}>Тема: {scheme}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12 },
  light: { backgroundColor: '#FFFFFF' },
  dark: { backgroundColor: '#111827' },
  textLight: { color: '#111827' },
  textDark: { color: '#F9FAFB' },
});
```

</details>

---

###  Задача 4: Styled‑components версия карточки
Реализуйте тот же UI через `styled-components/native`.

<details>
<summary> Решение</summary>

```jsx
import styled from 'styled-components/native';

const Card = styled.View`
  padding: 16px;
  border-radius: 12px;
  background-color: #ffffff;
`;
const Title = styled.Text`
  font-size: 16px;
  color: #111827;
`;

export function StyledCard() {
  return (
    <Card>
      <Title>Styled Components</Title>
    </Card>
  );
}
```

</details>

---

###  Задача 5: Подключите NativeWind и соберите карточку
Установите `nativewind` и опишите карточку утилитарными классами.

<details>
<summary> Решение</summary>

```bash
npm install nativewind
```

```jsx
import { View, Text } from 'react-native';

export function TwCard() {
  return (
    <View className="p-4 rounded-xl bg-white">
      <Text className="text-slate-800 text-base font-semibold">Заголовок</Text>
      <Text className="text-slate-500 mt-1">Описание</Text>
    </View>
  );
}
```

</details>

---

 Эти задачи закрепят владение `StyleSheet`, объединением и динамикой стилей, а также альтернативными подходами (`styled-components`, `nativewind`).

---


