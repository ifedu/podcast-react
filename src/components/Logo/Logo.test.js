import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create } from 'react-test-renderer' ;
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Logo } from './Logo';

const getContent = (pathname = '/') =>
  <MemoryRouter initialEntries={[{ pathname }]}>
    <div className='head'>
      <Logo/>
    </div>

    <Routes>
      <Route path='/' element={<div data-testid='main'></div>}></Route>
      <Route path='/foo' element={<div></div>}></Route>
    </Routes>
  </MemoryRouter>;

describe('Logo', () => {
  const content = getContent();

  afterEach(cleanup);

  it('renders correctly', () => {
    const tree = create(content).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the logo', () => {
    render(content);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('navigates to the main page', async () => {
    const content = getContent('/foo');

    render(content);

    await waitFor(() => {
      const main = screen.queryByTestId('main');
      expect(main).toBeNull();
    });

    const logo = screen.queryByTestId('logo');
    userEvent.click(logo);

    await waitFor(() => {
      const main = screen.queryByTestId('main');
      expect(main).toBeInTheDocument();
    });
  });
});
