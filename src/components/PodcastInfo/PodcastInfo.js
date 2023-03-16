import React from 'react';
import { Link } from 'react-router-dom';

import './PodcastInfo.css';

export function PodcastInfo({ info, song }) {
  return (
    <div className='PodcastInfo'>
      <Link to={`/podcast/${info.collectionId}`} state={{ song }}>
        <div className='section picture'><img src={info.artworkUrl600} alt='All Songs Considered'/></div>

        <div className='section title'>
          <span>{info.collectionName}</span>
          <div>by {info.artistName}</div>
        </div>
      </Link>

      <div className='section description'>
        <span>Description</span>
        <div>{song.summary.label}</div>
      </div>
    </div>
  );
}
