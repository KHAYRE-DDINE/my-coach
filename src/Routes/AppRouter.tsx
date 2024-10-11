import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../App.css';
import Details from '../pages/Details/Details';
import ListItemsPage from '../pages/ListItemsPage/ListItemsPage';


function App(): JSX.Element {


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
