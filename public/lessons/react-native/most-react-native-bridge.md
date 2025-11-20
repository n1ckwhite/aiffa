#  Мост React Native (Bridge): как устроен и зачем нужен
**Bridge — историческое сердце React Native, обеспечивающее коммуникацию между JavaScript и нативными слоями iOS/Android; сегодня его роль эволюционирует к JSI/Fabric/TurboModules для снижения накладных расходов и роста производительности.**

---

##  Что такое Bridge в React Native
- Bridge — механизм двунаправленного обмена сообщениями между JavaScript-движком (Hermes/JSC/V8) и нативной частью (Objective‑C/Swift на iOS, Java/Kotlin на Android).
- Он сериализует вызовы и данные (исторически — JSON) и передает их между мирами по асинхронному каналу, избегая блокировки UI-потока.
- Через Bridge выполняются: создание/обновление нативных UI-компонентов, вызовы нативных модулей (камера, геолокация), эмит событий в JS и обратно.

---

##  Архитектура исполнения: потоки и очереди
- **JS-поток**: исполняет React-логику, рендер-цикл Reconcilation, вызывает нативные методы.
- **UI (Main) поток**: применяет изменения к нативным вью (UIKit/AppKit/Android UI toolkit). Должен оставаться свободным для плавной анимации.
- **Native Modules потоки**: выполнение блокирующих I/O/CPU задач, чтобы не тормозить JS и UI.
- Обмен — пакетами сообщений (batched), что уменьшает накладные расходы, но может давать задержку при «чате» большого объёма данных.

---

##  Как работает Bridge пошагово
1. JS вычисляет diff дерева и генерирует описания операций (создать/удалить/обновить вью, вызвать модуль).
2. Операции сериализуются (исторически — JSON, в современных реализациях — более эффективные представления) и отправляются в нативную сторону.
3. Нативный слой парсит сообщения, маппит имена методов/компонентов на реализации и исполняет их.
4. Результаты/события (колбэки, listeners) асинхронно отправляются обратно в JS с данными полезной нагрузки.

---

##  Роль Bridge: почему он важен
- **Связь миров**: позволяет JS коду управлять нативным UI и доступом к платформенным возможностям.
- **Расширяемость**: нативные модули и вью-компоненты можно писать под нужды продукта и отдавать в JS удобные API.
- **Кроссплатформенность**: единый JS поверх двух разных платформ, различия скрыты за адаптерами на нативной стороне.

---

##  Ограничения классического Bridge
- **Накладные расходы на сериализацию**: особенно при частых/мелких вызовах, больших массивах данных, стримах.
- **Асинхронность «через очередь»**: сложно синхронизировать операции, повышается латентность для сценариев с жёсткими SLA (жесты, анимации).
- **Сложность отладки**: ошибки на стыке JS↔Native (типы/контракты/жизненные циклы) требуют глубокого профайлинга.

---

##  Эволюция: JSI, TurboModules и Fabric
Современная архитектура RN уходит от узкого места Bridge, переводя взаимодействие на уровень C++ и прямых указателей.

###  JSI (JavaScript Interface)
- Тонкий слой C++ для встраивания JS-движков и прямого доступа к объектам/функциям без JSON-моста.
- Позволяет экспортировать/импортировать функции между JS и нативом почти без копирования.
- Открывает путь к синхронным операциям там, где это оправдано, и к более эффективной передаче бинарных данных.

###  TurboModules
- Новая система модулей поверх JSI с ленивой инициализацией: модуль загружается, когда впервые нужен.
- Сильные типы интерфейсов (Codegen/TypeScript/Flow) уменьшают расхождения контрактов JS↔Native.
- Меньше «чата» и сериализации, ближе к прямым вызовам функций.

###  Fabric (новый рендерер)
- Переписанный рендер-пайплайн с Concurrency‑моделью React и синхронизацией с нативной иерархией.
- Бридж-проходы для UI минимизированы: узлы «тени» (Shadow Nodes) на C++ и согласование работают быстрее и предсказуемее.
- Улучшены жесты/анимации, совместимость с `react-native-reanimated` и `Gesture Handler`.

---

##  Когда Bridge становится узким местом
- Высокочастотные анимации с участием JS-логики (60 fps) — латентность очередей становится заметной.
- Потоки данных в реальном времени (аудио/видео/датчики) — дорого гонять через сериализацию.
- Частые батчи мелких вызовов (чаты, быстрое скроллирование с измерениями) — множатся накладные расходы.

Решения: переносить тяжёлые участки в натив (или на JSI), использовать анимации/жесты на UI-потоке, агрегировать вызовы, кэшировать.

---

##  Лучшие практики взаимодействия JS↔Native
- Проектировать модуль с «толстым» нативным API: меньше частых маленьких вызовов, больше осмысленных операций.
- Уменьшать объём сериализуемых данных; передавать идентификаторы и ссылки, а не «плоские снежки» JSON.
- Использовать мемоизацию и кэширование на стороне JS и native, чтобы не дергать мост повторно.
- Профилировать: Flipper, Performance Monitor, профайлеры Hermes/JSC, инструменты Xcode/Android Studio.
- Где возможно — опираться на JSI/TurboModules и Fabric‑компоненты.

---

##  Мини-пример: нативный модуль (эскиз)

###  iOS (Swift)
```swift
@objc(DeviceInfo)
class DeviceInfo: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool { false }

  @objc
  func getModel(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(UIDevice.current.model)
  }
}
```

###  Android (Kotlin)
```kotlin
class DeviceInfoModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName() = "DeviceInfo"

  @ReactMethod
  fun getModel(promise: Promise) {
    promise.resolve(Build.MODEL)
  }
}
```

###  JS (использование)
```javascript
import { NativeModules } from 'react-native';
const { DeviceInfo } = NativeModules;

export async function fetchModel() {
  return await DeviceInfo.getModel();
}
```

> Примечание: в современной архитектуре аналог реализуется через TurboModules/Codegen поверх JSI, что исключает JSON-сериализацию и ускоряет вызовы.

---

##  Итог
- Bridge связал JS и native и позволил RN быстро взлететь, но его асинхронная JSON‑природа создавала накладные расходы.
- Переход на JSI, TurboModules и Fabric уменьшает латентность, упрощает типобезопасность и повышает предсказуемость рендеринга.
- Практически: держите тяжелые вычисления и анимации ближе к UI/JSI, минимизируйте «болталку» через границу и агрегируйте операции.

##  ЗАДАЧИ

Задачи для практики: `React Native Bridge, JSI, TurboModules, Fabric`

---

###  Задача 1: Классический Bridge-модуль и замер латентности
Реализуйте простой нативный модуль `CounterModule` со следующими методами:
- `incrementBy(step: number): Promise<number>` — увеличивает внутренний счётчик на `step` и возвращает значение
- `reset(): void` — сбрасывает счётчик

Шаги:
1) Создайте модуль на iOS и Android.

```swift
// iOS (Swift) — CounterModule
@objc(CounterModule)
class CounterModule: NSObject {
  private var value: Int = 0

  @objc
  static func requiresMainQueueSetup() -> Bool { false }

  @objc
  func reset() { value = 0 }

  @objc
  func incrementBy(_ step: NSNumber, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    value += step.intValue
    resolve(value)
  }
}
```

```kotlin
// Android (Kotlin) — CounterModule
class CounterModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private var value: Int = 0
  override fun getName() = "CounterModule"

  @ReactMethod
  fun reset() { value = 0 }

  @ReactMethod
  fun incrementBy(step: Int, promise: Promise) {
    value += step
    promise.resolve(value)
  }
}
```

2) В JS вызовите 10 000 раз `incrementBy(1)` и замерьте время.

```javascript
import { NativeModules } from 'react-native';
const { CounterModule } = NativeModules;

await CounterModule.reset();
console.time('bridge-naive');
for (let i = 0; i < 10000; i++) {
  // eslint-disable-next-line no-await-in-loop
  await CounterModule.incrementBy(1);
}
console.timeEnd('bridge-naive');
```

3) Зафиксируйте результаты (Flipper/console), сделайте выводы о накладных расходах.

---

<details>
<summary> Решение</summary>

```javascript
// Наивный вызов через Bridge (10k await) — демонстрация латентности
import { NativeModules } from 'react-native';
const { CounterModule } = NativeModules;

async function runNaive() {
  await CounterModule.reset();
  console.time('bridge-naive');
  for (let i = 0; i < 10000; i++) {
    // eslint-disable-next-line no-await-in-loop
    await CounterModule.incrementBy(1);
  }
  console.timeEnd('bridge-naive');
}

runNaive();
```

Ожидаемо время «bridge-naive» окажется заметным из‑за тысяч последовательных переходов через границу JS↔Native и сериализации аргументов.

</details>

---

###  Задача 2: Батчинг вызовов и сравнение
Добавьте в нативный модуль метод `incrementBatch(step: number, times: number): Promise<number>` для выполнения операции на нативной стороне за один вызов.

Шаги:
1) Реализуйте метод на iOS/Android (цикл в native).
2) Сравните время с наивным вариантом из Задачи 1.

```javascript
await CounterModule.reset();
console.time('bridge-batch');
const result = await CounterModule.incrementBatch(1, 10000);
console.timeEnd('bridge-batch');
console.log('result:', result);
```

Сделайте выводы: во сколько раз батч быстрее на вашем устройстве.

---

<details>
<summary> Решение</summary>

```swift
// iOS (Swift)
@objc(CounterModule)
class CounterModule: NSObject {
  private var value: Int = 0

  @objc func incrementBatch(_ step: NSNumber, times: NSNumber, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    for _ in 0..<times.intValue { value += step.intValue }
    resolve(value)
  }
}
```

```kotlin
// Android (Kotlin)
@ReactMethod
fun incrementBatch(step: Int, times: Int, promise: Promise) {
  for (i in 0 until times) value += step
  promise.resolve(value)
}
```

```javascript
// JS замер батча
await CounterModule.reset();
console.time('bridge-batch');
const res = await CounterModule.incrementBatch(1, 10000);
console.timeEnd('bridge-batch');
console.log('res:', res);
```

В большинстве случаев «bridge-batch» в разы быстрее «bridge-naive», поскольку вместо 10 000 переходов выполняется один.

</details>

---

###  Задача 3: Перевод модуля на TurboModules
Перенесите `CounterModule` на TurboModules/Codegen.

Шаги:
1) Опишите интерфейс модуля для Codegen.

```ts
// native-modules/CounterModule.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  reset(): void;
  incrementBy(step: number): Promise<number>;
  incrementBatch(step: number, times: number): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('CounterModule');
```

2) Сгенерируйте обёртки (Codegen), реализуйте нативную часть.
3) Повторите замер для наивного и батч-варианта, сравните с классическим Bridge.

---

<details>
<summary> Решение</summary>

```ts
// Interface для Codegen (Spec) — сокращённый пример
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  reset(): void;
  incrementBy(step: number): Promise<number>;
  incrementBatch(step: number, times: number): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('CounterModule');
```

Далее запускается Codegen (в зависимости от конфигурации проекта), генерируются обёртки на iOS/Android. Замеры обычно показывают уменьшение латентности относительно классического Bridge за счёт обхода JSON‑сериализации.

</details>

---

###  Задача 4: Fabric-вью вместо UI через Bridge
Создайте примитивный Fabric‑компонент `RNBadge` с пропсами `{ label: string; color?: string }` и используйте его в JS.

Шаги:
1) Зарегистрируйте компонент на нативной стороне (iOS/Android) в стиле Fabric.
2) Подключите в JS через `requireNativeComponent` или сгенерированный компонент.
3) Отрисуйте список из 1000 `RNBadge`, измерьте время монтирования/скролла.

```jsx
// JS (использование)
import React from 'react';
import { requireNativeComponent } from 'react-native';
const RNBadge = requireNativeComponent('RNBadge');

export function Badges() {
  return (
    <>
      {Array.from({ length: 1000 }, (_, i) => (
        <RNBadge key={i} label={`#${i}`} color={i % 2 ? '#8B5CF6' : '#10B981'} />
      ))}
    </>
  );
}
```

Сравните плавность со схожим компонентом, который создаётся через классический путь.

---

<details>
<summary> Решение</summary>

```jsx
// JS использование остаётся прежним, Fabric уменьшает переходы через границу
import React from 'react';
import { requireNativeComponent } from 'react-native';
const RNBadge = requireNativeComponent('RNBadge');

export function Badges() {
  return (
    <>
      {Array.from({ length: 1000 }, (_, i) => (
        <RNBadge key={i} label={`#${i}`} color={i % 2 ? '#8B5CF6' : '#10B981'} />
      ))}
    </>
  );
}
```

На практике вы увидите меньше jank при скролле/массовых обновлениях, так как согласование в Fabric идёт на уровне C++ shadow‑узлов с меньшим числом «переходов» через границу JS↔Native.

</details>

---

###  Задача 5: Передача больших данных без JSON
Организуйте передачу массива float‑значений длиной 100 000 из native в JS без сериализации JSON.

Варианты:
- JSI HostObject, возвращающий `ArrayBuffer`/`Float32Array` без копирования
- Shared buffers/память, чтение в JS как TypedArray

Шаги:
1) Реализуйте выдачу буфера на нативной стороне.
2) В JS измерьте время конструирования `Float32Array` и агрегирования (avg/min/max).

```javascript
// JS чтение буфера (эскиз)
const buffer = await NativeModules.BigData.getBuffer(); // возвращает ArrayBuffer
const view = new Float32Array(buffer);
let sum = 0;
for (let i = 0; i < view.length; i++) sum += view[i];
console.log('avg:', sum / view.length);
```

Сравните с вариантом передачи тех же данных как JSON‑массива.

---

<details>
<summary> Решение</summary>

```javascript
// Сравнение подходов на JS стороне (метрики времени)
console.time('typed-array');
const buffer = await NativeModules.BigData.getBuffer();
const floats = new Float32Array(buffer);
let sum = 0;
for (let i = 0; i < floats.length; i++) sum += floats[i];
console.timeEnd('typed-array');

console.time('json-array');
const arr = await NativeModules.BigData.getArray(); // медленно и память +
let sum2 = 0;
for (let i = 0; i < arr.length; i++) sum2 += arr[i];
console.timeEnd('json-array');
```

TypedArray/ArrayBuffer существенно быстрее и экономнее памяти; JSON‑массивы на 100 000 элементов провоцируют копирования и GC‑давление.

</details>

---

###  Задача 6: Анимации — JS vs Reanimated (UI‑thread)
Сравните анимацию, управляемую из JS, с анимацией на UI‑потоке через `react-native-reanimated`.

Шаги:
1) Реализуйте квадрат, который перемещается по экрану 60 раз в секунду.
2) Вариант A: `setInterval`/`requestAnimationFrame` в JS + `setState`/`useSharedValue?` (JS‑driven).
3) Вариант B: Reanimated `useSharedValue` + `withTiming` (UI‑thread).
4) Замерьте FPS/пропуски кадров (Flipper/Performance Monitor) на реальном устройстве.

```jsx
// Вариант B (эскиз)
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export function Box() {
  const x = useSharedValue(0);
  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  React.useEffect(() => { x.value = withTiming(300, { duration: 500 }); }, []);
  return <Animated.View style={[{ width: 50, height: 50, backgroundColor: '#34D399' }, style]} />;
}
```

Сделайте выводы о влиянии Bridge‑латентности на плавность.

---

<details>
<summary> Решение</summary>

```jsx
// Вариант A (JS-driven) — подвержен лагам при нагрузке
import React from 'react';
import { View } from 'react-native';

export function BoxJS() {
  const [x, setX] = React.useState(0);
  React.useEffect(() => {
    let id = requestAnimationFrame(function tick(ts) {
      setX(prev => (prev < 300 ? prev + 5 : 0));
      id = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  return <View style={{ width: 50, height: 50, backgroundColor: '#F59E0B', transform: [{ translateX: x }] }} />;
}
```

```jsx
// Вариант B (Reanimated, UI-thread) — стабильные 60fps
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

export function BoxUI() {
  const x = useSharedValue(0);
  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  React.useEffect(() => { x.value = withRepeat(withTiming(300, { duration: 1000 }), -1, true); }, []);
  return <Animated.View style={[{ width: 50, height: 50, backgroundColor: '#10B981' }, style]} />;
}
```

Измерения во Flipper/Perf Monitor покажут преимущество UI‑thread подхода: JS‑управление упирается в латентность обмена и работу GC.

</details>

---

 Эти задачи ориентированы на практику: вы напишете код, замерите метрики и сравните классический Bridge с JSI/TurboModules/Fabric в реальных сценариях.

---


