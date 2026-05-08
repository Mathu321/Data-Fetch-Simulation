# Simulated Data Fetch with setTimeout & Promises

A beginner JavaScript exercise demonstrating how to simulate asynchronous data fetching using `setTimeout` wrapped in Promises.

---
## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and UI elements |
| `style.css` | Simple styling |
| `app.js` | All JavaScript logic |

---

## How to Run

1. Download all 3 files into the same folder
2. Open `index.html` in a browser
3. No server or install needed

---

## What It Demonstrates

### 1. Wrapping `setTimeout` in a Promise

```js
function simulateFetch(data, delay = 1500) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}
```

`setTimeout` is asynchronous but doesn't return a Promise by default. Wrapping it in `new Promise()` lets us use `await` on it, just like a real `fetch()` call.

### 2. Simulating a Failed Request

```js
function simulateFailedFetch(message, delay = 1200) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
}
```

Instead of `resolve`, we call `reject` — this triggers the `catch` block in the caller.

### 3. Consuming with async/await

```js
async function handleFetch() {
  try {
    const users = await simulateFetch(fakeUsers, 1800);
    renderUsers(users);
  } catch (error) {
    showError(error.message);
  }
}
```

`await` pauses execution until the Promise resolves or rejects. `try/catch` handles both outcomes cleanly.

---

## Key Concepts

- **Promise** — an object representing a value that will be available in the future
- **resolve** — call this to mark the Promise as successful
- **reject** — call this to mark the Promise as failed
- **async/await** — cleaner syntax for working with Promises
- **try/catch** — handles both success and error paths

---

## Buttons

| Button | What it does |
|--------|-------------|
| Fetch Users | Calls `simulateFetch()` → resolves after ~1.8s |
| Simulate Error | Calls `simulateFailedFetch()` → rejects after ~1.4s |
| Reset | Clears the UI |
