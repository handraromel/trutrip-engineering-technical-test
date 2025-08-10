import Container from '@/layouts/Container';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen text-[#03363d]">
      <div className="flex flex-1 flex-col">
        <Header />

        <main className="relative flex-1 p-2 sm:p-4 lg:p-6">
          <div className="mx-auto h-full w-full max-w-full">
            <Container>{children}</Container>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
