// src/config.js

// API Base URL
export const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Other configuration variables
export const APP_NAME = 'Notey';

// Maximum length for note preview in cards
export const MAX_PREVIEW_LENGTH = 20;

// Category colors
export const CATEGORY_COLORS = {
  BUSINESS: 'blue',
  PERSONAL: 'green',
  IMPORTANT: 'purple'
};

// Minimum search query length
export const MIN_SEARCH_LENGTH = 3;

// Toastify configuration
export const TOAST_CONFIG = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Add more configuration variables as needed