import React from 'react';
import { Link } from 'react-router-dom';

import './Main.css';
import { useLoading } from '../../context/LoadingContext';

export function Main() {
  const { setIsLoading } = useLoading();
  const [filterValue, setFilter] = React.useState('');
  const [songs, setSongs] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);

    if (
      localStorage.getItem('last songs') !== null &&
      Math.floor((new Date() - new Date(localStorage.getItem('last songs'))) / (1000 * 60 * 60 * 24)) === 0
    ) {
      setSongs(JSON.parse(localStorage.getItem('songs')));
      setIsLoading(false);
      return;
    }

    fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    .then((resp) => resp.json())
    .then((resp) => {
      localStorage.setItem('songs', JSON.stringify(resp.feed));
      localStorage.setItem('last songs', new Date());

      setSongs(resp.feed);
      setIsLoading(false);
    });
  }, [setIsLoading]);

  function onFilterChange(e) {
    setFilter(e.target.value);
  }

  if (!songs) {
    return null;
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
              return <Link key={i} to={`/podcast/${song.id.attributes['im:id']}`} state={{ song }}>
                <div className='col'>
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
              </Link>
            }

            return null;
          })
        }
      </div>
    </div>
  );
}
