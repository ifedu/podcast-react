import React from 'react';

export const usePodcast = (setIsLoading, podcastId) => {
  const [ podcastInfo, setPodcast ] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);

    if (
      localStorage.getItem(`last podcast ${podcastId}`) !== null &&
      Math.floor((new Date() - new Date(localStorage.getItem(`last podcast ${podcastId}`))) / (1000 * 60 * 60 * 24)) === 0
    ) {
      setPodcast(JSON.parse(localStorage.getItem(`podcast ${podcastId}`)));
      setIsLoading(false);
      return;
    }

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
    .then((resp) => resp.json())
    .then((resp) => {
      localStorage.setItem(`podcast ${podcastId}`, resp.contents);
      localStorage.setItem(`last podcast ${podcastId}`, new Date());

      setPodcast(JSON.parse(resp.contents));
      setIsLoading(false);
    });
  }, [setIsLoading, podcastId]);

  return podcastInfo;
}
