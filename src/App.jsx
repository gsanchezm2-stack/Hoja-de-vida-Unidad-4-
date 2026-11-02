import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ backgroundColor: '#0f172a', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.2rem' }}>CV & Panel CRUD</span>
        <div>
          <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', marginRight: '20px', fontWeight: '500' }}>Ver Hoja de Vida</Link>
          <Link to="/admin" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontWeight: '500' }}>Panel Admin</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}