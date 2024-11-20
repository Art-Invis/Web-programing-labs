# Лабораторні роботи з дисципліни "Вебтехнології та вебдизайн"
## Виконав Гада Артем (ІР-23)
### Лабораторна робота №10 (Варіант 5)
**Description:**  
# React.js: Redux - Cart Page (Shopping Cart)

## Description
You are on your way to finishing this insane project! Create the first of three cart pages: **Shopping Cart**.  
Additionally, you will learn one of the most popular React libraries - **Redux**.

### Variants
The products you are "selling" should be the same as in previous works. (See the description of the 3rd work for reference.)

---

## Requirements

### General
- All requirements from previous **React.js** works should be preserved.

### Functionality
- **Item Page:**
  - Implement the "Add to Cart" action using the **Redux flow**.
  - When you add an item to the cart, it should be stored in the **Redux store**.
  - On the Cart page, retrieve all items directly from the store.
- **Cart Page:**
  - Implement "add" and "remove" actions for items using **Redux actions** and **reducers**.

### Code Style
- **Redux Structure:**
  - Keep all Redux parts in separate and appropriately named files:
    - `actions.js` for actions.
    - `reducers.js` for reducers.
    - `store.js` for the Redux store.
- **Hooks:**
  - Use the **`useSelector`** hook to access data from the Redux store (instead of the `connect()` function).
    - [useSelector Examples](https://react-redux.js.org/api/hooks#useselector-examples)
  - Use the **`useDispatch`** hook to dispatch actions (instead of the `connect()` function).
    - [useDispatch Documentation](https://react-redux.js.org/api/hooks#usedispatch)

---

## Resources
- **Redux API Hooks:** [React-Redux Documentation](https://react-redux.js.org/api/hooks)
