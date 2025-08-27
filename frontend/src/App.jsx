import React from 'react';
import styles from './App.module.css';
import AppRoutes from './routes/index';
import Header from './components/Header/Header';
import './styles/styles.css';

const App = () => (
  <>
    <Header />
    <AppRoutes />
  </>
);

export default App;
