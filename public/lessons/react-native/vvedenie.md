#  Введение в React Native

**React Native** — это фреймворк от Meta для создания нативных мобильных приложений под iOS и Android с использованием JavaScript и React. Вы пишете на React-компонентах, а под капотом они конвертируются в нативные элементы платформы.

---

##  Почему React Native?

- **Единая кодовая база**: один проект — два приложения (iOS и Android)
- **Нативный UI**: компоненты отображаются как настоящие нативные элементы
- **Горячая перезагрузка (Fast Refresh)**: мгновенный отклик при разработке
- **Большая экосистема**: тысячи библиотек и активное сообщество
- **Интеграция с нативом**: мост к Swift/Objective‑C/Java/Kotlin при необходимости

---

##  Как это работает?

- Вы пишете компоненты на React (`View`, `Text`, `Image`, `Pressable`)
- RN-бандлер (Metro) собирает JS-код
- **JS-бизнес-логика** общается с **нативным слоем** через мост (JSI/Fabric)
- UI рендерится нативными элементами платформы, без WebView

---

##  Основные блоки

- **Компоненты UI**: `View`, `Text`, `Image`, `ScrollView`, `FlatList`
- **Стиль**: объектный стиль, похожий на CSS (`StyleSheet.create`), единицы — числа (dp)
- **Навигация**: `react-navigation` (stack/tab/drawer)
- **Сеть**: `fetch`, `axios`
- **Хранение**: AsyncStorage/SQLite/SecureStore
- **Платформа**: `Platform`, `Permissions`, `Linking`, `Appearance`

---

##  Старт проекта

1. Установите окружение (Xcode/Android Studio, Node.js, JDK)
2. Создайте проект:
   - Expo: `npx create-expo-app@latest MyApp`
   - CLI: `npx react-native@latest init MyApp`
3. Запуск:
   - Expo: `npx expo start`
   - CLI: `npx react-native run-ios` / `run-android`

---

##  Мини-пример

```jsx
import React from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Привет, React Native!</Text>
        <Pressable style={styles.button} onPress={() => console.log('Нажали')}>
          <Text style={styles.buttonText}>Нажми меня</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' },
  card: { padding: 24, borderRadius: 12, backgroundColor: '#1f2937' },
  title: { color: '#fff', fontSize: 20, marginBottom: 12 },
  button: { backgroundColor: '#3b82f6', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' }
});
```

---

##  Expo или React Native CLI?

- **Expo**: быстрый старт, OTA‑обновления, много модулей из коробки (камеры, гео, push); ограничения при нативных кастомизациях
- **CLI**: полный контроль над нативом, любые нативные модули; выше порог входа, настройка окружения

Выбор: начинайте с Expo. Нужен нативный код/обвод ограничений — переходите на bare/CLI.

---

##  Лучшие практики

- Дизайн под разные экраны: `SafeAreaView`, `useWindowDimensions`, адаптивные отступы
- Производительность: `FlatList`/`SectionList`, мемоизация, избегайте тяжёлых inline‑функций
- Навигация: типизируйте маршруты, выносите экраны в отдельные модули
- Доступность: `accessibilityLabel`, `accessible`, `role`
- Сборки: разделяйте dev/prod-конфиги, подписи, иконки/сплэши

---

##  Итог

**React Native** объединяет React и нативные платформы, давая быстрый цикл разработки и нативный UX. Начните с Expo, освоите базовые компоненты и стили, затем подключайте навигацию и платформенные возможности.

---