#  Обработка различий между iOS и Android в React Native
**React Native предоставляет набор механизмов для адаптации UI и логики под iOS и Android: платформо-специфичные компоненты и API, условный рендеринг, разделение исходников по платформам, а также доступ к нативным модулям.**

---

##  Подход React Native к различиям платформ
- Ключевая идея — общий JavaScript‑слой с возможностью ветвления под платформы там, где это действительно нужно.
- Различия изолируются через `Platform`, `Platform.select`, файловые суффиксы (`.ios.js`/`.android.js`), а также через нативные модули/вью.

---

##  Компоненты и API, специфичные для платформ
- **iOS‑специфичные**:
  - `ActionSheetIOS` — системные Action Sheets
  - Устар.: `DatePickerIOS` (в новых версиях — кроссплатформенные решения)
- **Android‑специфичные**:
  - `ToastAndroid` — тост‑уведомления
  - `DrawerLayoutAndroid` — боковая панель (drawer)
- **Общие компоненты с разным поведением**: например, `Modal`, `Picker` могут отличаться UX на платформах.

```jsx
// Пример: тост только на Android
import { Platform, Button, ToastAndroid, Alert } from 'react-native';

export function ToastButton() {
  const onPress = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Hello from Android', ToastAndroid.SHORT);
    } else {
      Alert.alert('Hello from iOS');
    }
  };
  return <Button title="Say hi" onPress={onPress} />;
}
```

---

##  Условный рендеринг и стилизация (Platform, Platform.select)
- `Platform.OS` для простых веток.
- `Platform.select` для декларативного выбора стилей/значений.

```jsx
import { Platform, Text, View, StyleSheet } from 'react-native';

export function PlatformCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {Platform.OS === 'ios' ? 'Это iOS' : 'Это Android'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: Platform.select({
    ios: { padding: 16, backgroundColor: '#F3F4F6' },
    android: { padding: 16, backgroundColor: '#E5E7EB', elevation: 2 },
  }),
  title: Platform.select({
    ios: { fontSize: 18, fontWeight: '600' },
    android: { fontSize: 18, fontFamily: 'sans-serif-medium' },
  }),
});
```

---

##  Разделение кода по платформам (файловые суффиксы)
- Создайте `Component.ios.js` и `Component.android.js` — импорт без условий подхватит нужный файл.

```jsx
// Component.ios.js
export default function Component() { return null; /* iOS-версия */ }

// Component.android.js
export default function Component() { return null; /* Android-версия */ }

// usage.js
import Component from './Component';
```

---

##  Стили и дизайн: HIG vs Material
- iOS: следуйте Human Interface Guidelines (минимализм, плавные анимации, системные паттерны).
- Android: Material Design (карточки, тени, ripple‑эффекты, плавающие кнопки).
- Единицы RN независимы от плотности; для тонкой настройки:
  - `Dimensions` — размеры экрана
  - `PixelRatio` — работа с плотностью пикселей

```jsx
import { Dimensions, PixelRatio } from 'react-native';
const { width } = Dimensions.get('window');
const size = Math.min(24, PixelRatio.getFontScale() * 16);
```

---

##  Библиотеки, скрывающие платформенные различия
- Навигация: `@react-navigation/*` — кроссплатформенная, учитывает нативные паттерны.
- Жесты/анимации: `react-native-gesture-handler`, `react-native-reanimated`.
- Инфо об устройстве: `react-native-device-info`.

---

##  Доступ к нативным модулям
- Если экосистема не закрывает кейс: пишем нативные модули/вью для iOS/Android и предоставляем JS‑API.
- В современной архитектуре используем TurboModules/Fabric для меньшей латентности и типобезопасности.

---

##  Итог
- В RN различия платформ решаются адресно: от легкого `Platform.select` до изолированных `.ios/.android` исходников и нативных модулей.
- Дизайн и UX учитывают HIG (iOS) и Material (Android); метрики экрана учитываются через `Dimensions`/`PixelRatio`.
- Экосистема библиотек и современная архитектура (JSI/TurboModules/Fabric) снижают «стоимость различий» и ускоряют разработку.

##  ЗАДАЧИ
Задачи для практики: `Platform API, файловые суффиксы, дизайн‑паттерны, нативные API`

---

###  Задача 1: Платформо‑специфичный компонент
Сделайте компонент `PlatformButton`, который:
- На iOS рендерит `UIButton`‑стиль (скругления, system blue),
- На Android — кнопку с `ripple` и `elevation`.

<details>
<summary> Решение</summary>

```jsx
import React from 'react';
import { Platform, Pressable, Text, StyleSheet } from 'react-native';

export function PlatformButton({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#00000022' }}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
    >
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: Platform.select({
    ios: { backgroundColor: '#0A84FF', padding: 12, borderRadius: 12 },
    android: { backgroundColor: '#2196F3', padding: 12, borderRadius: 6, elevation: 2 },
  }),
  pressed: Platform.select({ ios: { opacity: 0.8 }, android: {} }),
  label: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
```

</details>

---

###  Задача 2: Разделение исходников по платформам
Создайте `DatePicker.ios.js` и `DatePicker.android.js`, чтобы обеспечить нативный UX.

<details>
<summary> Решение</summary>

```jsx
// DatePicker.ios.js — используйте DatePickerIOS или community‑компонент
export default function DatePicker(props) { /* iOS реализация */ return null; }

// DatePicker.android.js — используйте DatePickerAndroid/комьюнити пакеты
export default function DatePicker(props) { /* Android реализация */ return null; }

// usage
import DatePicker from './DatePicker';
```

</details>

---

###  Задача 3: Стили через Platform.select
Соберите карточку с разным визуалом под HIG и Material.

<details>
<summary> Решение</summary>

```jsx
import { Platform, View, Text, StyleSheet } from 'react-native';

export function InfoCard({ title, subtitle }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: Platform.select({
    ios: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 },
    android: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 6, elevation: 3 },
  }),
  title: Platform.select({ ios: { fontSize: 18, fontWeight: '600' }, android: { fontSize: 18, fontFamily: 'sans-serif-medium' } }),
  subtitle: { color: '#6B7280', marginTop: 4 },
});
```

</details>

---

###  Задача 4: Доступ к нативным API по‑разному
Покажите тост на Android и алерт на iOS через единую функцию `notify(message)`.

<details>
<summary> Решение</summary>

```jsx
import { Platform, ToastAndroid, Alert } from 'react-native';
export function notify(message) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert('Notice', message);
  }
}
```

</details>

---

###  Задача 5: Адаптация под экран и плотность
Постройте сетку карточек, которая на маленьких экранах показывает 2 колонки, на больших — 3, учитывая `PixelRatio`.

<details>
<summary> Решение</summary>

```jsx
import { Dimensions, PixelRatio } from 'react-native';
const { width } = Dimensions.get('window');
const ratio = PixelRatio.get();
const columns = width * ratio > 1500 ? 3 : 2;
```

</details>

---

 Эти задачи помогут закрепить приёмы платформенной адаптации: от условного рендеринга до раздельных исходников и нативных API.

---
