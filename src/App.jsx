import React from 'react';
import MainPage from './components/MainPublicPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Categories from './components/pages/Categories';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='categories' element={<Categories />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default App;
