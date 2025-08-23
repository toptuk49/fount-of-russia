import { Link } from "react-router";

export default function Home() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="mb-10 text-center text-4xl font-bold">
        Добро пожаловать в «Кладезь России»
      </h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-700">
        Погрузитесь в богатое культурное и историческое наследие нашей страны.
        Здесь мы собираем уникальные статьи, исследования и материалы.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Link
          to="/article"
          className="block overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg"
        >
          <div className="flex h-48 items-center justify-center bg-gray-200">
            <span className="text-gray-500">[Картинка статьи]</span>
          </div>
          <div className="p-6">
            <h2 className="mb-2 text-2xl font-semibold">
              Название твоей статьи
            </h2>
            <p className="mb-4 text-gray-600">
              Краткое описание статьи, чтобы заинтересовать читателя и
              пригласить прочитать полный текст.
            </p>
            <span className="inline-block font-medium text-blue-600">
              Читать →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
