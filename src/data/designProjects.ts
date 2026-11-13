export interface DesignPiece {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  /* Position and size in board space (unzoomed world units). */
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  /* 0 = far (blurred, dim), 1 = mid, 2 = near (crisp). Drives depth + parallax. */
  layer: 0 | 1 | 2;
}

/* Board bounds in world units. The view is fitted to this on open. */
export const BOARD_W = 2300;
export const BOARD_H = 1650;

/* NOTE: placeholder work. Swap the titles/images for real projects — the
   layout only reads x/y/w/h/rot/layer, so nothing else needs to change. */
export const designPieces: DesignPiece[] = [
  {
    id: "menteiz",
    title: "Menteiz Aviation",
    category: "Web",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=75",
    x: 900,
    y: 560,
    w: 520,
    h: 340,
    rot: -1,
    layer: 2,
  },
  {
    id: "kargo360",
    title: "Kargo360 App",
    category: "Mobile",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=75",
    x: 470,
    y: 300,
    w: 330,
    h: 430,
    rot: -4,
    layer: 2,
  },
  {
    id: "flebo",
    title: "Flebo Redesign",
    category: "Web",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=75",
    x: 1510,
    y: 900,
    w: 380,
    h: 260,
    rot: 3,
    layer: 2,
  },
  {
    id: "typebin",
    title: "Type bin",
    category: "Type",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=75",
    x: 150,
    y: 700,
    w: 300,
    h: 400,
    rot: 5,
    layer: 1,
  },
  {
    id: "nordstead",
    title: "Nordstead",
    category: "Brand",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=75",
    x: 320,
    y: 120,
    w: 320,
    h: 210,
    rot: -3,
    layer: 1,
  },
  {
    id: "halo",
    title: "Halo Banking",
    category: "Web",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75",
    x: 1660,
    y: 250,
    w: 330,
    h: 220,
    rot: 4,
    layer: 1,
  },
  {
    id: "vantage",
    title: "Vantage OS",
    category: "Motion",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=75",
    x: 1850,
    y: 1200,
    w: 300,
    h: 300,
    rot: -5,
    layer: 1,
  },
  {
    id: "cartographie",
    title: "Cartographie",
    category: "Brand",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=70",
    x: 60,
    y: 140,
    w: 260,
    h: 180,
    rot: -6,
    layer: 0,
  },
  {
    id: "petal",
    title: "Petal Studio",
    category: "Web",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=700&q=70",
    x: 1210,
    y: 120,
    w: 280,
    h: 190,
    rot: 5,
    layer: 0,
  },
  {
    id: "atlas",
    title: "Atlas Motion",
    category: "Motion",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=700&q=70",
    x: 700,
    y: 1250,
    w: 300,
    h: 200,
    rot: -2,
    layer: 0,
  },
];

/* The crisp pieces whose thumbnails ride inside the entry button and then
   grow into their real cards when the board opens. */
export const ctaPreviews = designPieces.filter((p) => p.layer === 2).slice(0, 3);
