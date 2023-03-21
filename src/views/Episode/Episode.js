import React from 'react';
import { useLocation } from 'react-router-dom';

import { PodcastInfo } from '../../components/PodcastInfo/PodcastInfo';

import './Episode.css';

export function Episode() {
  const { state: { episode, podcastInfo, song } } = useLocation();

  return (
    <div className='Episode' data-testid='episode'>
      <PodcastInfo info={podcastInfo.results[0]} song={song}/>

      <div className='info'>
        <div className='title'>{episode.trackName}</div>
        <div className='description' dangerouslySetInnerHTML={{ __html: episode.description }}></div>
        <div className='audio'>
          <audio controls>
            <source src={episode.episodeUrl}/>
          </audio>
        </div>
      </div>
    </div>
  );
}
