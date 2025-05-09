import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/app'  

console.log('Main.jsx is running!');

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  console.log('React rendered successfully');
} catch (error) {
  console.error('Error rendering React app:', error);
}