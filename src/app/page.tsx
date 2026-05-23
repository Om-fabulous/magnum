"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Artwork = {
  id: string;
  title: string;
  category: string;
  edition: string;
  year: string;
  detail: string;
  gradient: string;
  imageUrl?: string;
  artist?: string;
  orientation?: string;
  color?: string;
  medium?: string;
  style?: string;
  collectionType?: string;
  price?: number;
  available?: boolean;
};

const categories = [
  "All", "Abstract", "Aerial", "Animals", "Architecture",
  "Black & White", "Documentary", "Fashion", "Film",
  "Landscape", "Lifestyle", "Portrait", "Sports",
  "Still Life", "Travel", "Urban", "Vintage", "War & Conflict",
];

const orientations = ["All", "Landscape", "Portrait", "Square"];
const colorOptions = ["All", "Black & White", "Color"];
const sortOptions = ["Newest", "Oldest", "Price: Low to High", "Price: High to Low", "Title A–Z", "Title Z–A"];
const artists = ["All", "Henri Cartier-Bresson", "Robert Capa", "Eve Arnold", "Steve McCurry", "Elliott Erwitt", "Sebastião Salgado"];
const collectionTypes = ["All", "Limited Edition", "Open Edition", "Vintage Print", "Artist Proof", "Museum Collection"];
const mediums = ["All", "Archival Pigment", "Gelatin Silver", "Platinum Palladium", "Digital C-Type", "Hahnemühle Baryta", "Fine Art Rag"];
const styles = ["All", "Modern", "Contemporary", "Classic", "Avant-Garde", "Minimalist", "Documentary"];
const priceRanges = [
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500–$1,000", min: 500, max: 1000 },
  { label: "$1,000–$2,500", min: 1000, max: 2500 },
  { label: "$2,500–$5,000", min: 2500, max: 5000 },
  { label: "$5,000+", min: 5000, max: Infinity },
];

const featuredCollections = [
  { name: "New Arrivals", count: 12 },
  { name: "Best Sellers", count: 24 },
  { name: "Curator's Pick", count: 8 },
  { name: "Collector Favorites", count: 16 },
  { name: "Emerging Voices", count: 10 },
];

const _baseGallery: Artwork[] = [
  {
    id: "lumiere",
    title: "Lumière in Motion",
    category: "Fine Art",
    edition: "Edition 02/25",
    year: "2025",
    detail: "Silver gelatin on black velvet paper.",
    gradient: "radial-gradient(circle at 20% 18%, rgba(0,0,0,0.06), transparent 26%), linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.06)), linear-gradient(135deg, rgba(0,0,0,0.01), rgba(0,0,0,0.04))",
    imageUrl: "/images/MPRINT-HEB-NYC15295-8x10-FRAME-BL.webp",
    artist: "Henri Cartier-Bresson",
    orientation: "Landscape",
    color: "Black & White",
    medium: "Gelatin Silver",
    style: "Classic",
    collectionType: "Limited Edition",
    price: 1800,
    available: true,
  },
  {
    id: "noir",
    title: "Noir Study",
    category: "Portrait",
    edition: "Edition 11/20",
    year: "2024",
    detail: "Platinum palladium print with matte lacquer.",
    gradient: "radial-gradient(circle at 15% 25%, rgba(0,0,0,0.04), transparent 20%), linear-gradient(180deg, rgba(0,0,0,0.01), rgba(0,0,0,0.06))",
    imageUrl: "/images/MPRINT-HEB-PAR35829-8x10-FRAME-BL.webp",
    artist: "Robert Capa",
    orientation: "Portrait",
    color: "Black & White",
    medium: "Platinum Palladium",
    style: "Modern",
    collectionType: "Limited Edition",
    price: 2400,
    available: true,
  },
  {
    id: "station",
    title: "Midnight Station",
    category: "Street",
    edition: "Edition 19/30",
    year: "2023",
    detail: "Gelatin silver print on textured cotton rag.",
    gradient: "radial-gradient(circle at 75% 20%, rgba(0,0,0,0.05), transparent 22%), linear-gradient(180deg, rgba(0,0,0,0.01), rgba(0,0,0,0.05))",
    imageUrl: "/images/MPRINT-PAT-MG1131314-8x10-8x10-FRAME-BL.webp",
    artist: "Eve Arnold",
    orientation: "Landscape",
    color: "Black & White",
    medium: "Gelatin Silver",
    style: "Documentary",
    collectionType: "Open Edition",
    price: 800,
    available: true,
  },
  {
    id: "traveler",
    title: "Traveler's Frame",
    category: "Travel",
    edition: "Edition 08/18",
    year: "2025",
    detail: "Hand-developed archival composite print.",
    gradient: "radial-gradient(circle at 50% 30%, rgba(0,0,0,0.06), transparent 26%)",
    imageUrl: "/images/MPRINT-DER-PAR283590-8x10-FRAME-BL.webp",
    artist: "Steve McCurry",
    orientation: "Landscape",
    color: "Color",
    medium: "Archival Pigment",
    style: "Contemporary",
    collectionType: "Limited Edition",
    price: 3200,
    available: true,
  },
  {
    id: "terrace",
    title: "Boulevard Terrace",
    category: "Architecture",
    edition: "Edition 06/22",
    year: "2024",
    detail: "Archival pigment print with cold press finish.",
    gradient: "radial-gradient(circle at 30% 18%, rgba(0,0,0,0.05), transparent 24%)",
    imageUrl: "/images/MPRINT-MIC-MG183526-8x10-FRAME-BL.webp",
    artist: "Elliott Erwitt",
    orientation: "Landscape",
    color: "Color",
    medium: "Archival Pigment",
    style: "Modern",
    collectionType: "Open Edition",
    price: 650,
    available: false,
  },
  {
    id: "atelier",
    title: "Atelier Passage",
    category: "Fashion",
    edition: "Edition 04/12",
    year: "2025",
    detail: "Custom darkroom print with polished edge.",
    gradient: "radial-gradient(circle at 60% 16%, rgba(0,0,0,0.06), transparent 24%)",
    imageUrl: "/images/MPRINT-MOI-PAR22894-8x10-FRAME-BL.webp",
    artist: "Sebastião Salgado",
    orientation: "Portrait",
    color: "Black & White",
    medium: "Digital C-Type",
    style: "Avant-Garde",
    collectionType: "Artist Proof",
    price: 4200,
    available: true,
  },
  {
    id: "signal",
    title: "Signal Lines",
    category: "Documentary",
    edition: "Edition 15/30",
    year: "2024",
    detail: "Museum-quality archival matte finish.",
    gradient: "radial-gradient(circle at 80% 40%, rgba(0,0,0,0.05), transparent 24%)",
    imageUrl: "/images/MPRINT-GLB-PAR38380-8x10-FRAME-BL.webp",
    artist: "Henri Cartier-Bresson",
    orientation: "Portrait",
    color: "Color",
    medium: "Fine Art Rag",
    style: "Documentary",
    collectionType: "Limited Edition",
    price: 1500,
    available: true,
  },
  {
    id: "silhouette",
    title: "Silhouette Study",
    category: "Fine Art",
    edition: "Edition 03/16",
    year: "2025",
    detail: "Hahnemühle baryta print with archival varnish.",
    gradient: "radial-gradient(circle at 25% 20%, rgba(0,0,0,0.06), transparent 20%)",
    imageUrl: "/images/MPRINT-MYA-MG185504-8x10-FRAME-BL.webp",
    artist: "Eve Arnold",
    orientation: "Landscape",
    color: "Black & White",
    medium: "Hahnemühle Baryta",
    style: "Minimalist",
    collectionType: "Museum Collection",
    price: 5800,
    available: true,
  },
];

const gallery: Artwork[] = Array.from({ length: 72 }).map((_, i) => {
  const base = _baseGallery[i % _baseGallery.length];
  const imageUrl = base.imageUrl
    ? base.imageUrl.startsWith("/")
      ? base.imageUrl
      : `${base.imageUrl}&sig=${i + 1}`
    : undefined;
  return {
    ...base,
    id: `${base.id}-${String(i + 1).padStart(3, "0")}`,
    title: `${base.title}${i === 0 ? "" : ` (${i + 1})`}`,
    edition: base.edition,
    year: String(2026 - ((i % 6) + 0)),
    detail: base.detail,
    imageUrl,
    price: base.price ? base.price + ((i % 5) * 100) : undefined,
  };
});

const stats = [
  { label: "Editions curated", value: "48" },
  { label: "Artists represented", value: "18" },
  { label: "Yearbook pieces", value: "120" },
];

function FilterSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="border-b border-black/6 pb-4">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-3 text-left"
      >
        <span className="text-xs uppercase tracking-[0.12em] text-[#6b6b6b]">{title}</span>
        <span className={`inline-block text-[#8a8a8a] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight ?? 400 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <div className="pt-1 pb-2">{children}</div>
      </div>
    </div>
  );
}

function FilterPill({
  selected,
  onClick,
  label,
  count,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`magnetic-btn flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all duration-200 ${
        selected
          ? "border-black/20 bg-[#0b0b0b] text-white shadow-[0_2px_12px_rgba(11,11,11,0.08)]"
          : "border-black/6 bg-transparent text-[#6b6b6b] hover:border-black/10 hover:bg-white/60 hover:shadow-[0_2px_8px_rgba(11,11,11,0.04)]"
      }`}
    >
      <span className={selected ? "font-medium" : ""}>{label}</span>
      {count !== undefined && (
        <span className={`text-[0.7rem] tracking-wide ${selected ? "text-white/60" : "text-[#a0a0a0]"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function CheckFilter({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onChange}
      className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-[#6b6b6b] transition hover:bg-black/[0.03]"
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200 ${
          checked
            ? "border-black/30 bg-[#0b0b0b]"
            : "border-black/12 bg-transparent group-hover:border-black/20"
        }`}
      >
        {checked && (
          <svg width="9" height="8" viewBox="0 0 9 8" fill="none">
            <path d="M1 4L3.5 6.5L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={`${checked ? "text-[#0b0b0b] font-medium" : ""}`}>{label}</span>
    </button>
  );
}

type FilterState = {
  search: string;
  sort: string;
  category: string;
  orientation: string;
  color: string;
  artist: string;
  collectionType: string;
  medium: string;
  style: string;
  priceRange: number | null;
  availableOnly: boolean;
};

export default function Home() {
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [sectionsOpen, setSectionsOpen] = useState<Record<string, boolean>>({
    search: true,
    sort: true,
    categories: true,
    orientation: true,
    color: true,
    artist: false,
    collectionType: false,
    price: false,
    availability: false,
    medium: false,
    style: false,
    featured: false,
  });

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    sort: "Newest",
    category: "All",
    orientation: "All",
    color: "All",
    artist: "All",
    collectionType: "All",
    medium: "All",
    style: "All",
    priceRange: null,
    availableOnly: false,
  });

  function toggleSection(section: string) {
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  function resetAllFilters() {
    setFilters({
      search: "",
      sort: "Newest",
      category: "All",
      orientation: "All",
      color: "All",
      artist: "All",
      collectionType: "All",
      medium: "All",
      style: "All",
      priceRange: null,
      availableOnly: false,
    });
  }

  const hasActiveFilters = useMemo(
    () =>
      filters.search !== "" ||
      filters.category !== "All" ||
      filters.orientation !== "All" ||
      filters.color !== "All" ||
      filters.artist !== "All" ||
      filters.collectionType !== "All" ||
      filters.medium !== "All" ||
      filters.style !== "All" ||
      filters.priceRange !== null ||
      filters.availableOnly,
    [filters]
  );

  const filteredGallery = useMemo(() => {
    let result = [...gallery];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.artist?.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (filters.category !== "All") {
      result = result.filter((art) => art.category === filters.category);
    }

    // Orientation
    if (filters.orientation !== "All") {
      result = result.filter((art) => art.orientation === filters.orientation);
    }

    // Color
    if (filters.color !== "All") {
      result = result.filter((art) => art.color === filters.color);
    }

    // Artist
    if (filters.artist !== "All") {
      result = result.filter((art) => art.artist === filters.artist);
    }

    // Collection Type
    if (filters.collectionType !== "All") {
      result = result.filter((art) => art.collectionType === filters.collectionType);
    }

    // Medium
    if (filters.medium !== "All") {
      result = result.filter((art) => art.medium === filters.medium);
    }

    // Style
    if (filters.style !== "All") {
      result = result.filter((art) => art.style === filters.style);
    }

    // Price Range
    if (filters.priceRange !== null) {
      const range = priceRanges[filters.priceRange];
      if (range) {
        result = result.filter(
          (art) => art.price !== undefined && art.price >= range.min && art.price < range.max
        );
      }
    }

    // Availability
    if (filters.availableOnly) {
      result = result.filter((art) => art.available === true);
    }

    // Sort
    switch (filters.sort) {
      case "Newest":
        result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case "Oldest":
        result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        break;
      case "Price: Low to High":
        result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "Price: High to Low":
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "Title A–Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Title Z–A":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [filters]);

  const getCategoryCount = (cat: string) =>
    cat === "All" ? gallery.length : gallery.filter((a) => a.category === cat).length;

  const getOrientationCount = (o: string) =>
    o === "All" ? gallery.length : gallery.filter((a) => a.orientation === o).length;

  const getColorCount = (c: string) =>
    c === "All" ? gallery.length : gallery.filter((a) => a.color === c).length;

  const getArtistCount = (a: string) =>
    a === "All" ? gallery.length : gallery.filter((art) => art.artist === a).length;

  const getCollectionTypeCount = (ct: string) =>
    ct === "All" ? gallery.length : gallery.filter((a) => a.collectionType === ct).length;

  const getMediumCount = (m: string) =>
    m === "All" ? gallery.length : gallery.filter((a) => a.medium === m).length;

  const getStyleCount = (s: string) =>
    s === "All" ? gallery.length : gallery.filter((a) => a.style === s).length;

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const down = () => cursor.classList.add("enlarge");
    const up = () => cursor.classList.remove("enlarge");
    const over = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest?.(".magnetic-btn, .card-hover-highlight, a, button");
      if (target) cursor.classList.add("enlarge");
    };
    const out = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest?.(".magnetic-btn, .card-hover-highlight, a, button");
      if (target) cursor.classList.remove("enlarge");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoaded(true), 320);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedArt ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedArt]);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".animate-fade-in-up");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.12 }
    );
    revealElements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isLoaded, filteredGallery]);

  function handleCardMove(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.setProperty("--mx", String((x / rect.width) * 100));
    el.style.setProperty("--my", String((y / rect.height) * 100));
  }
  function handleCardLeave(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  }
  function handleMagnetMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.06;
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.06;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }
  function handleMagnetLeave(e: React.MouseEvent<HTMLButtonElement>) {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = "translate(0,0)";
  }

  const filterSidebar = (
    <aside className="w-full shrink-0 lg:w-[280px]">
      <div className="sticky top-[73px] space-y-1 filter-sidebar p-5 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/6">
          <span className="text-xs uppercase tracking-[0.12em] text-[#6b6b6b]">Filters</span>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[0.65rem] uppercase tracking-[0.08em] text-[#8a8a8a] transition hover:text-[#0b0b0b]"
              >
                Reset
              </button>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#8a8a8a] transition hover:text-[#0b0b0b] lg:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 8h8M8 4v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`space-y-1 ${sidebarOpen ? "block" : "hidden lg:block"}`}>
          {/* Search */}
          <FilterSection title="Search" open={sectionsOpen.search} onToggle={() => toggleSection("search")}>
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0]"
                width="14" height="14" viewBox="0 0 14 14" fill="none"
              >
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search artworks..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="w-full rounded-xl border border-black/8 bg-white py-2.5 pl-9 pr-4 text-sm text-[#0b0b0b] placeholder:text-[#a0a0a0] outline-none transition focus:border-black/20"
              />
            </div>
          </FilterSection>

          {/* Sort By */}
          <FilterSection title="Sort By" open={sectionsOpen.sort} onToggle={() => toggleSection("sort")}>
            <div className="space-y-1.5">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setFilters((prev) => ({ ...prev, sort: option }))}
                  className={`magnetic-btn w-full rounded-xl px-3.5 py-2.5 text-left text-sm transition ${
                    filters.sort === option
                      ? "bg-[#0b0b0b] text-white"
                      : "text-[#6b6b6b] hover:bg-black/[0.03]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Categories */}
          <FilterSection title="Categories" open={sectionsOpen.categories} onToggle={() => toggleSection("categories")}>
            <div className="space-y-1">
              {categories.map((cat) => (
                <FilterPill
                  key={cat}
                  label={cat}
                  selected={filters.category === cat}
                  onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                  count={getCategoryCount(cat)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Orientation */}
          <FilterSection title="Orientation" open={sectionsOpen.orientation} onToggle={() => toggleSection("orientation")}>
            <div className="flex flex-wrap gap-2">
              {orientations.map((o) => (
                <button
                  key={o}
                  onClick={() => setFilters((prev) => ({ ...prev, orientation: o }))}
                  className={`magnetic-btn rounded-xl border px-3.5 py-2 text-xs tracking-wide transition ${
                    filters.orientation === o
                      ? "border-black/20 bg-[#0b0b0b] text-white"
                      : "border-black/8 text-[#6b6b6b] hover:border-black/14 hover:bg-white/60"
                  }`}
                >
                  {o}
                  <span className="ml-1.5 text-[0.6rem] opacity-60">({getOrientationCount(o)})</span>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Color */}
          <FilterSection title="Color" open={sectionsOpen.color} onToggle={() => toggleSection("color")}>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilters((prev) => ({ ...prev, color: c }))}
                  className={`magnetic-btn rounded-xl border px-3.5 py-2 text-xs tracking-wider transition ${
                    filters.color === c
                      ? "border-black/20 bg-[#0b0b0b] text-white"
                      : "border-black/8 text-[#6b6b6b] hover:border-black/14 hover:bg-white/60"
                  }`}
                >
                  {c}
                  <span className="ml-1.5 text-[0.6rem] opacity-60">({getColorCount(c)})</span>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Artist */}
          <FilterSection title="Artist" open={sectionsOpen.artist} onToggle={() => toggleSection("artist")}>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {artists.map((a) => (
                <FilterPill
                  key={a}
                  label={a}
                  selected={filters.artist === a}
                  onClick={() => setFilters((prev) => ({ ...prev, artist: a }))}
                  count={getArtistCount(a)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Collection Type */}
          <FilterSection title="Collection Type" open={sectionsOpen.collectionType} onToggle={() => toggleSection("collectionType")}>
            <div className="space-y-1">
              {collectionTypes.map((ct) => (
                <FilterPill
                  key={ct}
                  label={ct}
                  selected={filters.collectionType === ct}
                  onClick={() => setFilters((prev) => ({ ...prev, collectionType: ct }))}
                  count={getCollectionTypeCount(ct)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range" open={sectionsOpen.price} onToggle={() => toggleSection("price")}>
            <div className="space-y-1">
              {priceRanges.map((range, i) => (
                <FilterPill
                  key={range.label}
                  label={range.label}
                  selected={filters.priceRange === i}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: prev.priceRange === i ? null : i,
                    }))
                  }
                />
              ))}
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection title="Availability" open={sectionsOpen.availability} onToggle={() => toggleSection("availability")}>
            <CheckFilter
              label="Available only"
              checked={filters.availableOnly}
              onChange={() => setFilters((prev) => ({ ...prev, availableOnly: !prev.availableOnly }))}
            />
          </FilterSection>

          {/* Medium */}
          <FilterSection title="Medium" open={sectionsOpen.medium} onToggle={() => toggleSection("medium")}>
            <div className="space-y-1">
              {mediums.map((m) => (
                <FilterPill
                  key={m}
                  label={m}
                  selected={filters.medium === m}
                  onClick={() => setFilters((prev) => ({ ...prev, medium: m }))}
                  count={getMediumCount(m)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Style */}
          <FilterSection title="Style" open={sectionsOpen.style} onToggle={() => toggleSection("style")}>
            <div className="space-y-1">
              {styles.map((s) => (
                <FilterPill
                  key={s}
                  label={s}
                  selected={filters.style === s}
                  onClick={() => setFilters((prev) => ({ ...prev, style: s }))}
                  count={getStyleCount(s)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Featured Collections */}
          <FilterSection title="Featured Collections" open={sectionsOpen.featured} onToggle={() => toggleSection("featured")}>
            <div className="space-y-2">
              {featuredCollections.map((fc) => (
                <div
                  key={fc.name}
          className="featured-card px-3.5 py-3"
                >
                  <span className="text-sm text-[#6b6b6b] transition group-hover:text-[#0b0b0b]">{fc.name}</span>
                  <span className="text-[0.65rem] tracking-wide text-[#a0a0a0]">{fc.count} pieces</span>
                </div>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="relative overflow-hidden bg-white text-[#0b0b0b]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_35%)] blur-3xl opacity-40" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <Image src="/icon.png" alt="Magnum Editions" width={60} height={60} />
            <div>
              <div className="text-lg font-semibold tracking-wide text-[#0b0b0b]"></div>
              <div className="text-xs text-[#8a8a8a]"></div>
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-lg uppercase tracking-[0.06em] text-[#0a0909] md:flex">
            <button className="transition hover:text-black">Featured</button>
            <button className="transition hover:text-black">Books</button>
            <button className="transition hover:text-black">Prints & Posters</button>
            <button className="transition hover:text-black">Fine Prints & Gallery</button>
            <button className="transition hover:text-black">Gifts</button>
            <button className="transition hover:text-black">Photographers</button>
          </nav>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-xs uppercase tracking-[0.08em] text-[#6b6b6b] transition hover:border-black/14 lg:hidden"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 3.5h10M4 7h6M5.5 10.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="inline-flex h-2 w-2 rounded-full bg-[#0b0b0b]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[300px] max-w-[85vw] overflow-y-auto bg-white p-4 shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-[0.12em] text-[#6b6b6b]">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-[#8a8a8a] hover:text-[#0b0b0b]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              {/* Mobile filter sections - simplified copy of desktop */}
              <div className="border-b border-black/6 pb-4">
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a0a0a0]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search artworks..."
                    value={filters.search}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                    className="w-full rounded-xl border border-black/8 bg-white py-2.5 pl-9 pr-4 text-sm text-[#0b0b0b] placeholder:text-[#a0a0a0] outline-none transition focus:border-black/20"
                  />
                </div>
              </div>
              <div className="border-b border-black/6 pb-4">
                <span className="block py-2 text-xs uppercase tracking-[0.12em] text-[#6b6b6b]">Sort By</span>
                <div className="space-y-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => { setFilters((prev) => ({ ...prev, sort: option })); setMobileFiltersOpen(false); }}
                      className={`magnetic-btn w-full rounded-xl px-3.5 py-2.5 text-left text-sm transition ${
                        filters.sort === option ? "bg-[#0b0b0b] text-white" : "text-[#6b6b6b] hover:bg-black/[0.03]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border-b border-black/6 pb-4">
                <span className="block py-2 text-xs uppercase tracking-[0.12em] text-[#6b6b6b]">Categories</span>
                <div className="flex flex-wrap gap-1.5">
                  {categories.slice(0, 8).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setFilters((prev) => ({ ...prev, category: cat })); setMobileFiltersOpen(false); }}
                      className={`magnetic-btn rounded-xl border px-3 py-1.5 text-xs transition ${
                        filters.category === cat
                          ? "border-black/20 bg-[#0b0b0b] text-white"
                          : "border-black/8 text-[#6b6b6b] hover:border-black/14"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <button
                  onClick={resetAllFilters}
                  className="mt-3 text-[0.65rem] uppercase tracking-[0.08em] text-[#8a8a8a] transition hover:text-[#0b0b0b]"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-8 sm:px-8 lg:px-10">
        {/* Hero Section — heading + sub-text + 3 stat cards */}
        <section className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-end mb-16">
          <div className="space-y-8">
            <div className="max-w-2xl space-y-6">
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                Curated Editions
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-[#0b0b0b] sm:text-6xl">Magnum Editions</h1>
                <p className="max-w-2xl text-base leading-8 text-[#4b4b4b] sm:text-lg">
                  This collection reflects the diversity of practice among Magnum&rsquo;s members with subjects ranging from world affairs and pivotal events, to the beauty of everyday scenes. The prints are available as 8x10&ldquo; archival pigment prints in limited editions of 100 each.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                key={item.label}
                  className="stat-card"
                >
                  <p className="text-4xl font-semibold tracking-[-0.04em] text-[#0b0b0b]">{item.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.1em] text-[#6b6b6b]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2.5rem] border border-black/6 bg-white p-8 shadow-[0_30px_80px_rgba(11,11,11,0.06)]">
            <p className="text-sm uppercase tracking-[0.14em] text-white/60">Featured edit</p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#0b0b0b]">A refined presentation for carefully chosen photographic narratives.</h2>
            <p className="mt-4 text-sm leading-7 text-[#4b4b4b]">
              The interface honors every print with soft glass layers, tactile card motion, and immersive reveal animations while keeping the experience calm, spacious, and editorial.
            </p>
            <div className="mt-8 space-y-4 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/80" />
                Museum-grade curation
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/80" />
                Cinematic motion and hover states
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/80" />
                Responsive editorial layout
              </div>
            </div>
          </aside>
        </section>

        {/* Gallery with Filter Sidebar */}
        <section className="flex flex-col gap-8 lg:flex-row">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">{filterSidebar}</div>

          {/* Gallery Grid */}
          <div className="flex-1 min-w-0">
            {/* Sort & Results Bar */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.1em] text-[#8a8a8a]">
                <span className="text-[#0b0b0b] font-semibold">{filteredGallery.length}</span> results
              </p>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[0.65rem] uppercase tracking-[0.08em] text-[#8a8a8a]">Sort:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
                  className="rounded-xl border border-black/8 bg-white px-3 py-2 text-xs text-[#6b6b6b] outline-none transition focus:border-black/20"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-3 ${isTransitioning ? 'gallery-hidden' : 'gallery-fade'}`}>
              {isLoaded
                ? filteredGallery.map((art, index) => (
                    <article
                      key={art.id}
                      className="animate-fade-in-up gallery-card"
                      onClick={() => setSelectedArt(art)}
                      onMouseMove={handleCardMove}
                      onMouseLeave={handleCardLeave}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="gallery-card-image">
                        {art.imageUrl ? (
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <div
                            className="card-inner absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                            style={{ background: art.gradient, opacity: 0.85 }}
                          />
                        )}
                        <div className="card-overlay" />
                        <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                          <span className="inline-flex rounded-full border border-black/6 bg-white/90 backdrop-blur-sm px-3 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-[#4b4b4b]">
                            {art.category}
                          </span>
                          <div className="mt-4 space-y-2">
                            <p className="text-base font-semibold text-[#0b0b0b]">{art.title}</p>
                            <p className="text-xs uppercase tracking-[0.12em] text-[#8a8a8a]">{art.edition}</p>
                          </div>
                        </div>
                      </div>
                      <div className="gallery-card-content">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.1em] text-[#8a8a8a]">
                          <span>{art.year}</span>
                          <span>{art.category}</span>
                        </div>
                        {art.artist && (
                          <p className="text-xs uppercase tracking-[0.06em] text-[#a0a0a0]">{art.artist}</p>
                        )}
                        <p className="text-sm leading-7 text-[#4b4b4b]">{art.detail}</p>
                        {art.price && (
                          <p className="text-sm font-semibold text-[#0b0b0b]">${art.price.toLocaleString()}</p>
                        )}
                      </div>
                    </article>
                  ))
                : Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="animate-pulse rounded-[2rem] border border-black/6 bg-white p-6">
                      <div className="mb-5 h-80 rounded-[1.75rem] bg-slate-800" />
                      <div className="space-y-3">
                        <div className="h-4 w-24 rounded-full bg-slate-700" />
                        <div className="h-4 w-40 rounded-full bg-slate-700" />
                        <div className="h-3 w-32 rounded-full bg-slate-700" />
                      </div>
                    </div>
                  ))}
            </div>

            {isLoaded && filteredGallery.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-black/8 bg-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#8a8a8a]">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-[#0b0b0b]">No results found</p>
                <p className="mt-1 text-sm text-[#8a8a8a]">Try adjusting your filters to find what you&rsquo;re looking for.</p>
                <button
                  onClick={resetAllFilters}
                  className="mt-6 rounded-full border border-black/10 bg-white px-6 py-2.5 text-xs uppercase tracking-[0.08em] text-[#6b6b6b] transition hover:border-black/20"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-black/20 bg-[#f5f5f3] text-black">

  {/* TOP SECTION */}
  <div className="grid grid-cols-1 gap-14 px-8 py-16 md:grid-cols-5">

    {/* LOGO */}
    <div className="space-y-8">
      <img
         src="/icon.png"
        alt="Magnum"
        className="w-28 object-contain"
      />

      <a
        href="/"
        className="inline-block text-[15px] underline underline-offset-4 transition-opacity hover:opacity-60"
      >
        Back to main site
      </a>
    </div>

    {/* ABOUT */}
    <div className="space-y-5">
      <h3 className="text-[20px] font-semibold">About</h3>

      <div className="flex flex-col gap-4 text-[17px] text-black/65">
        <a href="#" className="hover:text-black">
          Magnum Photos
        </a>

        <a href="#" className="hover:text-black">
          Find Us
        </a>
      </div>
    </div>

    {/* HELP */}
    <div className="space-y-5">
      <h3 className="text-[20px] font-semibold">Help</h3>

      <div className="flex flex-col gap-4 text-[17px] text-black/65">
        <a href="#">Contact Us</a>
        <a href="#">FAQs</a>
        <a href="#">Delivery & Shipping</a>
        <a href="#">Returns & Refund Policy</a>
        <a href="#">Customs Information</a>
      </div>
    </div>

    {/* POLICIES */}
    <div className="space-y-5">
      <h3 className="text-[20px] font-semibold">Policies</h3>

      <div className="flex flex-col gap-4 text-[17px] text-black/65">
        <a href="#">Privacy</a>
        <a href="#">Cookies</a>
        <a href="#">T&Cs</a>
      </div>
    </div>

    {/* NEWSLETTER */}
    <div className="space-y-6">
      <div>
        <h3 className="text-[38px] font-semibold leading-none">
          Sign up
        </h3>

        <p className="mt-4 text-[18px] text-black/70">
          Get the latest news and offers
        </p>
      </div>

      <input
        type="email"
        placeholder="Your E-mail"
        className="h-[68px] w-full border border-black/40 bg-transparent px-6 text-[18px] outline-none"
      />

      <button className="h-[68px] w-full bg-black text-[18px] font-semibold text-white transition-all hover:opacity-90">
        SUBSCRIBE
      </button>
    </div>
  </div>

  {/* MIDDLE SECTION */}
  <div className="flex flex-col items-start justify-between gap-14 border-t border-black/20 px-8 py-16 md:flex-row">

    {/* CURRENCY */}
    <div className="space-y-5">
      <p className="text-[18px] text-black/55">
        Currency
      </p>

      <button className="flex h-[52px] items-center gap-4 border border-black/40 px-5 text-[20px]">
        USD $
        <span className="text-sm">⌄</span>
      </button>
    </div>

    {/* SOCIAL */}
    <div className="space-y-3 md:text-right">
      <p className="text-[15px] text-black/55">
        Join Our Social Media
      </p>

      <div className="grid grid-cols-3 gap-x-8 gap-y-8 text-[42px]">
        <a href="#" className="transition-opacity hover:opacity-60">
          𝕏
        </a>

        <a href="#" className="transition-opacity hover:opacity-60">
          f
        </a>

        <a href="#" className="transition-opacity hover:opacity-60">
          𝓟
        </a>

        <a href="#" className="transition-opacity hover:opacity-60">
          
        </a>

        <a href="#" className="transition-opacity hover:opacity-60">
          
        </a>

        <a href="#" className="transition-opacity hover:opacity-60">
          
        </a>
      </div>
    </div>
  </div>

  {/* BOTTOM SECTION */}
  <div className="flex flex-col items-start justify-between gap-8 border-t border-black/20 px-8 py-10 md:flex-row md:items-center">

    {/* COPYRIGHT */}
    <p className="text-[18px] text-black/70">
      © 2026 Magnum Photos.
    </p>

    {/* RIGHT LOGOS */}
    {/* POWERED BY */}
  <div className="mt-5 flex justify-end">
    <div className="inline-flex items-center gap-3 rounded-lg border border-black/10 bg-black/[0.03] px-4 py-3 transition-all duration-300 hover:bg-black/[0.05]">

      {/* Fabulous Media */}
      <a
        href="https://fabulousmedia.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-80 transition-opacity hover:opacity-100"
        aria-label="FabulousMedia"
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAq1BMVEVHcEwAAADxmjLdVS8AAAAAAACgoKDi3t3tjzTymjHub0bdPC+uKyKfJx+Li4v////q6urXmWXsVi/qNi7MNSu5LyafKCBjY2P4///x8fLqPjK8MSeeJh1ISEj5+vofHx/Rzs7qVEy9urrujIfrLBt6enrWq6m9Kh73x8XcGgC9IRO2dXOnU0+dDwQ4ODitY2CyQDqogYC4EAC4lpScAAC4GAQ0OjsAAAD///8RPPMVAAAAOXRSTlMAYGBgQf//////////UP//////////////////////////////////////////////////UP9QUGHElwbPAAABN0lEQVR4AWyRVRLDMAwFy9zKYU6Zme9/s9Z5ozTqZH93TXKlUpXUBPVKpdEUtNqdbk6vPxj+BSMiZcB2TMt23L/AIyI/ML62F1r9KHJiGSQpaXzDtMLQdqJoIHcYB5QRWCF85MqgDZ9+dT/S3pHBhMDU0ss1AxHMCPSsMIKP4mLQIjBf9LXGBoVgSWC1sNmv40LgEdhsI/a7/eGYB6cUvr1lHa3Pfno+IsgHoHY/fwmI/OsRQZsvcGPvOIo094cOJsTMng6CJw/tpYOEciaDdeZ5TfLmOzDty7e4rQh4TQS4BVCH3fNOYNREwIMG6XnPN2oiAK1fkVLGpMkBD1uimjLgcTNpUwb5wNmPRcAoYlR5UBhqkJQF4rleaYDnglFZIJ7bKgvE383KAvF3k9dnoOyPCSzggAEAuL07sDHFZu4AAAAASUVORK5CYII="
          alt="FabulousMedia"
          className="h-4 w-auto object-contain"
        />
      </a>

      {/* Divider */}
      <span className="h-4 w-px bg-black/20" />

      {/* GoCommercially */}
      <a
        href="https://gocommercially.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-80 transition-opacity hover:opacity-100"
        aria-label="GoCommercially"
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAAAAABWESUoAAABJ0lEQVR4AZ3TEazDYBiF4ddlNJnNYTIv1DO8WpuUqks9KY2Gk2KhXKpXStVKrZ5C5b3QLLkX/i3ZsS955CTnww/5EqzvwDroOIWBCdHkGgY+gcIw0Aw4zmGgJ4AmDJwBKMLAEq6dhoGVGgbL1Lf1I0/OZBuoov1Pp1pGh3R2HsdhiACgUsyJiwOdZsQ32Pr1bJlkIdaVsyOJjlz/VIWztFSqq09a9ciryJaOmsaurGoLBvXC2jd1Vd2TNLvd8ryjoTbfsfNOr8b4PwzkKkcbSpW9qsbRo9+AB9p1ZKfQLxmlqhMAl/sizju2xiNA9hoFbBfq0PZu7dtZp7bMUwBIwqNdxq5+FIbA81Trpz2kSxhEAK1BUADnxSAoP636AoPvwNp9+7yB/AKHCUYfTsNJ9QAAAABJRU5ErkJggg=="
          alt="GoCommercially"
          className="h-4 w-auto object-contain"
        />
      </a>

    </div>
  </div>
  </div>
</footer>

      {selectedArt && (
        <div
          className="fixed inset-0 z-50 grid place-items-center lightbox-overlay px-4 py-10"
          onClick={() => setSelectedArt(null)}
        >
          <div
            className="w-full max-w-5xl lightbox-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-t-[2.5rem] bg-slate-950">
              <div className="absolute inset-0 opacity-95" style={{ background: selectedArt.gradient }} />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_26%)]" />
              <div className="h-[min(65vh,520px)]" />
              <button
                onClick={() => setSelectedArt(null)}
                className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm uppercase tracking-[0.1em] text-white/80 transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="space-y-6 px-8 py-8 sm:px-10 sm:py-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/50">Curated artwork</p>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    {selectedArt.title}
                  </h2>
                </div>
                <div className="space-y-1 text-right text-sm text-white/60">
                  <p>{selectedArt.edition}</p>
                  <p>{selectedArt.year}</p>
                  <p>{selectedArt.category}</p>
                </div>
              </div>
              <p className="max-w-3xl text-base leading-8 text-white/65">
                {selectedArt.detail} The lightbox preserves the refined, cinematic atmosphere of the collection and offers an immersive premium preview for collectors and art directors.
              </p>
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
                  <span className="block text-xs uppercase tracking-[0.12em] text-white/50">Series</span>
                  <p className="mt-3 font-semibold text-white">Monochrome Architecture</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
                  <span className="block text-xs uppercase tracking-[0.12em] text-white/50">Artist</span>
                  <p className="mt-3 font-semibold text-white">{selectedArt.artist || "Magnum Editions"}</p>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70">
                  <span className="block text-xs uppercase tracking-[0.12em] text-white/50">Print</span>
                  <p className="mt-3 font-semibold text-white">Gallery grade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={cursorRef} className="premium-cursor" />
    </div>
  );
}