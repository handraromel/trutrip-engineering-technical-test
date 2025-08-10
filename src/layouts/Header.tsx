import { NavLink } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

const Header = () => {
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

  return (
    <header className="sticky top-0 z-50 bg-teal-500 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-10 py-4">
          <div className="flex items-center">
            <h1 className="text-900 ml-4 text-xl font-semibold text-white">TruTrip Test</h1>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-6">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
