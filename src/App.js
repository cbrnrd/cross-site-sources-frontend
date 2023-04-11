import logo from './logo.svg';
import './App.css';
import HomeComponent from './components/HomeComponent';
import NavBar from './components/NavBar';
import ViewArticlePage from './components/ViewArticlePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="w-full">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/article/:id" element={<ViewArticlePage />} />
      </Routes>
    </div>
    </BrowserRouter >
  );
}

export default App;
