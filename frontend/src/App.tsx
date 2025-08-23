import { Routes, Route } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import ArticlePage from "@/pages/ArticlePage";
import About from "@/pages/About";
import Contacts from "@/pages/Contacts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="article" element={<ArticlePage />} />
        <Route path="about" element={<About />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
    </Routes>
  );
}
