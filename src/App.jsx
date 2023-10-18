import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import MainPage from './components/MainPublicPage/MainPage';
import Categories from './components/pages/Categories';
import Vegetables from './components/pages/Vegetables';
import Fruits from './components/pages/Fruits';
import Fish from './components/pages/Fish';
import Meat from './components/pages/Meat';
import NoPage from './components/NoPage';

function App() {

  const [ navbarContent, setNavbarContent ] = React.useState('');

  return (
    <React.StrictMode>
    <BrowserRouter>

      <Navbar content={navbarContent} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<Categories />} />
          <Route path="vegetables" element={<Vegetables />} />
          <Route path="fruits" element={<Fruits />} />
          <Route path="meat" element={<Meat />} />
          <Route path="fish" element={<Fish />} />
        
          <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

export default App;
