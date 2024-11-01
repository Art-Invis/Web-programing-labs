# Лабораторні роботи з дисципліни "Вебтехнології та вебдизайн"
## Виконав Гада Артем (ІР-23)
### Лабораторні роботи №7 та №8 (Варіант 5)


---

#### Lab #7 Description
Continue developing your React app by adding a page that displays a list of items (refer to the wireframe link for the Catalog page above). The items you are "selling" should be the same as in previous assignments (see the description in Lab #3).

**Requirements:**
- All requirements from previous React.js assignments should be maintained.

- **Code Style:**
  - Use the `array.map()` method to render the list of items.
  - Ensure routing (page switching) works by using the `react-router-dom` library: [React Router Quick Start](https://reactrouter.com/web/guides/quick-start).
  - All UI elements (buttons, select dropdowns) should have corresponding React components (e.g., `PrimaryButton.jsx`, `Select.jsx`).

- **Functionality:**
  - No functionality for filtering, search, or "view more" actions is required for now — these features will be implemented in future assignments.

---

#### Lab #8 Description
Continue working on your React app by adding a detailed page for each item (refer to the wireframe link for the Item page above). You will also need to make your previous pages (Home & Catalog) more interactive.

**Requirements:**
- All requirements from previous React.js assignments should still apply.

- **Code Style:**
  - Store your items in the state or context of your page (your choice).
    - Reference: [React State](https://uk.reactjs.org/docs/hooks-state.html), [React Context](https://uk.reactjs.org/docs/hooks-reference.html#usecontext).
  - Use `useState()` inside functional components for state management instead of `this.state` in class components.
  - If using context, apply the `useContext()` hook instead of `Context.Consumer`: [Guide to useContext](https://www.robinwieruch.de/react-usecontext-hook).

- **Functionality (IMPORTANT):**
  - **Home Page**: The "View more" button should display additional elements on the same page. (*Tip*: The elements can be random paragraphs or headings; use your imagination.)
  - **Catalog Page**:
    - Implement filters to allow users to filter items by various properties (e.g., size, color, type).
    - Include a search option that works on any text property.
  - **Catalog & Item Pages**: The "View more" action for each item should navigate to the corresponding item page, displaying accurate item information (data should come from state or context).
