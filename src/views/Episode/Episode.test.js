import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import renderer from 'react-test-renderer' ;

import { Episode } from './Episode';

const getContent = (pathname = '/') => {
  const state = {
    episode: {},
    podcastInfo: {
      resultCount: 1,
      results: [
        {
          collectionName: 'Podcast Name',
          description: 'Podcast Description',
        },
      ],
    },
    song: {
      summary: {},
    },
  };

  return <MemoryRouter initialEntries={[{ pathname, state }]}>
    <Routes>
      <Route path='/podcast/1/episode/1' element={
        <Episode/>
      }></Route>
    </Routes>
  </MemoryRouter>;
}

describe('Episode', () => {
  const view = getContent('/podcast/1/episode/1');

  afterEach(cleanup);

  it('renders correctly', () => {
    const tree = renderer.create(view).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the episode', async() => {
    render(view);

    await waitFor(() => {
      const podcast = screen.getByTestId('episode');
      expect(podcast).toBeInTheDocument();
    });
  });
});
