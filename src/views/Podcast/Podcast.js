import React from 'react';
import './Podcast.css';

export function Podcast() {
  return (
    <div className='Podcast'>
      <div className='info'>
        <div className='picture'><img src=''/></div>

        <div className='title'>
          <span>Song Exploder</span>
          <p>by Song Exploder</p>
        </div>

        <div className='description'>
          <span>Description</span>
          <p>A podcast...</p>
        </div>
      </div>

      <div className='episode'>
        <div>Episodes: 66</div>

        <div className='table'>
          <div className='head row'>
            <span>Title</span>
            <span>Date</span>
            <span>Duration</span>
          </div>

          <div className='body'>
            <div className='episode row'>
              <span>KT Tunstall</span>
              <span>1/3/2016</span>
              <span>14:00</span>
            </div>

            <div className='episode row'>
              <span>KT Tunstall</span>
              <span>1/3/2016</span>
              <span>14:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
