import React, { useState } from 'react';
import {
  User,
  Apple,
  Dumbbell,
  LineChart,
  Bell,
  Menu,
  X,
  Home,
  ChevronRight
} from 'lucide-react';

type Section = 'home' | 'profile' | 'nutrition' | 'workouts' | 'progress' | 'notifications';

interface MenuItem {
  id: Section;
  label: string;
  icon: React.ReactNode;
  notifications?: number;
}

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'Perfil',
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 'nutrition',
      label: 'Plano Nutricional',
      icon: <Apple className="w-5 h-5" />,
      notifications: 2,
    },
    {
      id: 'workouts',
      label: 'Treinos',
      icon: <Dumbbell className="w-5 h-5" />,
      notifications: 1,
    },
    {
      id: 'progress',
      label: 'Progresso',
      icon: <LineChart className="w-5 h-5" />,
    },
    {
      id: 'notifications',
      label: 'Notificações',
      icon: <Bell className="w-5 h-5" />,
      notifications: 3,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigateTo = (section: Section) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 text-gray-900 hover:text-blue-600"
              >
                <Home className="w-6 h-6" />
                <span className="font-bold text-lg">FitJourney</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md relative
                    ${currentSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  {item.icon}
                  {item.label}
                  {item.notifications && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.notifications}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden rounded-md p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={toggleMobileMenu} />
          <nav className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md relative
                    ${currentSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </div>
                  <div className="flex items-center">
                    {item.notifications && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2">
                        {item.notifications}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          {currentSection === 'home' && (
            <div className="py-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Bem-vindo ao FitJourney</h1>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        {item.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.notifications 
                            ? `${item.notifications} atualizações pendentes`
                            : 'Nenhuma atualização pendente'}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumo da Semana</h2>
                <div className="grid gap-6 md:grid-cols-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Treinos Realizados</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">4/5</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Calorias (média)</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">2.100</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Água (média)</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">2.5L</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Peso Atual</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">75kg</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder para outras seções */}
          {currentSection !== 'home' && (
            <div className="py-12 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                Seção de {menuItems.find(item => item.id === currentSection)?.label}
              </h2>
              <p className="mt-4 text-gray-500">
                Conteúdo da seção será cregado aqui
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
