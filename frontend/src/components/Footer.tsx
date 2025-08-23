export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
        <p className="text-sm">
          © {new Date().getFullYear()} Кладезь России. Все права защищены.
        </p>
        <nav className="flex gap-4 text-sm">
          <a href="#" className="hover:text-white">
            О проекте
          </a>
          <a href="#" className="hover:text-white">
            Политика конфиденциальности
          </a>
          <a href="#" className="hover:text-white">
            Контакты
          </a>
        </nav>
      </div>
    </footer>
  );
}
