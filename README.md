# Лабораторні роботи з дисципліни "Вебтехнології та вебдизайн"
## Виконав Гада Артем (ІР-23)
### Лабораторна робота №10 (Варіант 5)
**Description:**  
# Cart Page (Checkout & Success)
Complete the project by creating the final pages of the cart functionality: **Checkout** and **Success** pages.  
As a bonus, you will explore a powerful form validation library - **Formik**.

## Variants
Use the same products as in previous works. Refer to the description from the 3rd project for details.

---
## Requirements

### General
- All requirements from previous React.js projects must be followed.

### Functionality
1. **Form Requirements**:
   - The form must include at least **5 fields**.
   - Each field must have a **validation rule**:
     - Example: max length, no special characters, only numbers.
     - **Note:** The "required" rule alone is not sufficient.
   - Use at least:
     - One field with **RegEx-based validation**.
     - One field that **does not require a string value** (e.g., phone number).

2. **Error Handling**:
   - Display clear, descriptive error messages for all fields.
     - Example: "Email is incorrect", "First name is a required field".
   - Error messages must be implemented as a **separate React component**.

3. **Form Submission**:
   - Upon successful form submission, redirect the user to the **Success page**.

### Code Style
- Use **Formik** and **Yup** libraries or any similar libraries for:
  - Form validation.
  - Displaying error messages.
  - Handling form submission.

---

## Resources
- Recommended tutorial: [Formik Basics](https://youtu.be/3sXYK60T6Us?t=390)
