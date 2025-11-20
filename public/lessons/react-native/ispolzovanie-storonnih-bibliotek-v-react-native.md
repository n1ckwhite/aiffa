#  Использование сторонних библиотек в React Native
**Богатая экосистема RN позволяет быстро подключать навигацию, жесты, сеть, UI‑компоненты и нативные возможности. Главное — следовать документации, учитывать совместимость версий и корректно настраивать iOS/Android.**

---

##  Как подключать библиотеки
- Установка через npm/Yarn, затем — автолинковка (RN ≥ 0.60) или ручная линковка (старые версии).
- Для iOS после установки нативных зависимостей: `cd ios && pod install`.

```bash
# npm
npm install <library-name>

# yarn
yarn add <library-name>
```

---

##  Автолинковка и ручная интеграция
- RN ≥ 0.60: автолинковка подключит нативные модули автоматически.
- RN < 0.60: возможно потребуется `react-native link <library-name>` и ручные правки `android/*`, `ios/*`.
- iOS: не забывайте `pod install` после добавления нативных зависимостей.

```bash
cd ios && pod install
```

---

##  Ручная настройка (когда требуется)
- Android: `android/settings.gradle`, `android/app/build.gradle` — зависимости и include проектов.
- iOS: Xcode → Target → Build Phases → Link Binary With Libraries; Podfile для CocoaPods.

---

##  Использование в коде
```jsx
import LibraryName from 'library-name';

LibraryName.doSomething();
```

Проверяйте документацию — ряд библиотек требует обвязку (инициализацию, провайдеры, разрешения).

---

##  Управление версиями и совместимость
- Проверяйте совместимость библиотек с вашей версией RN (релизы/README).
- Фиксируйте версии в `package.json`, используйте `yarn.lock`/`package-lock.json`.
- Обновления:

```bash
npm update <library-name>
# или
yarn upgrade <library-name>
```

---

##  Популярные библиотеки (примеры интеграции)

###  React Navigation
```bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
```

```jsx
// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

###  Axios (HTTP)
```bash
npm install axios
```

```jsx
import axios from 'axios';

async function load() {
  const { data } = await axios.get('https://api.example.com/data');
  console.log(data);
}
```

###  Gesture Handler / Reanimated
```bash
npm install react-native-gesture-handler react-native-reanimated
```

```jsx
import 'react-native-gesture-handler';
// setup reanimated babel plugin в babel.config.js
```

---

##  Отладка и устранение проблем
- Ошибки линковки: перепроверьте автолинковку, версии Android Gradle, iOS Pods; выполните `pod install`.
- Конфликты зависимостей: сверьте требования версии RN и peer‑deps.
- Полный перезапуск/кеш: `npx react-native start --reset-cache`.

```bash
npx react-native run-android
npx react-native run-ios
```

---

##  Когда писать свой нативный модуль
- Если функциональность отсутствует или требуется тонкая интеграция с SDK.
- Реализация на Java/Kotlin (Android) и Objective‑C/Swift (iOS), экспорт в JS через TurboModules/Fabric.

---

##  Итог
- Интеграция библиотек в RN проста благодаря автолинковке и экосистеме.
- Важно: совместимость версий, корректная iOS/Android‑настройка, чтение документации.
- При необходимости — создавайте собственные нативные модули.

##  ЗАДАЧИ
Задачи для практики: `установка, линковка, конфигурация iOS/Android, отладка`

---

###  Задача 1: Подключите React Navigation и сделайте Stack
Шаги:
1) Установите пакеты навигации и зависимости
2) Настройте `NavigationContainer` и `createNativeStackNavigator`
3) Создайте 2 экрана и переход между ними

<details>
<summary> Решение</summary>

```bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
```

```jsx
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Home({ navigation }) {
  return (
    <View><Text>Home</Text><Button title="Go" onPress={() => navigation.navigate('Details')} /></View>
  );
}
function Details() { return <View><Text>Details</Text></View>; }

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

</details>

---

###  Задача 2: Подключите Axios и обработайте ошибки
Шаги:
1) Установите `axios`
2) Создайте клиент с базовым URL и интерцепторами ошибок
3) Выполните запрос и выведите данные/ошибку

<details>
<summary> Решение</summary>

```jsx
import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.example.com' });
api.interceptors.response.use(
  r => r,
  e => {
    console.warn('API error:', e?.response?.status, e?.message);
    return Promise.reject(e);
  }
);

export async function fetchUsers() {
  try {
    const { data } = await api.get('/users');
    return data;
  } catch (e) {
    return [];
  }
}
```

</details>

---

###  Задача 3: Подключите Gesture Handler + Reanimated
Шаги:
1) Установите пакеты
2) Добавьте `import 'react-native-gesture-handler'` и настройте Babel для Reanimated
3) Реализуйте свайп‑жест, который двигает квадрат (UI‑thread)

<details>
<summary> Решение</summary>

```jsx
import 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

export function DraggableBox() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }, { translateY: y.value }] }));

  const onGesture = Animated.event([{ nativeEvent: { translationX: x, translationY: y } }], { useNativeDriver: true });

  return (
    <PanGestureHandler onGestureEvent={onGesture} onEnded={() => { x.value = withSpring(0); y.value = withSpring(0); }}>
      <Animated.View style={[{ width: 80, height: 80, backgroundColor: '#10B981' }, style]} />
    </PanGestureHandler>
  );
}
```

</details>

---

###  Задача 4: Почините iOS после установки нативной библиотеки
Симулируйте проблему: после установки библиотеки проект на iOS не собирается.

Шаги:
1) Выполните `cd ios && pod install`
2) Откройте `.xcworkspace` в Xcode, проверьте `Build Settings`/минимальную версию iOS
3) Очистите кеши: `xcodebuild clean`, удалите `DerivedData`

<details>
<summary> Решение</summary>

```bash
cd ios && pod install
xed ios/YourApp.xcworkspace
xcodebuild clean
rm -rf ~/Library/Developer/Xcode/DerivedData
```

</details>

---

###  Задача 5: Зафиксируйте версии и проверьте совместимость
Шаги:
1) Сверьте README библиотеки с вашей версией RN
2) Зафиксируйте версии в `package.json`
3) Сгенерируйте чистую установку (удалите `node_modules`, `yarn.lock`/`package-lock.json`, переустановите)

<details>
<summary> Решение</summary>

```bash
rm -rf node_modules yarn.lock package-lock.json
yarn install # или npm ci
```

Проверьте «peerDependencies» и «engines» в библиотеке; при несовместимости подберите рекомендуемую версию из документации.

</details>

---

 Эти задачи помогут отработать полный цикл интеграции библиотек: установка, линковка, конфигурация платформ, отладка и контроль версий.

---


