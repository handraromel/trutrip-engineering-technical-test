import { useState } from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/home',
      icon: 'pi pi-home',
    },
    {
      id: 'users',
      label: 'Users',
      href: '/users',
      icon: 'pi pi-users',
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-teal-500 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-white">TruTrip Test</h1>
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden items-center space-x-6 md:flex">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-teal-100 hover:bg-teal-600 hover:text-white'
                  }`
                }
              >
                {item.icon && <i className={item.icon} />}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-teal-100 transition-colors duration-200 hover:bg-teal-600 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset md:hidden"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {/* Burger Icon */}
            <i className={`pi ${isMobileMenuOpen ? 'pi-times' : 'pi-bars'} text-lg`}></i>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
          }`}
        >
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-md px-3 py-3 text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-teal-100 hover:bg-teal-600 hover:text-white'
                  }`
                }
              >
                {item.icon && <i className={item.icon} />}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
