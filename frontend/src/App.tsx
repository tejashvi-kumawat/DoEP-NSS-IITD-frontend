import styles from './App.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login/Login.tsx';
import Home from './pages/Home/Home.tsx';
import './styles/styles.css';

const App: React.FC = () => (
  <div className={styles.app}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </div>
);

export default App;
