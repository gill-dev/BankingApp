import { ReactFCWithChildren } from 'types/react';
import { useAuth } from '../hooks/useAuth';
import { useGetCurrentUserQuery } from '../api';

export const Profile: ReactFCWithChildren = ({ children }) => {
  const { data, error, isError, isLoading, isUninitialized } = useGetCurrentUserQuery();
  const { user } = useAuth();

  return (
    <section className="profile">
     {`${user?.firstName} ${user?.lastName}`}
    </section>
  );
};
