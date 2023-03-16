import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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

  const [ podcastInfo, setPodcast ] = React.useState(null);
  const { podcastId } = useParams();
  const navigate = useNavigate();

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

  function goToEpisode(podcast) {
    console.log(podcast);
    navigate(`/podcast/${podcastId}/episode/${podcast.trackId}`, { state: podcast});
  }

  if (!podcastInfo) {
    return null;
  }

  const podcastMainInfo = podcastInfo.results[0];

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
              podcastInfo.results.map((podcast, i) => {
                if (!podcast.description) return null;

                return <React.Fragment key={i}>
                  <div className='episode row' onClick={() => goToEpisode(podcast)}>
                    <span>{podcast.trackName}</span>
                    <span>{convertToShortDate(podcast.releaseDate)}</span>
                    <span>{convertToTime(podcast.trackTimeMillis)}</span>
                  </div>
                </React.Fragment>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
