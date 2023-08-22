import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import './styleess.scss'
import UserDetail from './pages/UserDetail';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Footer from './pages/Footer';

function App() {
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" exact element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path='/user/:id' element={<UserDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
