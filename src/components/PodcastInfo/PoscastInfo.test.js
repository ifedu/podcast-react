import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import renderer from 'react-test-renderer' ;

import { PodcastInfo } from './PodcastInfo';

const getContent = (pathname = '/') => {
  const props = {
    info: {
      collectionId: 1,
    },
    song: {
      summary: {},
    },
  };

  return <MemoryRouter initialEntries={[{ pathname }]}>
    <Routes>
      <Route path='/podcast/1' element={
        <div data-testid='podcast'><PodcastInfo {...props}/></div>
      }></Route>

      <Route path='/podcast/1/episode/1' element={
        <div data-testid='episode'><PodcastInfo {...props}/></div>
      }></Route>
    </Routes>
  </MemoryRouter>;
}

describe('PodcastInfo', () => {
  const view = getContent('/podcast/1/episode/1');

  afterEach(cleanup);

  it('renders correctly', () => {
    const tree = renderer.create(view).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the podcast info', async() => {
    render(view);

    await waitFor(() => {
      const podcast = screen.queryByTestId('podcast-info');
      expect(podcast).toBeInTheDocument();
    });
  });

  it('navigates from episode page to the podcast page', async () => {
    render(view);

    await waitFor(() => {
      const podcastInfo = screen.queryByTestId('episode');
      expect(podcastInfo).toBeInTheDocument();
    });

    let link = screen.getByAltText('All Songs Considered');
    userEvent.click(link);

    await waitFor(() => {
      const episode = screen.queryByTestId('podcast');
      expect(episode).toBeInTheDocument();
    });
  });
});
