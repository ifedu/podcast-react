import React from 'react';
import { Link } from 'react-router-dom';

import './Main.css';
import { useLoading } from '../../hooks/LoadingContext';
import { useSongs } from '../../hooks/useSongs';

export function Main() {
  const { setIsLoading } = useLoading();
  const [filterValue, setFilter] = React.useState('');
  const songs = useSongs(setIsLoading);

  function getSongsFiltered() {
    return songs?.entry.filter((song) =>
      song['im:name'].label.toUpperCase().includes(filterValue.toUpperCase()) ||
        song['im:artist'].label.toUpperCase().includes(filterValue.toUpperCase())
    )
  }

  function onFilterChange(e) {
    setFilter(e.target.value);
  }

  if (!songs) return null;

  const filterSongs = getSongsFiltered();

  return (
    <div className='Main' data-testid='main'>
      <div className='filter'>
        <span>{filterSongs?.length}</span>
        <input placeholder='Filter podcasts...' onChange={onFilterChange}/>
      </div>

      <div className='cols'>
        {
          filterSongs?.map((song, i) =>
            <Link key={i} to={`/podcast/${song.id.attributes['im:id']}`} state={{ song }}  data-testid='link-to-podcast'>
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
          )
        }
      </div>
    </div>
  );
}
