import {Header} from '@/modules/Dashboard/Header/Header';
import '@/src/styles/global.scss';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <div className='flex-grow-0 flex-shrink-0 basis-auto'>
        <Header />
      </div>
      <div className='flex justify-center text-center h-[100vh] mt-5 w-1/3 mx-auto my-5 lg:w-1/2 md:w-full md:px-5'>
        {children}
      </div>
    </div>
  );
}
