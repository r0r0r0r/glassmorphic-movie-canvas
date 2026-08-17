import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Film, 
  Star, 
  Sparkles, 
  Filter, 
  RotateCcw, 
  Award, 
  Clock, 
  User, 
  Tag, 
  Play, 
  Bookmark, 
  ExternalLink,
  ChevronDown,
  Info,
  Layers,
  Zap,
  Eye
} from 'lucide-react';

// Sample dataset of iconic films with rich metadata and explicit spatial coordinates for scattered layout
const INITIAL_MOVIES = [
  {
    id: 'blade-runner-2049',
    title: 'Blade Runner 2049',
    year: 2017,
    director: 'Denis Villeneuve',
    rating: 8.7,
    rottenTomatoes: 88,
    genre: 'Sci-Fi',
    era: '2010s',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.',
    tags: ['Cyberpunk', 'Neo-Noir', 'Atmospheric', 'Visual Masterpiece'],
    awards: 'Winner 2 Academy Awards',
    runtime: '164 min',
    budget: '$150M',
    // Organic scattered canvas positioning
    position: { top: '16%', left: '12%', rotation: '-4deg' }
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    year: 2014,
    director: 'Christopher Nolan',
    rating: 8.7,
    rottenTomatoes: 73,
    genre: 'Sci-Fi',
    era: '2010s',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet.',
    tags: ['Space Exploration', 'Time Dilation', 'Score/Zimmer', 'Mind-Bending'],
    awards: 'Oscar Winner for Best Visual Effects',
    runtime: '169 min',
    budget: '$165M',
    position: { top: '12%', left: '44%', rotation: '3deg' }
  },
  {
    id: 'parasite',
    title: 'Parasite',
    year: 2019,
    director: 'Bong Joon Ho',
    rating: 8.5,
    rottenTomatoes: 99,
    genre: 'Thriller',
    era: '2010s',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    tags: ['Social Commentary', 'Dark Comedy', 'Palme d\'Or', 'Tragicomedy'],
    awards: 'Winner 4 Academy Awards incl. Best Picture',
    runtime: '132 min',
    budget: '$15.5M',
    position: { top: '20%', left: '74%', rotation: '-3deg' }
  },
  {
    id: 'mulholland-drive',
    title: 'Mulholland Drive',
    year: 2001,
    director: 'David Lynch',
    rating: 7.9,
    rottenTomatoes: 84,
    genre: 'Mystery',
    era: '2000s',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'After a car crash on the winding Mulholland Drive renders a woman amnesiac, she and a hopeful Hollywood blonde search for clues across Los Angeles.',
    tags: ['Surrealism', 'Psychological', 'Puzzle', 'Cult Classic'],
    awards: 'Cannes Best Director Award',
    runtime: '147 min',
    budget: '$15M',
    position: { top: '56%', left: '8%', rotation: '5deg' }
  },
  {
    id: 'the-godfather',
    title: 'The Godfather',
    year: 1972,
    director: 'Francis Ford Coppola',
    rating: 9.2,
    rottenTomatoes: 97,
    genre: 'Crime',
    era: '70s & Older',
    poster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.',
    tags: ['Mafia Dynasty', 'Masterpiece', 'Cinematography', 'Epic'],
    awards: 'Winner 3 Academy Awards incl. Best Picture',
    runtime: '175 min',
    budget: '$6M',
    position: { top: '50%', left: '38%', rotation: '-5deg' }
  },
  {
    id: 'matrix',
    title: 'The Matrix',
    year: 1999,
    director: 'Lana & Lilly Wachowski',
    rating: 8.7,
    rottenTomatoes: 83,
    genre: 'Sci-Fi',
    era: '90s',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1510511459019-5dee997dd1db?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth - the life he knows is the elaborate deception of an evil cyber-intelligence.',
    tags: ['Simulation', 'Bullet Time', 'Philosophical', 'Action Classic'],
    awards: 'Winner 4 Academy Awards',
    runtime: '136 min',
    budget: '$63M',
    position: { top: '58%', left: '68%', rotation: '4deg' }
  },
  {
    id: 'drive',
    title: 'Drive',
    year: 2011,
    director: 'Nicolas Winding Refn',
    rating: 7.8,
    rottenTomatoes: 93,
    genre: 'Action',
    era: '2010s',
    poster: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'A mysterious Hollywood action stunt driver who moonlights as a getaway driver finds himself in trouble when he helps out his neighbor.',
    tags: ['Synthwave', 'Neon Noir', 'Minimalist', 'Cult Hit'],
    awards: 'Cannes Best Director',
    runtime: '100 min',
    budget: '$15M',
    position: { top: '35%', left: '26%', rotation: '2deg' }
  },
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    year: 2024,
    director: 'Denis Villeneuve',
    rating: 8.6,
    rottenTomatoes: 92,
    genre: 'Sci-Fi',
    era: '2020s',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    tags: ['Space Epic', 'Arrakis', 'Soundscape', 'Visual Marvel'],
    awards: 'Critical Acclaim Worldwide',
    runtime: '166 min',
    budget: '$190M',
    position: { top: '38%', left: '56%', rotation: '-3deg' }
  }
];

const GENRES = ['All Genres', 'Sci-Fi', 'Thriller', 'Mystery', 'Crime', 'Action'];
const ERAS = ['All Eras', '2020s', '2010s', '2000s', '90s', '70s & Older'];
const SORT_METRICS = [
  { label: 'Rating (High-Low)', key: 'rating-desc' },
  { label: 'Year (Newest)', key: 'year-desc' },
  { label: 'Year (Oldest)', key: 'year-asc' },
  { label: 'Rotten Tomatoes', key: 'rt-desc' }
];

export default function MovieResearchCanvas() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedEra, setSelectedEra] = useState('All Eras');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [activeHoverId, setActiveHoverId] = useState(null);
  const [savedBookmarking, setSavedBookmarking] = useState({});

  // Toggle bookmark function for visual interactive delight
  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    setSavedBookmarking(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter and sort movies dataset dynamically
  const filteredMovies = useMemo(() => {
    return INITIAL_MOVIES.filter(movie => {
      const matchesSearch = 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = selectedGenre === 'All Genres' || movie.genre === selectedGenre;
      const matchesEra = selectedEra === 'All Eras' || movie.era === selectedEra;

      return matchesSearch && matchesGenre && matchesEra;
    }).sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'year-asc') return a.year - b.year;
      if (sortBy === 'rt-desc') return b.rottenTomatoes - a.rottenTomatoes;
      return 0;
    });
  }, [searchQuery, selectedGenre, selectedEra, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedGenre !== 'All Genres' || selectedEra !== 'All Eras';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All Genres');
    setSelectedEra('All Eras');
    setSortBy('rating-desc');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-neutral-950 via-rose-950/40 via-purple-950/40 to-indigo-950/40 animate-gradient-flow text-neutral-100 selection:bg-rose-500/30 selection:text-rose-200 font-sans">
      
      {/* Dynamic Ambient Left-to-Right Flowing Gradient Waves & Lighting Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 -left-1/2 w-[200%] h-full bg-gradient-to-r from-rose-600/15 via-purple-600/20 via-indigo-600/20 to-emerald-600/15 animate-wave-left-to-right blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-1/4 w-[150%] h-96 bg-gradient-to-r from-amber-500/10 via-rose-500/20 to-indigo-500/15 blur-[120px] animate-gradient-flow pointer-events-none" />


      {/* 1. GLOBAL FLOATING NAVIGATION */}
      <header className="sticky top-4 mx-auto max-w-5xl z-50 px-3 py-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between gap-3 text-xs md:text-sm">
          
          {/* Logo / Brand Indicator */}
          <div className="flex items-center gap-2 pl-3 pr-2 py-1 text-white font-semibold tracking-wider">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Film className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:inline font-mono text-sm tracking-tight text-neutral-200">
              CINE<span className="text-rose-400 font-bold">CANVAS</span>
            </span>
          </div>

          {/* Minimal Search Input */}
          <div className="relative flex-1 max-w-xs md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search films, directors, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder-neutral-400 pl-9 pr-4 py-1.5 rounded-full text-xs focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all duration-200"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Clean Dropdown Text Menus */}
          <div className="flex items-center gap-2">
            
            {/* Genre Dropdown */}
            <div className="relative group">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 text-neutral-200 hover:text-white px-3 py-1.5 pr-7 rounded-full text-xs font-medium cursor-pointer focus:outline-none focus:border-rose-500/40 transition-all duration-200"
              >
                {GENRES.map(genre => (
                  <option key={genre} value={genre} className="bg-neutral-900 text-neutral-200">
                    {genre}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400 pointer-events-none" />
            </div>

            {/* Era Dropdown */}
            <div className="relative group hidden sm:block">
              <select
                value={selectedEra}
                onChange={(e) => setSelectedEra(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 text-neutral-200 hover:text-white px-3 py-1.5 pr-7 rounded-full text-xs font-medium cursor-pointer focus:outline-none focus:border-rose-500/40 transition-all duration-200"
              >
                {ERAS.map(era => (
                  <option key={era} value={era} className="bg-neutral-900 text-neutral-200">
                    {era}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400 pointer-events-none" />
            </div>

            {/* Sort Metric Dropdown */}
            <div className="relative group hidden md:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 text-neutral-200 hover:text-white px-3 py-1.5 pr-7 rounded-full text-xs font-medium cursor-pointer focus:outline-none focus:border-rose-500/40 transition-all duration-200"
              >
                {SORT_METRICS.map(metric => (
                  <option key={metric.key} value={metric.key} className="bg-neutral-900 text-neutral-200">
                    {metric.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400 pointer-events-none" />
            </div>

            {/* Reset Button when filters active */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 rounded-full transition-all duration-200 title='Reset Filters'"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Result Counter Badge */}
            <div className="pl-1 pr-3 py-1 font-mono text-[11px] text-neutral-400 flex items-center gap-1.5 border-l border-white/10">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{filteredMovies.length} Films</span>
            </div>

          </div>

        </div>
      </header>

      {/* 2. SCATTERED DYNAMIC CANVAS */}
      <main className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden p-6 md:p-12">
        
        {/* Canvas Background Info Overlay / Instructions */}
        <div className="absolute top-6 left-8 z-10 pointer-events-none opacity-50 flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Organic Film Canvas • Hover posters to reveal frosted analytics</span>
        </div>

        {/* Empty State when zero results found */}
        {filteredMovies.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center mb-4 text-neutral-400">
              <Film className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-200 mb-1">No cinematic matches found</h3>
            <p className="text-sm text-neutral-400 max-w-sm mb-6">
              Try tweaking your search query or reset your genre and era filters to explore the canvas.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold hover:bg-rose-500/30 transition-all"
            >
              Reset Canvas Filters
            </button>
          </div>
        )}

        {/* SCATTERED POSTER CONTAINER */}
        <div className="relative w-full h-[82vh] max-w-7xl mx-auto">
          {filteredMovies.map((movie) => {
            const isHovered = activeHoverId === movie.id;
            const isBookmarked = savedBookmarking[movie.id];
            
            return (
              <div
                key={movie.id}
                onMouseEnter={() => setActiveHoverId(movie.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                style={{
                  top: movie.position.top,
                  left: movie.position.left,
                }}
                className={`
                  absolute transform transition-all duration-300 ease-out
                  ${isHovered 
                    ? 'scale-125 rotate-0 z-40 opacity-100' 
                    : 'scale-100 opacity-80 hover:opacity-100 z-10'
                  }
                `}
              >
                {/* Individual Movie Card Box */}
                <div 
                  className={`
                    relative group cursor-pointer w-32 sm:w-36 md:w-40 rounded-xl overflow-hidden shadow-2xl
                    border border-white/15 bg-neutral-900/80 backdrop-blur-md
                    transition-all duration-300 ease-out
                    ${!isHovered ? movie.position.rotation : ''}
                    ${isHovered ? 'shadow-[0_20px_50px_rgba(244,63,94,0.3)] ring-2 ring-rose-500/50' : 'hover:scale-105'}
                  `}
                >
                  {/* Poster Image */}
                  <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient overlay on poster */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                    {/* Rating badge top-right */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      <span>{movie.rating}</span>
                    </div>

                    {/* Era chip top-left */}
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-mono text-neutral-300">
                      {movie.year}
                    </div>

                    {/* Bookmark button */}
                    <button
                      onClick={(e) => toggleBookmark(e, movie.id)}
                      className={`
                        absolute bottom-2 right-2 p-1.5 rounded-full backdrop-blur-md border transition-all duration-200
                        ${isBookmarked 
                          ? 'bg-rose-500 border-rose-400 text-white' 
                          : 'bg-black/40 border-white/10 text-neutral-300 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-black/70'
                        }
                      `}
                    >
                      <Bookmark className={`w-3 h-3 ${isBookmarked ? 'fill-white' : ''}`} />
                    </button>

                    {/* Title preview on default poster bottom */}
                    {!isHovered && (
                      <div className="absolute bottom-2 left-2 right-8 text-left">
                        <h4 className="text-[11px] font-bold text-white leading-tight truncate drop-shadow">
                          {movie.title}
                        </h4>
                        <p className="text-[9px] text-neutral-300 truncate font-mono">
                          {movie.genre}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. INTERACTIVE REVEAL MECHANISM */}
                {/* Frosted glass details panel wrapper sliding down beneath highlighted poster */}
                {isHovered && (
                  <div 
                    className="
                      absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 md:w-80 p-4 rounded-2xl
                      bg-neutral-900/90 border border-white/20 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)]
                      animate-in fade-in slide-in-from-top-4 duration-300 ease-out z-50
                      pointer-events-auto
                    "
                  >
                    {/* Top ambient banner line */}
                    <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-indigo-500 to-purple-500 rounded-full mb-3" />

                    {/* Header: Title & Year */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                        {movie.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-mono font-semibold whitespace-nowrap">
                        {movie.year}
                      </span>
                    </div>

                    {/* Director & Runtime */}
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3 font-mono">
                      <span className="flex items-center gap-1 text-neutral-300">
                        <User className="w-3 h-3 text-rose-400" />
                        {movie.director}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        {movie.runtime}
                      </span>
                    </div>

                    {/* Ratings Badges Row */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{movie.rating} IMDb</span>
                      </div>
                      
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                        <Zap className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                        <span>{movie.rottenTomatoes}% RT</span>
                      </div>

                      <div className="ml-auto text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {movie.genre}
                      </div>
                    </div>

                    {/* Synopsis Hook */}
                    <p className="text-xs text-neutral-300 leading-relaxed mb-3 line-clamp-3 bg-white/5 p-2.5 rounded-xl border border-white/5">
                      "{movie.synopsis}"
                    </p>

                    {/* Analytical Tag Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {movie.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-neutral-300 font-medium transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Accolades Badge */}
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium mb-3 pt-2 border-t border-white/10">
                      <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{movie.awards}</span>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2 pt-1">
                      <button 
                        onClick={() => alert(`Launching cinema player trailer preview for: ${movie.title}`)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/30 transition-all duration-200"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        Trailer
                      </button>
                      
                      <button
                        onClick={(e) => toggleBookmark(e, movie.id)}
                        className={`p-1.5 rounded-lg border transition-all duration-200 ${
                          isBookmarked 
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300' 
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                        }`}
                        title={isBookmarked ? "Saved to watchlist" : "Save to watchlist"}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-400' : ''}`} />
                      </button>

                      <button 
                        onClick={() => alert(`Opening deep analytics dossier for: ${movie.title}`)}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
                        title="Dossier details"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </main>

      {/* Glass Footer Status Bar */}
      <footer className="fixed bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl z-30 hidden md:flex items-center gap-4 text-[11px] text-neutral-400 font-mono">
        <span className="flex items-center gap-1 text-neutral-300">
          <Layers className="w-3 h-3 text-rose-400" /> Freeform Spatial Layout
        </span>
        <span>•</span>
        <span>Glassmorphic Engine v2.4</span>
        <span>•</span>
        <span className="text-rose-400">Snappy 300ms Transitions</span>
      </footer>

    </div>
  );
}
