import { Outlet } from "react-router";
import Header from "@/components/Header";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-red-600 p-4 text-center text-white">
        Copyright © 2025 Кладезь России. Все права защищены.
      </footer>
    </div>
  );
}
