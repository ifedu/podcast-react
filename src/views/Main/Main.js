import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Main.css';

export function Main() {
  const [filterValue, setFilter] = React.useState('');
  const [songs, setSongs] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      localStorage.getItem('last songs') !== null &&
      Math.floor((new Date() - new Date(localStorage.getItem('last songs'))) / (1000 * 60 * 60 * 24)) === 0
    ) {
      setSongs(JSON.parse(localStorage.getItem('songs')));
      return;
    }

    fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    .then((resp) => resp.json())
    .then((resp) => {
      localStorage.setItem('songs', JSON.stringify(resp.feed));
      localStorage.setItem('last songs', new Date());

      setSongs(resp.feed);
    });
  }, []);

  function onFilterChange(e) {
    setFilter(e.target.value);
  }

  function goToPodcast(song) {
    navigate(`/podcast/${song.id.attributes['im:id']}`, { state: song});
  }

  return (
    <div className='Main'>
      <div className='filter'>
        <span>{songs?.entry?.length}</span>
        <input placeholder='Filter podcasts...' onChange={onFilterChange}/>
      </div>

      <div className='cols'>
        {
          songs?.entry.map((song, i) => {
            if (
              filterValue === '' ||
              song['im:name'].label.toUpperCase().includes(filterValue.toUpperCase()) ||
              song['im:artist'].label.toUpperCase().includes(filterValue.toUpperCase())
            ) {
              return <React.Fragment key={i}>
                <div className='col' onClick={() => goToPodcast(song)}>
                  <div className='song'>
                    <div className='background'></div>

                    <div className='image'>
                      <img src={song['im:image'][2].label} alt='All Songs Considered'/>
                    </div>

                    <div className='texts'>
                      <div className='title'>{song['im:name'].label}</div>
                      <div className='author'>Author: {song['im:artist'].label}</div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            }

            return null;
          })
        }
      </div>
    </div>
  );
}
