import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import { Logo } from './components/Logo/Logo';
import { Main } from './views/Main/Main';
import { Podcast } from './views/Podcast/Podcast';
import { Episode } from './views/Episode/Episode';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='index'>
      <BrowserRouter>
        <Logo/>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/podcast/:podcastId' element={<Podcast/>}></Route>
          <Route path='/podcast/:podcastId/episode/:episodeId' element={<Episode/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);
