import Sidebar from '@components/shared/Sidebar';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="root">
      <Sidebar />

      <div className="root-container">
        <div className="wrapper">
          <Header />
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
