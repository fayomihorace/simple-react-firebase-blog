import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import Channel from './components/Channel';
import ArticleDisplay from './components/ArticleDisplay';
import Admin from './components/Admin';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Channel />} />
          <Route path="admin" element={<Admin />} />
          <Route path="post" element={<ArticleDisplay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
