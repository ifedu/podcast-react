import React from 'react';

export const useSongs = (setIsLoading) => {
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

  return songs;
}
