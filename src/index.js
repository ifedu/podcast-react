import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import { Loading } from './components/Loading/Loading';
import { Logo } from './components/Logo/Logo';
import { Episode } from './views/Episode/Episode';
import { Main } from './views/Main/Main';
import { Podcast } from './views/Podcast/Podcast';
import { LoadingProvider } from './hooks/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <div className='index'>
        <BrowserRouter>
          <div className='head'>
            <Logo/>
            <Loading/>
          </div>

          <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/podcast/:podcastId' element={<Podcast/>}></Route>
            <Route path='/podcast/:podcastId/episode/:episodeId' element={<Episode/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </LoadingProvider>
  </React.StrictMode>
);
