import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
{/*       <Route path="/projects" element={<Projects />} /> */}
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
export default AppRoutes;
