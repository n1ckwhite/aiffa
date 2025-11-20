#  React Native и React.js: сходства и различия
**React Native построен на React: они разделяют парадигму компонентов, JSX и подход к состоянию, но рендерят в разные среды.**

---

##  Как связаны React Native и React
- React Native использует ядро React (компоненты, props, state, хуки) для описания UI, но выводит интерфейс в нативные элементы iOS/Android.
- Архитектура и паттерны (композиция, однонаправленный поток данных, управление состоянием) общие; отличается слой рендеринга и платформенные API.

---

##  Сходства
- **Библиотека React**: компоненты, `props`, `state`, хуки (`useState`, `useEffect`, `useMemo`, и т.д.).
- **Компонентный подход**: переиспользуемые композиции компонентов и проп-дриллинг/контекст.
- **JSX**: декларативное описание UI в JavaScript/TypeScript.
- **Экосистема**: управление состоянием (Redux, Zustand, MobX), тестирование (Jest), менеджеры пакетов (npm, Yarn), линтинг и форматирование.
- **Архитектурные принципы**: однонаправленный поток данных, разделение UI и бизнес-логики, хуки и кастомные хуки.

---

##  Различия
- **Целевая платформа**:
  - React.js: веб-приложения в браузере.
  - React Native: мобильные приложения iOS/Android с нативным UI.

- **Рендеринг интерфейса**:
  - React.js: DOM (`div`, `span` и т.д.).
  - React Native: нативные компоненты (`View`, `Text`, `Image`) через платформенные UI-слои.

- **Компоненты и стили**:
  - React.js: CSS/SCSS, CSS-in-JS, классы и каскад.
  - React Native: `StyleSheet` и объектные стили; единицы независимы от плотности экрана, нет каскада/селекторов как в CSS.

- **Навигация**:
  - React.js: `react-router-dom`.
  - React Native: `@react-navigation/*`, `react-native-navigation`.

- **Платформенные API**:
  - React.js: доступ к браузерным API (`window`, `document`).
  - React Native: доступ к возможностям устройства через нативные модули (камера, геолокация, Bluetooth), нет `window/document`.

- **Сборка и поставка**:
  - React.js: веб-сборщики (Vite, Webpack), деплой на CDN/хостинг.
  - React Native: сборки через Xcode/Android Studio, публикация в App Store/Google Play.

- **SSR и рендеринг на сервере**:
  - React.js: полноценный SSR/SSG (Next.js).
  - React Native: классического SSR для мобильного UI нет; есть `react-native-web` для веб-рендеринга RN-компонентов.

- **Переиспользование кода**:
  - Общая бизнес-логика, хуки, валидаторы, сетевые слои часто разделяются.
  - UI-компоненты обычно различаются (DOM vs нативные виджеты).

---

##  Примеры

###  Простой компонент: Web vs Native
```jsx
// React (Web)
import React from 'react';

export function HelloWeb() {
  return <div className="hello">Привет, веб!</div>;
}
```

```jsx
// React Native (iOS/Android)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HelloNative() {
  return (
    <View style={styles.container}>
      <Text>Привет, натив!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
});
```

###  Навигация: Web vs Native
```jsx
// React Router (Web)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function AppWeb() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

```jsx
// React Navigation (Native)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function AppNative() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

##  Итог
- **React.js** — для веба (DOM, браузерные API, веб-сборки).
- **React Native** — для мобильных платформ (нативные компоненты, платформенные API, мобильные сборки).
- Парадигма React одинакова; различается слой рендеринга и интеграции с платформой. Разработчикам на React проще перейти к React Native.

##  ЗАДАЧИ

Задачи по теме `React Native и React.js`

---

###  Задача 1: Перепишите веб-компонент под React Native
- Возьмите простой компонент React (веб) и перенесите его в React Native с `View`, `Text`, `StyleSheet`.
- Замените классы CSS на объектные стили.

<details>
<summary> Решение</summary>

```jsx
// Исходник (Web)
export function Title({ text }) {
  return <h1 className="title">{text}</h1>;
}

// React Native
import { Text, StyleSheet } from 'react-native';
export function TitleNative({ text }) {
  return <Text style={styles.title}>{text}</Text>;
}
const styles = StyleSheet.create({ title: { fontSize: 24, fontWeight: '600' } });
```

</details>

---

###  Задача 2: Настройте навигацию в React Native
- Установите и настройте `@react-navigation/native` и `@react-navigation/native-stack`.
- Создайте два экрана и переход между ними с параметрами.

<details>
<summary> Решение</summary>

```bash
npm install @react-navigation/native @react-navigation/native-stack
```

```jsx
// Минимальная конфигурация Stack Navigator
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
</NavigationContainer>
```

</details>

---

###  Задача 3: Вынесите общую бизнес-логику в хуки
- Создайте общий хук (например, `useCounter`) и используйте его в React (веб) и React Native.
- Покажите, что UI различается, а логика переиспользуется.

<details>
<summary> Решение</summary>

```jsx
// shared/useCounter.js
import { useState, useCallback } from 'react';
export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const inc = useCallback(() => setCount(c => c + 1), []);
  const dec = useCallback(() => setCount(c => c - 1), []);
  return { count, inc, dec };
}
```

</details>

---

 Эти задачи помогут вам закрепить различия Web vs Native, настроить навигацию в React Native и отработать переиспользование общей бизнес-логики через хуки для ускорения кроссплатформенной разработки.

---