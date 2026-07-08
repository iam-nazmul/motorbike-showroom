import { useEffect, useState } from 'react';

type Model = {
  name: string;
  category: string;
  price: string;
  tagline: string;
  image: string;
};

type Offer = {
  title: string;
  detail: string;
  image: string;
};

type ShowroomData = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
    cta: string;
    secondary: string;
  };
  featuredModels: Model[];
  offers: Offer[];
  highlights: string[];
};

const defaultData: ShowroomData = {
  hero: {
    eyebrow: 'Honda Bangladesh',
    title: 'বাংলাদেশের সেরা Honda motorcycle showroom',
    subtitle: 'ঢাকা, চট্টগ্রাম ও দেশের যেকোনো শহরে Honda-এর নতুন sport, touring ও commuter motorcycles দেখুন। অফিশিয়াল ডিলার সাপোর্ট, ফিনান্সিং সহ সর্বশেষ অফার পেয়ে যান।',
    image: 'https://powersports.honda.com/-/media/feature/powersports/home/hero-slides/2026/july-bonus-bucks-hphs/sportbike-1321x1536.jpg',
    cta: 'ডিলার খুঁজুন',
    secondary: 'অফার দেখুন',
  },
  featuredModels: [
    {
      name: 'CBR650R E-Clutch',
      category: 'Sport',
      price: 'শুরু Tk 12,50,000',
      tagline: 'শহরবাসীর জন্য শক্তিশালী পারফরম্যান্স ও আরামদায়ক চালনা।',
      image: 'https://powersports.honda.com/-/media/products/family/cbr650r/trims/trim-main/cbr650r-e-clutch/2025/2025-cbr650r-e-clutch-grand_prix_red-1505x923.png?imwidth=776',
    },
    {
      name: 'CBR500R',
      category: 'Sport',
      price: 'শুরু Tk 9,20,000',
      tagline: 'সাশ্রয়ী দাম, প্রিমিয়াম ফিট, আর সাহসী ডিজাইন।',
      image: 'https://powersports.honda.com/-/media/products/family/cbr500r/trims/trim-main/cbr500r/2025/2025-cbr500r-grand_prix_red-1505x923.png?imwidth=776',
    },
    {
      name: 'Gold Wing Tour',
      category: 'Touring',
      price: 'শুরু Tk 38,00,000',
      tagline: 'লং-ট্যুরের জন্য আরাম, প্রযুক্তি ও নির্ভরযোগ্যতা।',
      image: 'https://powersports.honda.com/-/media/feature/powersports/home/hero-slides/2026/july-bonus-bucks-hphs/goldwing-1321x1536.jpg',
    },
    {
      name: 'CRF450R',
      category: 'Motocross',
      price: 'শুরু Tk 12,80,000',
      tagline: 'রেস-প্রুফ পারফরম্যান্স, ট্র্যাক-প্রেমী রাইডারদের জন্য আদর্শ।',
      image: 'https://powersports.honda.com/-/media/feature/powersports/home/hero-slides/2026/2027-450r/2027-450r-hph-1321x1536.jpg',
    },
  ],
  offers: [
    {
      title: '২০২৫ CBR650R E-Clutch-এ Tk ১,০০,০০০ পর্যন্ত বিশেষ অফার',
      detail: 'Honda-এর বিশেষ ফিনান্সিং ও ডিলার অফারের মাধ্যমে আরও সাশ্রয়ী মূল্যে নিন আপনার প্রিয় মোটরসাইকেল।',
      image: 'https://powersports.honda.com/-/media/products/family/cbr650r/trims/trim-main/cbr650r-e-clutch/2025/2025-cbr650r-e-clutch-grand_prix_red-1505x923.png?imwidth=776',
    },
    {
      title: '২০২৫ CBR500R-এ বিশেষ ডিসকাউন্ট অফার',
      detail: 'সীমিত সময়ের জন্য Honda-এর middleweight sport লাইনে বিশেষ মূল্যছাড় ও ডিলার সুবিধা।',
      image: 'https://powersports.honda.com/-/media/products/family/cbr500r/trims/trim-main/cbr500r/2025/2025-cbr500r-grand_prix_red-1505x923.png?imwidth=776',
    },
    {
      title: 'Gold Wing-এ Tk 2,00,000 পর্যন্ত বিশেষ সুবিধা',
      detail: 'প্রিমিয়াম ট্যুরিং আরাম, বিলাসবহুল ফিচার আর ডিলার সাপোর্টের সঙ্গে আরও সহজে।',
      image: 'https://powersports.honda.com/-/media/feature/powersports/home/hero-slides/2026/july-bonus-bucks-hphs/goldwing-1321x1536.jpg',
    },
  ],
  highlights: ['মডেল তুলনা করুন', 'ইনভেন্টরি দেখুন', 'মূল্যবান তথ্য নিন', 'নিকটস্থ ডিলার খুঁজুন'],
};

type ToolKey = 'compare' | 'inventory' | 'price' | 'dealer';

const toolButtons: Array<{ key: ToolKey; label: string }> = [
  { key: 'compare', label: 'Find & Compare' },
  { key: 'inventory', label: 'Search Inventory' },
  { key: 'price', label: 'Build & Price' },
  { key: 'dealer', label: 'Find a Dealer' },
];

const dealers = [
  { city: 'Dhaka', area: 'Gulshan', phone: '+880 1712-345678', address: 'House 12, Road 7, Gulshan 1' },
  { city: 'Chattogram', area: 'GEC Circle', phone: '+880 1811-987654', address: 'Shop 4, GEC Circle, Muradpur' },
  { city: 'Rajshahi', area: 'Boalia', phone: '+880 1911-123456', address: '88/A, Boalia Main Road' },
];

function App() {
  const [data, setData] = useState<ShowroomData>(defaultData);
  const [activeTool, setActiveTool] = useState<ToolKey>('compare');
  const [inventoryQuery, setInventoryQuery] = useState('');
  const [inventoryCategory, setInventoryCategory] = useState('All');
  const [compareA, setCompareA] = useState(0);
  const [compareB, setCompareB] = useState(1);
  const [selectedModel, setSelectedModel] = useState('CBR650R E-Clutch');
  const [financeTerm, setFinanceTerm] = useState('36');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/showroom')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData(defaultData));
  }, []);

  const models = data.featuredModels;
  const filteredModels = models.filter((model) => {
    const queryMatch = `${model.name} ${model.category}`.toLowerCase().includes(inventoryQuery.toLowerCase());
    const categoryMatch = inventoryCategory === 'All' || model.category === inventoryCategory;
    return queryMatch && categoryMatch;
  });

  const compareModelA = models[compareA] ?? models[0];
  const compareModelB = models[compareB] ?? models[1];
  const selectedBike = models.find((m) => m.name === selectedModel) ?? models[0];
  const monthlyInstallment = financeTerm === '24' ? 'Tk 68,000' : financeTerm === '36' ? 'Tk 45,000' : 'Tk 39,000';

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.2),_transparent_25%),linear-gradient(135deg,_#05070b,_#111827)] text-slate-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-red-500">Honda Powersports</p>
          <h1 className="text-2xl font-semibold">Official Motorcycles Showroom</h1>
        </div>
        <button className="rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300">
          Book a Test Ride
        </button>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-16 lg:px-8">
        <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_0_45px_rgba(220,38,38,0.12)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <p className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-sm text-red-300">
                {data.hero.eyebrow}
              </p>
              <h2 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
                {data.hero.title}
              </h2>
              <p className="max-w-2xl text-lg text-slate-300">{data.hero.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#models" className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white">
                {data.hero.cta}
              </a>
              <a href="#offers" className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200">
                {data.hero.secondary}
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {data.highlights.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-3">
            <img src={data.hero.image} alt="Honda motorcycle hero" className="h-[420px] w-full rounded-[1.25rem] object-cover" />
            <div className="absolute bottom-8 left-8 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-slate-100 backdrop-blur">
              Official Honda Powersports imagery
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl">
          <div className="grid gap-3 md:grid-cols-4">
            {toolButtons.map((tool) => (
              <button
                key={tool.key}
                onClick={() => setActiveTool(tool.key)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${activeTool === tool.key ? 'border-red-500 bg-red-600 text-white' : 'border-white/10 bg-white/5 text-slate-300'}`}
              >
                {tool.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6">
            {activeTool === 'compare' && (
              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-slate-400">
                      Select Model A
                      <select value={compareA} onChange={(e) => setCompareA(Number(e.target.value))} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-slate-100">
                        {models.map((model, index) => (
                          <option key={model.name} value={index}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-sm text-slate-400">
                      Select Model B
                      <select value={compareB} onChange={(e) => setCompareB(Number(e.target.value))} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-slate-100">
                        {models.map((model, index) => (
                          <option key={model.name} value={index}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Model A</p>
                      <p className="mt-1 font-semibold">{compareModelA.name}</p>
                      <p className="text-sm text-slate-400">{compareModelA.category}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-slate-400">Model B</p>
                      <p className="mt-1 font-semibold">{compareModelB.name}</p>
                      <p className="text-sm text-slate-400">{compareModelB.category}</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-red-500/20 bg-red-600/10 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-red-300">Comparison summary</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-200">
                    <div className="flex items-center justify-between rounded-xl bg-slate-950/60 px-3 py-2">
                      <span>Price</span>
                      <span>{compareModelA.price}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-950/60 px-3 py-2">
                      <span>Price</span>
                      <span>{compareModelB.price}</span>
                    </div>
                    <div className="rounded-xl bg-slate-950/60 px-3 py-2">
                      <p className="text-slate-400">Best fit</p>
                      <p className="mt-1 font-semibold">
                        {compareModelA.price === compareModelB.price ? 'Both are strong picks' : compareModelA.price < compareModelB.price ? compareModelA.name : compareModelB.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTool === 'inventory' && (
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <input
                    value={inventoryQuery}
                    onChange={(e) => setInventoryQuery(e.target.value)}
                    placeholder="Search by model or category"
                    className="rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-slate-100"
                  />
                  <select value={inventoryCategory} onChange={(e) => setInventoryCategory(e.target.value)} className="rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-slate-100">
                    <option value="All">All categories</option>
                    <option value="Sport">Sport</option>
                    <option value="Touring">Touring</option>
                    <option value="Motocross">Motocross</option>
                  </select>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {filteredModels.map((model) => (
                    <div key={model.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm uppercase tracking-[0.25em] text-red-400">{model.category}</p>
                      <p className="mt-2 font-semibold">{model.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{model.tagline}</p>
                      <p className="mt-2 text-sm text-red-300">{model.price}</p>
                    </div>
                  ))}
                  {filteredModels.length === 0 && <p className="text-sm text-slate-400">No motorcycles match this search.</p>}
                </div>
              </div>
            )}

            {activeTool === 'price' && (
              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div className="space-y-4">
                  <label className="text-sm text-slate-400">
                    Choose a model
                    <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-slate-100">
                      {models.map((model) => (
                        <option key={model.name} value={model.name}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm text-slate-400">
                    Finance term
                    <select value={financeTerm} onChange={(e) => setFinanceTerm(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-slate-100">
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                    </select>
                  </label>
                </div>
                <div className="rounded-[1.25rem] border border-red-500/20 bg-red-600/10 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-red-300">Price estimate</p>
                  <h4 className="mt-3 text-2xl font-semibold">{selectedBike?.name}</h4>
                  <p className="mt-2 text-slate-300">{selectedBike?.price}</p>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
                    <p>Estimated monthly EMI: {monthlyInstallment}</p>
                    <p className="mt-2">Includes Honda dealer support, registration, and standard accessories.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTool === 'dealer' && (
              <div className="grid gap-4 md:grid-cols-3">
                {dealers.map((dealer) => (
                  <div key={dealer.city} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-red-400">{dealer.city}</p>
                    <p className="mt-2 font-semibold">{dealer.area}</p>
                    <p className="mt-2 text-sm text-slate-400">{dealer.address}</p>
                    <p className="mt-2 text-sm text-slate-300">{dealer.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="models" className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-red-400">Featured lineup</p>
              <h3 className="text-2xl font-semibold">সিটি রাইড, ট্যুরিং আর রেসিং—সবকিছুর জন্য Honda</h3>
            </div>
            <p className="text-sm text-slate-400">বাংলাদেশে Honda motorcycle-এর বাস্তব ডিলার মূল্য ও সর্বশেষ লাইনের সমাহার</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.featuredModels.map((model) => (
              <div key={model.name} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/80">
                <img src={model.image} alt={model.name} className="h-40 w-full object-cover" />
                <div className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm uppercase tracking-[0.25em] text-red-400">{model.category}</p>
                    <span className="text-xs text-slate-400">Official</span>
                  </div>
                  <h4 className="text-lg font-semibold">{model.name}</h4>
                  <p className="text-sm text-slate-400">{model.tagline}</p>
                  <p className="text-sm font-medium text-red-300">{model.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="offers" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-red-400">Current offers</p>
            <h3 className="mt-2 text-2xl font-semibold">Honda-এর বিশেষ অফার ও ডিলার ছাড়</h3>
            <p className="mt-3 text-slate-400">বাংলাদেশি গ্রাহকদের জন্য ডিজাইন করা এই অফারগুলো আপনাকে Honda motorcycle কেনার সময় আরও সহজ, সাশ্রয়ী ও নির্ভরযোগ্য করে তুলবে।</p>
            <div className="mt-6 space-y-3">
              {data.offers.map((offer) => (
                <div key={offer.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-slate-100">{offer.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{offer.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-red-600/20 via-slate-900 to-slate-950 p-6">
            <div className="rounded-[1.5rem] border border-red-500/20 bg-slate-950/70 p-4">
              <img src={data.hero.image} alt="Honda motorcycle preview" className="h-64 w-full rounded-[1.25rem] object-cover" />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-red-400">Explore more</p>
                  <h4 className="text-xl font-semibold">আপনার জন্য সঠিক Honda motorcycle বেছে নিন</h4>
                </div>
                <a href="#" className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-200">মূল্য ও বৈশিষ্ট্য দেখুন</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80 px-6 py-8 text-sm text-slate-400 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Honda Bangladesh. সকল তথ্য বাংলাদেশের গ্রাহকদের জন্য প্রযোজ্য।</p>
          <div className="flex flex-wrap gap-4">
            <span>ডিলার খুঁজুন</span>
            <span>HondaCare</span>
            <span>এক্সেসরিজ</span>
            <span>যোগাযোগ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
