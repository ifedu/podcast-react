import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import './Podcast.css';
import { useLoading } from '../../hooks/LoadingContext';
import { usePodcast } from '../../hooks/usePodcast';
import { PodcastInfo } from '../../components/PodcastInfo/PodcastInfo';

function convertToShortDate(fullDate) {
  const date = new Date(fullDate);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}/${Number(month) + 1}/${year}`;
}

function convertToTime(ms) {
  const date = new Date(ms);
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${minutes}:${seconds}`;
}

export function Podcast() {
  const { setIsLoading } = useLoading();
  const { state: { song } } = useLocation();
  const { podcastId } = useParams();

  const podcastInfo = usePodcast(setIsLoading, podcastId);
  if (!podcastInfo) {
    return null;
  }

  return (
    <div className='Podcast' data-testid='podcast'>
      <PodcastInfo info={podcastInfo.results[0]} song={song}/>

      <div className='episode'>
        <div>Episodes: {podcastInfo.resultCount}</div>

        <div className='table'>
          <div className='head row'>
            <span>Title</span>
            <span>Date</span>
            <span>Duration</span>
          </div>

          <div className='body'>
            {
              podcastInfo.results.map((episode, i) => {
                if (!episode.description) return null;

                return <Link key={i} to={`/podcast/${podcastId}/episode/${episode.trackId}`} state={{ podcastInfo, song, episode }} data-testid='link-to-episode'>
                  <div className='episode row'>
                    <span>{episode.trackName}</span>
                    <span>{convertToShortDate(episode.releaseDate)}</span>
                    <span>{convertToTime(episode.trackTimeMillis)}</span>
                  </div>
                </Link>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
