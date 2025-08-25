import styles from './App.module.css';
import AppRoutes from './routes/index';
import Header from './components/Header/Header';
import './styles/styles.css';
const App: React.FC = () => (
  <div className={styles.app}>
    <Header />
    <AppRoutes />
  </div>
);

export default App;
