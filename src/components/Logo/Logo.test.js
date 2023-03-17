import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer' ;
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Logo } from './Logo';
import { Main } from '../../views/Main/Main';
import { LoadingProvider } from '../../context/LoadingContext';

afterEach(cleanup);

describe(Logo.name, () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MemoryRouter><Logo/></MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the logo', () => {
    render(<MemoryRouter><Logo/></MemoryRouter>);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('navigates to the home page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <LoadingProvider>
          <Logo/>
          <Routes>
            <Route path="/" element={<Main/>} />
          </Routes>
        </LoadingProvider>
      </MemoryRouter>
    );

    const logo = screen.getByTestId('logo');
    userEvent.click(logo);

    await waitFor(() => {
      const main = screen.getByTestId('main');
      expect(main).toBeInTheDocument();
    });
  });
});
