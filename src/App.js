import logo from './logo.svg';
import './App.css';
import HomeComponent from './components/HomeComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
      <Routes>
        <Route path="/home" component={HomeComponent} />
      </Routes>
    </div>
    </BrowserRouter >
  );
}

export default App;
