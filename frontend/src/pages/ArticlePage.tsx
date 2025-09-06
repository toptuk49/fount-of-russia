import LikeDislike from "@/components/LikeDislike";

export default function ArticlePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gray-100 py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Дорога Мужества</h1>
        <p className="text-lg text-gray-700">
          Железная дорога, ставшая символом стойкости и силы русского народа
        </p>
      </section>

      {/* Content */}
      <article className="prose prose-lg prose-red mx-auto max-w-4xl px-4 py-8">
        {/* Вступление */}
        <p className="text-lg leading-relaxed text-gray-700">
          <span className="font-serif italic underline decoration-red-300">
            Дорога Мужества
          </span>
          , или, как её еще называют местные —{" "}
          <span className="font-serif italic underline decoration-red-300">
            Осколяночка
          </span>
          . Именно такое название гордо носит{" "}
          <span className="font-semibold text-red-600">железная дорога</span>,
          идущая по маршруту{" "}
          <span className="italic">Старый Оскол — Ржава</span>, ставшая символом
          спасения для народа в период Великой Отечественной Войны, а также ещё
          раз подтверждающая{" "}
          <span className="font-semibold text-gray-900 italic">
            стойкость и силу русского народа
          </span>
          .
        </p>

        {/* Первый интересный факт */}
        <div className="my-10 rounded-xl bg-red-50 p-6 shadow-sm">
          <h2 className="mt-0 font-semibold text-red-800">Это интересно</h2>
          <p className="my-4">
            <span className="italic">Дорога Мужества</span> — двухпутная
            железнодорожная линия Старый Оскол — Сараевка (ранее — Ржава),
            построенная в <span className="font-semibold">1943 году</span> при
            подготовке к Курской битве для усиления действовавшей на Курском
            выступе однопутной железной дороги Касторная — Мармыжи — Курск —
            Льгов.
          </p>
        </div>

        <p className="my-4">
          <span className="text-xl font-semibold italic underline decoration-red-500">
            217
          </span>{" "}
          — именно такой номер был присвоен этому важному строительному объекту,
          протяженностью <span className="italic">всего 95 км</span>. После
          ввода дороги в эксплуатацию время доставки грузов к линии фронта было
          уменьшено приблизительно на{" "}
          <span className="font-semibold italic">двое суток</span>.
        </p>

        <p className="my-4">
          Постановление о строительстве дороги было принято{" "}
          <span className="italic">
            <span className="underline">ГКО</span> (Государственный Комитет
            Обороны)
          </span>{" "}
          <span className="font-semibold">8 июня 1943 года</span>, а{" "}
          <span className="font-semibold">15 июня</span> первые трудовые отряды
          приступили к возведению путей. Две трети участка (68 км) нужно было
          построить заново, а 27 км предстояло реконструировать из старой
          одноколейки, расположенной в районе Курской магнитной аномалии. На
          работы было отведено{" "}
          <span className="font-semibold italic">2 месяца</span>, но дорога была
          построена всего за{" "}
          <span className="font-semibold italic">32 дня</span>.
        </p>

        {/* Второй интересный факт - Участники строительства */}
        <div className="my-10 rounded-xl bg-amber-50 p-6 shadow-sm">
          <h2 className="mt-0 font-semibold text-amber-800">Это интересно</h2>
          <p className="my-4">
            В <span className="italic">строительстве</span> дороги под
            руководством генерал-майора{" "}
            <span className="italic">П. А. Кабанова</span> участвовали:
          </p>
          <ul className="list-none space-y-2 pl-0">
            <li className="flex items-start">
              <span className="mt-1 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
              три железнодорожные бригады
            </li>
            <li className="flex items-start">
              <span className="mt-1 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
              спецформирования НКПС
            </li>
            <li className="flex items-start">
              <span className="mt-1 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
              2 тысячи красноармейцев из запасных частей
            </li>
            <li className="flex items-start">
              <span className="mt-1 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-600"></span>
              около 20 тысяч человек местного населения. Из них — около 8 тысяч
              человек жители Старооскольского района, в основном женщины и
              подростки.
            </li>
          </ul>
        </div>

        <p className="my-4">
          Начальником железнодорожной станции Старый Оскол в это время был{" "}
          <span className="italic">Подойников Иван Григорьевич</span>,
          награждённый{" "}
          <span className="font-semibold">
            Орденом Трудового Красного Знамени
          </span>{" "}
          (1905 д. Бабровы Дворы — 1975 г. Старый Оскол, Каплинское кладбище).
        </p>

        <p className="my-4">
          В строительстве приняли участие{" "}
          <span className="font-semibold italic">25 тысяч человек</span>. За
          этими сухими цифрами стоят реальные люди, которые, не щадя своих сил,{" "}
          <span className="italic underline">работали по 20 часов в сутки</span>
          . Основная масса людей —{" "}
          <span className="font-semibold">женщины и подростки</span>, их было
          примерно <span className="italic">20 тысяч</span> человек. На их долю
          пришлось возведение насыпей.{" "}
          <span className="italic">
            При норме в{" "}
            <span className="font-semibold">
              3,5 м<sup>3</sup>
            </span>{" "}
            земли они укладывали{" "}
            <span className="font-semibold">
              4, 5 и даже 6 м<sup>3</sup>
            </span>
          </span>{" "}
          — и это при нехватке еды и отсутствии даже самых простых инструментов.
          Временами землю приходилось носить даже в{" "}
          <span className="italic">фартуках</span>.
        </p>

        <p className="my-4">
          Страшнее всего были <span className="italic">бомбежки</span>. Немцы
          регулярно <span className="italic">бомбили</span> район строительства,
          но, казалось, этим только добавляли сил и ненависти к врагу —{" "}
          <span className="font-semibold italic">
            строительство шло умноженными темпами, работа велась в две смены
          </span>
          .
        </p>

        <p className="my-4">
          Кроме гражданского населения на объект прибыли специальные
          формирования Народного комиссариата путей сообщения, три
          железнодорожные бригады, два автобатальона, две тысячи красноармейцев
          из запасных частей. Но главным участником строительства по-прежнему
          было мирное население.{" "}
          <span className="italic">
            Дети <span className="font-semibold">13—14 лет</span> приписывали
            себе по <span className="font-semibold">два-три года</span>, чтобы
            внести свой скромный вклад в победу. Просто потому, что знали: их
            помощь нужна отцам, братьям и всем тем, кто был непосредственно на{" "}
            <span className="font-semibold">передовой</span>.
          </span>
        </p>

        <p className="my-4">
          <span className="font-semibold">17 июля 1943 года</span> были
          завершены основные работы, а уже{" "}
          <span className="font-semibold">19-го июля</span> по дороге прошел{" "}
          <span className="italic">первый поезд</span>. За месяц с небольшим
          было проложено{" "}
          <span className="italic underline">
            168 км железнодорожных путей, 48 сооружений, 8 остановочных пунктов
          </span>
          . На фронт везли личный состав, технику, оружие, боеприпасы, горючее,
          продовольствие, фураж, а обратно отправляли раненых.
        </p>

        <p className="my-4">
          Проложенные железнодорожные пути оказались{" "}
          <span className="italic">
            почти на <span className="font-semibold">150 км короче</span>, чем
            действующая{" "}
            <span className="font-semibold">автомобильная дорога</span>.
          </span>{" "}
          Это дало возможность существенно сократить сроки подвоза оборудования
          и продовольствия. Воронежский фронт получил{" "}
          <span className="italic">
            самостоятельную инженерную коммуникацию
          </span>
          , выход на железнодорожный участок{" "}
          <span className="italic">
            Ржава — Обоянь и дорогу Белгород — Курск
          </span>
          .
        </p>

        <p className="rounded-md bg-green-50 p-4 text-center font-semibold text-green-800">
          <span className="font-serif text-2xl">306</span> человек были отмечены
          правительственными наградами.
        </p>

        <p className="my-4 font-semibold">
          Поподробней разберем{" "}
          <span className="text-red-700 italic">значение</span> этой дороги:
        </p>

        <p className="rounded-lg border-l-4 border-red-400 bg-gray-50 p-5">
          Новая линия <span className="font-semibold">разгрузила</span>{" "}
          железнодорожную линию{" "}
          <span className="italic">Касторная — Курск</span>, Воронежский фронт{" "}
          <span className="font-semibold">получил</span>{" "}
          <span className="italic">
            самостоятельную железнодорожную коммуникацию
          </span>
          , <span className="font-semibold">выход</span> на рокадную дорогу{" "}
          <span className="italic">Курск — Белгород</span> и на изолированный
          железнодорожный участок <span className="italic">Ржава — Обоянь</span>
          . Ввод дороги{" "}
          <span className="font-semibold italic">
            ускорил доставку грузов к линии фронта на 24—48 часов
          </span>
          , так как сократил дальность доставки грузов автотранспортом на{" "}
          <span className="font-semibold">120—150 километров</span>. Дорога была{" "}
          <span className="font-semibold">использована</span> для организации
          кольцевого одностороннего движения поездов по маршруту{" "}
          <span className="italic">
            Касторная — Курск — Сараевка — Старый Оскол
          </span>
          , что значительно <span className="font-semibold">увеличило</span>{" "}
          провозную способность железных дорог на{" "}
          <span className="italic">Воронежском и Центральном фронтах</span> во
          время Курской битвы и способствовало её{" "}
          <span className="font-semibold italic">победоносному</span>{" "}
          завершению.
        </p>

        <p className="my-4 text-lg font-medium text-gray-800">
          Используется ли эта дорога <span className="italic">сейчас?</span> И
          какова её эксплуатация на данный момент времени?
        </p>

        <p className="my-4">
          После окончания Великой Отечественной войны и начала разработки{" "}
          <span className="italic">Курской магнитной аномалии</span> линия
          получила{" "}
          <span className="font-semibold">важное промышленное значение</span>.
        </p>

        <p className="my-4">
          В <span className="font-semibold">1960-х — 1970-х годах</span> от
          основной линии были отведены ответвления, обслуживающие{" "}
          <span className="italic underline">Лебединский</span> и{" "}
          <span className="italic underline">
            Стойленский горно-обогатительные комбинаты
          </span>
          . В <span className="font-semibold">1999 году</span> участок{" "}
          <span className="italic">Старый Оскол — Стойленская</span> был
          электрифицирован.
        </p>

        <p className="my-4">
          По состоянию на <span className="font-semibold">2009 год</span> линия{" "}
          <span className="italic">Старый Оскол — Сараевка</span> используется
          как для{" "}
          <span className="font-semibold italic">
            грузового, так и для пассажирского сообщения
          </span>
          . В рамках «Федеральной целевой программы развития железнодорожного
          транспорта» планировалось до{" "}
          <span className="font-semibold">2018 года</span> полностью
          электрифицировать участок Стойленская — Сараевка.
        </p>

        <p className="my-4">
          По данной ветке проходят{" "}
          <span className="font-semibold">поезда дальнего следования</span>:{" "}
          <span className="italic">Старый Оскол — Москва — Старый Оскол</span>,{" "}
          <span className="italic">Белгород — Новосибирск — Белгород</span>, по
          маршруту{" "}
          <span className="italic">Старый Оскол — Ржава — Старый Оскол</span>{" "}
          (по состоянию на <span className="font-semibold">2014 год</span>).
          Пригородное сообщение возобновлено, но в меньшем объёме.
        </p>

        {/* Цитата */}
        <div className="my-12">
          <blockquote className="bg-red-25 border-l-4 border-red-400 pl-6 text-gray-700 italic sm:pl-8">
            <p className="text-base">
              «…геройски трудилось население на строительстве железнодорожной
              линии Старый Оскол – Ржава. Её строительство было начато накануне
              битвы на Курской дуге для обеспечения перевозки грузов войск
              Воронежского фронта. По решению Государственного Комитета Обороны
              надо в кратчайший срок построить дорогу со всеми сооружениями
              протяжённостью 95 километров. На строительство дороги вместе с
              железнодорожными воинскими частями работало 25 тысяч человек
              гражданского населения и 1280 подвод. Как только стало известно о
              начавшемся наступлении немцев под Орлом и Белгородом, на стройке
              была объявлена фронтовая пятидневка. Люди работали днём и ночью.
              Ни минуты простоя! – таков был лозунг строителей. Ничто – ни
              прифронтовые условия работы, ни налёты вражеской авиации не могли
              замедлить темпов работы. Благодаря героическому труду строителей в
              разгар боёв на Курской дуге 19 июля по новой дороге прошли первые
              эшелоны с войсками и грузами. Задание Государственного Комитета
              Обороны было выполнено досрочно: за 32 дня вместо 60.»
            </p>
            <footer className="mt-4 text-gray-500 not-italic">
              — <span className="font-semibold">Н. Васильев</span> – первый
              секретарь Белгородского обкома КПСС. В книге: «Они отстояли жизнь»
              сборник фронтовых очерков. Белгород, 1968г.
            </footer>
          </blockquote>
        </div>

        <p className="my-4">
          В <span className="font-semibold">2008 году</span> в Старом Осколе был
          установлен{" "}
          <span className="italic underline">
            памятник строителям железной дороги
          </span>
          .
        </p>
      </article>
      <div className="mb-8 ml-8">
        <LikeDislike slug="home" />
      </div>
    </div>
  );
}
