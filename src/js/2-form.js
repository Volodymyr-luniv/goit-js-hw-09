const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageArea = form.querySelector('textarea[name="message"]');

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

handleFormData();

function handleFormData() {
  let saveData = {};
  try {
    saveData = localStorage.getItem(STORAGE_KEY);
    if (saveData) {
      const parseData = JSON.parse(saveData);
      emailInput.value = parseData.email || '';
      messageArea.value = parseData.message || '';
      formData.email = parseData.email || '';
      formData.message = parseData.message || '';
    }
  } catch (error) {
    console.error(error);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
}

function handleFormInput(e) {
  try {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error(error);
  }
}
