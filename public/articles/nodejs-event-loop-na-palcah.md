# Node.js event loop — на пальцах

## Очереди задач

### Macrotasks

`setTimeout`, `setInterval`, I/O callbacks.

### Microtasks

`Promise.then`, `queueMicrotask`.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// A D C B
```

## Заключение

Если понимаешь порядок microtasks/macrotasks — проще дебажить “почему это выполнилось позже”.


