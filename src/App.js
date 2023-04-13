import logo from './logo.svg';
import './App.css';
import HomeComponent from './components/HomeComponent';
import NavBar from './components/NavBar';
import ViewArticlePage from './components/ViewArticlePage';
import SearchResultsPage from './components/SearchResultsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit'
import articlesReducer from './reducers/articles-reducer';
import userReducer from './reducers/user-reducer';


const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer
  }
})


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="w-full">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/article/:id" element={<ViewArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
        </div>
      </BrowserRouter >
    </Provider>
  );
}

export default App;
