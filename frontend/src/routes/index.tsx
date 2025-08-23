// src/routes/index.ts
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';

const AppRoutes: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;