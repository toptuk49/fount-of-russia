import { useState, useEffect } from "react";
import { Link } from "react-router";
import AuthModal from "@/components/AuthModal";

export default function Header() {
  const [authOpen, setAuthOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Логотип */}
          <Link to="/" className="">
            <img src="/logo.png" alt="Кладезь России" className="w-32" />
          </Link>

          {/* Навигация */}
          <nav className="hidden space-x-6 md:flex">
            <Link to="/" className="transition hover:text-red-600">
              Главная
            </Link>
            <Link to="/about" className="transition hover:text-red-600">
              О проекте
            </Link>
            <Link to="/contacts" className="transition hover:text-red-600">
              Контакты
            </Link>
          </nav>

          {/* Авторизация / Имя пользователя */}
          <div className="flex items-center space-x-4">
            {username ? (
              <>
                <span className="font-medium text-gray-700">{username}</span>
                <button
                  onClick={handleLogout}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  Выйти
                </button>
              </>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authOpen}
        onClose={() => {
          setAuthOpen(false);
          const storedUsername = localStorage.getItem("username");
          if (storedUsername) {
            setUsername(storedUsername);
          }
        }}
      />
    </>
  );
}
