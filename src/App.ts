import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Details from './Component/Details/Details';
import ListItemsPage from './Component/ListItemsPage/ListItemsPage';
import { useEffect } from 'react';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListItemsPage />} />
        <Route path="item/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
