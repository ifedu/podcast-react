import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import './Podcast.css';
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
  const { state: { song } } = useLocation();
  const { podcastId } = useParams();
  const [ podcastInfo, setPodcast ] = React.useState(null);

  React.useEffect(() => {
    if (
      localStorage.getItem(`last podcast ${podcastId}`) !== null &&
      Math.floor((new Date() - new Date(localStorage.getItem(`last podcast ${podcastId}`))) / (1000 * 60 * 60 * 24)) === 0
    ) {
      setPodcast(JSON.parse(localStorage.getItem(`podcast ${podcastId}`)));
      return;
    }

    fetch(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)
    .then((resp) => resp.json())
    .then((resp) => {
      localStorage.setItem(`podcast ${podcastId}`, JSON.stringify(resp));
      localStorage.setItem(`last podcast ${podcastId}`, new Date());

      setPodcast(resp);
    });
  }, []);

  if (!podcastInfo) {
    return null;
  }

  return (
    <div className='Podcast'>
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

                return <Link key={i} to={`/podcast/${podcastId}/episode/${episode.trackId}`} state={{ podcastInfo, song, episode }}>
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
