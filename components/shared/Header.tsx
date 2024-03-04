import React from 'react';
import { useAuth } from '@sections/auth';
import { useGetCurrentUserQuery } from '@sections/auth';
import { topLinks } from 'config';
import Link from 'next/link';

const Header = () => {
  const { user } = useAuth();
  const {} = useGetCurrentUserQuery();
  return (
    <header>
      <nav className="bg-white px-6 border-b border-width border-color pb-4">
        <span className="self-center h1-semibold">{`${user?.firstName} ${user?.lastName}`}</span>

      </nav>
    </header>
  );
};

export default Header;
