import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';

export function Logo() {
  return (
    <Link to={'/'} data-testid='logo'>
      <div className='Logo'>
        <div>Podcaster</div>
      </div>
    </Link>
  );
}
