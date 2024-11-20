import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import {thunk} from 'redux-thunk';

// Завантаження кошика з LocalStorage
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart from LocalStorage", error);
    return [];
  }
};

// Збереження кошика до LocalStorage
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to LocalStorage", error);
  }
};

// Початковий стан
const initialState = {
  cart: loadCartFromLocalStorage(),
};

// Створення Redux Store
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

// Підписка на зміни в Store для оновлення LocalStorage
store.subscribe(() => {
  const { cart } = store.getState();
  saveCartToLocalStorage(cart);
});

export default store;
