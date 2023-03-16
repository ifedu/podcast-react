import React from 'react';

import './Loading.css';
import loading from '../../assets/loading.gif';
import { useLoading } from '../../context/LoadingContext';

export function Loading() {
  const { isLoading } = useLoading();

  return (
    <div className='Loading'>
      {isLoading && <img src={loading}></img>}
    </div>
  );
}
