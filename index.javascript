import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Radio, 
  Newspaper, 
  Headphones, 
  Library, 
  Bell, 
  Search, 
  Play, 
  Pause, 
  CloudSun,
  Car,
  Clock,
  TrendingUp,
  Wifi,
  Battery,
  Signal,
  MoreHorizontal,
  Music,
  Mic,
  Calendar,
  User,
  ChevronRight,
  Flame,
  Zap,
  Globe
} from 'lucide-react';

// --- Mock Data ---
const NEWS_DATA = [
  { id: 1, category: "Politics", title: "Northern Sumatra leaders raise white flag amid deadly floods", time: "22m ago" },
  { id: 2, category: "Economy", title: "Riau inflation rates drop significantly in Q4", time: "1h ago" },
  { id: 3, category: "Local", title: "New bridge construction starts in downtown Pekanbaru", time: "3h ago" },
  { id: 4, category: "Sports", title: "Local team wins championship against all odds", time: "5h ago" },
];

const PODCAST_DATA = [
  { id: 1, title: "Policy Pulse", author: "Pekanbaru Daily", desc: "A deep-dive into the week's biggest political decisions.", duration: "3 mins", color: "bg-purple-100" },
  { id: 2, title: "Morning Dew", author: "Sarah J.", desc: "Start your day with calm vibes and news.", duration: "15 mins", color: "bg-green-100" },
  { id: 3, title: "Tech Talk", author: "Gadget Gang", desc: "Reviewing the latest phones.", duration: "45 mins", color: "bg-blue-100" },
];

const TRENDING_TOPICS = [
  { id: 1, title: "Election 2025", icon: Flame, color: "from-orange-400 to-red-500" },
  { id: 2, title: "Tech Summit", icon: Zap, color: "from-blue-400 to-cyan-500" },
  { id: 3, title: "Climate", icon: Globe, color: "from-green-400 to-emerald-500" },
];

// --- Components ---

// 1. Status Bar
const StatusBar = ({ theme = "light" }) => (
  <div className={`w-full h-12 flex justify-between items-end px-7 pb-3 text-xs font-bold z-50 select-none ${theme === "light" ? "text-white" : "text-black"}`}>
    <span className="tracking-wide">9:41</span>
    <div className="flex items-center gap-1.5">
      <Signal size={14} strokeWidth={2.5} />
      <Wifi size={14} strokeWidth={2.5} />
      <Battery size={18} strokeWidth={2} />
    </div>
  </div>
);

// 2. Brand Logo
const BrandLogo = ({ size = "medium", animated = false }) => {
  const sizeClasses = size === "large" ? "w-56 h-56" : "w-10 h-10";
  const textClasses = size === "large" ? "text-4xl" : "text-[9px]";
  
  return (
    <div className={`
      ${sizeClasses} rounded-full bg-[#D32F2F] border-2 border-white/20 ring-1 ring-black/10 flex flex-col items-center justify-center text-white font-sans shadow-2xl overflow-hidden relative shrink-0
      ${animated ? 'animate-spin-slow' : ''}
    `}>
      {size === "large" && (
        <div className="absolute inset-0 border-[1px] border-white/10 rounded-full pointer-events-none" style={{background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.2) 100%)'}}></div>
      )}
      <div className={`font-black tracking-tighter text-center leading-none ${textClasses} z-10 drop-shadow-md`}>
        BHARABAS<br/>
        <span className="text-gray-100 font-bold opacity-90">97.5 FM</span>
      </div>
      {size === "large" && (
        <div className="mt-2 font-bold bg-black w-full text-center py-1.5 absolute bottom-10 text-white text-xs tracking-[0.2em] uppercase shadow-lg">
            Pekanbaru
        </div>
      )}
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none rounded-full"></div>
    </div>
  );
};

// 3. MODERN HEADER (Fixed Top Right Issue)
const ModernHeader = ({ activeTab }) => {
  return (
    <div className="sticky top-0 z-40 bg-[#D32F2F] rounded-b-[36px] shadow-xl pb-5 pt-14 transition-all duration-300 transform translate-z-0">
      {/* Dotted Pattern Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)', 
             backgroundSize: '16px 16px'
           }}>
      </div>
      
      {/* Subtle Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/5 pointer-events-none"></div>

      <div className="relative z-10 px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-1 rounded-full backdrop-blur-md shadow-sm border border-white/20 hover:scale-105 transition-transform cursor-pointer">
             <BrandLogo size="small" />
          </div>
          {/* Page Title for non-home pages */}
          {activeTab !== 'home' && activeTab !== 'live' && (
            <h1 className="text-xl font-black text-white capitalize tracking-tight drop-shadow-md">{activeTab}</h1>
          )}
        </div>

        {/* Action Icons Section */}
        <div className="flex items-center gap-3">
           <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all border border-white/20 shadow-sm">
             <Search size={20} strokeWidth={2.5} />
           </button>
           <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all border border-white/20 shadow-sm relative">
             <Bell size={20} strokeWidth={2.5} />
             <div className="absolute top-2.5 right-3 w-2 h-2 bg-yellow-400 rounded-full border border-[#D32F2F]"></div>
           </button>
           
           {/* User Avatar - Fixed: Added Overflow Hidden to container to prevent 'frame poking out' */}
           <div className="w-10 h-10 rounded-full bg-white border-2 border-white/30 shadow-md relative cursor-pointer active:scale-95 transition-transform flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300"></div>
             <span className="text-gray-600 font-extrabold text-xs relative z-10">SC</span>
           </div>
        </div>
      </div>
    </div>
  );
};

// 4. Mini Player
const MiniPlayer = ({ isPlaying, onTogglePlay, currentTrack, visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute bottom-[100px] left-5 right-5 z-50 animate-slide-up">
      <div className="bg-[#1C1C1E]/95 backdrop-blur-3xl border border-white/10 rounded-[28px] p-2 pr-4 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-between text-white group ring-1 ring-white/5">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Animated Album Art / Icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden ring-2 ring-white/10 shadow-lg group-hover:scale-105 transition-transform">
             {isPlaying && <div className="absolute inset-0 bg-red-500 animate-pulse mix-blend-overlay"></div>}
             <Radio size={20} className="text-white relative z-10" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-bold text-sm truncate text-white leading-tight">{currentTrack?.title || "Live Radio"}</span>
            <span className="text-[10px] text-gray-400 truncate uppercase tracking-wide font-bold">{currentTrack?.artist || "97.5 FM"}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
           <button 
            onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}
            className="w-11 h-11 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-white/10"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. Weather Widget
const WeatherWidget = () => (
  <div className="mx-5 relative z-30 p-5 rounded-[28px] bg-white text-gray-800 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 group hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.12)] transition-shadow duration-300">
    {/* Subtle blue gradient bg */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-white pointer-events-none"></div>
    
    <div className="relative z-10 flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-wider mb-2 bg-blue-50 w-fit px-2 py-1 rounded-lg">
           <Car size={12} /> Traffic Update
        </div>
        <div className="flex items-center gap-3">
          <span className="text-5xl font-black tracking-tighter text-gray-900">29°</span>
          <div className="flex flex-col text-xs font-bold text-gray-500 leading-tight">
            <span>Pekanbaru</span>
            <span className="text-blue-500 font-extrabold">Cloudy</span>
          </div>
        </div>
      </div>
      <CloudSun className="text-yellow-400 drop-shadow-md scale-110 group-hover:rotate-6 transition-transform duration-500" size={64} />
    </div>
    
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex justify-between text-[11px] font-bold mb-2">
         <span className="text-gray-400">Jalan Sudirman</span>
         <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-full text-[10px]">Heavy Traffic</span>
      </div>
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
        <div className="h-full bg-green-400 w-1/4"></div>
        <div className="h-full bg-yellow-400 w-1/4"></div>
        <div className="h-full bg-red-500 w-2/4 stripe-pattern"></div>
      </div>
    </div>
  </div>
);

// 6. News Card
const NewsCard = ({ item }) => (
  <div className="flex gap-4 p-4 bg-white rounded-[24px] active:bg-gray-50 transition-colors border border-gray-100 shadow-sm hover:shadow-md cursor-pointer group">
    <div className="w-20 h-20 bg-gray-200 rounded-2xl shrink-0 overflow-hidden relative shadow-inner">
      <img src="/api/placeholder/100/100" alt="News" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"/>
    </div>
    <div className="flex flex-col justify-center flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-black text-white bg-red-600 px-2 py-1 rounded-md uppercase tracking-wide shadow-sm">{item.category}</span>
        <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
           <Clock size={10} /> {item.time}
        </span>
      </div>
      <h3 className="font-extrabold text-gray-900 text-sm leading-snug line-clamp-2 tracking-tight group-hover:text-red-700 transition-colors">{item.title}</h3>
    </div>
  </div>
);

// --- Main App ---

export default function BharabasApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null); 
  const scrollContainerRef = useRef(null);

  const handlePlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  // --- Views ---

  const renderHome = () => (
    <div className="pb-32 animate-fade-in bg-[#FAFAFA] min-h-full">
      <ModernHeader activeTab="home" />

      {/* Greeting Section - Cooler Layout */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between">
           <div>
              <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest mb-1 opacity-80 animate-fade-in">
                 <Calendar size={12} /> Thursday, 12 Dec
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Good Morning</h1>
           </div>
           {/* Optional: Tiny decorative element */}
           <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
              <CloudSun size={20} />
           </div>
        </div>
      </div>

      {/* Trending Horizontal Scroll */}
      <div className="pl-6 mb-6 overflow-x-auto no-scrollbar pb-2">
         <div className="flex gap-4 w-max pr-6">
            {TRENDING_TOPICS.map((topic) => (
               <div key={topic.id} className={`h-24 w-32 rounded-[20px] bg-gradient-to-br ${topic.color} p-3 flex flex-col justify-between text-white shadow-lg shrink-0 hover:scale-105 transition-transform`}>
                  <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm">
                     <topic.icon size={16} />
                  </div>
                  <span className="font-bold text-xs leading-tight">{topic.title}</span>
               </div>
            ))}
         </div>
      </div>

      <div className="mb-8">
        <WeatherWidget />
      </div>
      
      {/* Hero Story - Improved */}
      <div className="px-5">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="font-black text-lg text-gray-900 flex items-center gap-2 tracking-tight">
            Top Stories
          </h3>
          <span className="text-red-600 text-xs font-bold bg-white px-3 py-1.5 rounded-full cursor-pointer hover:bg-red-50 transition-colors shadow-sm border border-red-100 flex items-center gap-1">View All <ChevronRight size={12}/></span>
        </div>
        
        <div className="w-full aspect-[16/10] bg-gray-900 rounded-[32px] relative overflow-hidden mb-6 group shadow-xl shadow-gray-200 cursor-pointer">
          <img src="/api/placeholder/400/250" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Main Story"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
             <div className="flex items-center gap-2 mb-2">
                <span className="text-white bg-red-600 w-fit px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg">Politics</span>
                <span className="text-gray-300 text-[10px] font-bold">• 3h ago</span>
             </div>
             <h3 className="text-white font-extrabold text-xl leading-tight drop-shadow-md line-clamp-2">Northern Sumatra leaders raise white flag amid deadly floods</h3>
          </div>
        </div>

        <div className="space-y-3">
           {NEWS_DATA.map(item => <NewsCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );

  const renderLive = () => (
    <div className="flex flex-col h-full bg-[#050505] relative animate-fade-in">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505] via-[#2a0808] to-[#000] z-0"></div>
      
      {/* Custom Live Header (Transparent) */}
      <div className="relative z-20 pt-14 px-6 pb-4">
         <div className="flex justify-between items-center mt-2">
            <button onClick={() => setActiveTab('home')} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md text-white hover:bg-white/20 transition-all">
                <MoreHorizontal size={20} />
            </button>
            <div className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.5)] tracking-widest border border-red-500/30">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div> LIVE
            </div>
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md text-white hover:bg-white/20 transition-all">
                <MoreHorizontal size={20} className="rotate-90"/>
            </button>
         </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center mt-6">
        {/* Main Logo / Vinyl */}
        <div className="relative group cursor-pointer mb-12" onClick={() => handlePlay({ title: "Live Broadcast", artist: "97.5 FM" })}>
           <div className="absolute inset-0 bg-red-600/30 rounded-full blur-[60px] scale-125 group-hover:bg-red-500/40 transition-colors duration-500 animate-pulse"></div>
           <BrandLogo size="large" animated={isPlaying && currentTrack?.title === "Live Broadcast"} />
        </div>

        {/* Track Info */}
        <div className="text-center space-y-3 px-8">
          <p className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm">Bharabas 97.5 FM</p>
          <p className="text-sm text-red-200/80 font-bold tracking-[0.2em] uppercase border border-red-500/20 px-4 py-1.5 rounded-full inline-block backdrop-blur-sm">News & Information</p>
        </div>
      </div>

      {/* Up Next List - Hidden Scrollbar */}
      <div className="flex-1 px-8 pt-10 pb-32 overflow-y-auto z-10 no-scrollbar">
        <h3 className="font-bold text-white mb-6 text-xl flex items-center gap-2 tracking-tight">
          Up Next
        </h3>
        <div className="space-y-7 relative pl-2">
          <div className="absolute left-[35px] top-3 bottom-0 w-0.5 bg-gray-800 rounded-full"></div>
          
          {[
            { time: "05:00", label: "Politics", title: "Digital Scams Bill Debate" },
            { time: "06:00", label: "Culture", title: "The Art of Tenun" },
            { time: "07:00", label: "Local", title: "Community Garden Launch" },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 relative group">
              <div className="text-xs font-bold text-gray-500 w-12 shrink-0 pt-2 text-right">{item.time}</div>
              <div className="w-5 h-5 bg-[#1a1a1a] rounded-full border-[4px] border-red-600 absolute left-[26px] top-1 z-10 shadow-[0_0_10px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform"></div>
              <div className="pb-5 border-b border-gray-800/50 flex-1">
                 <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-1 block">{item.label}</span>
                 <p className="text-base font-bold text-gray-200">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Floating Play Button */}
       <button 
          onClick={() => handlePlay({ title: "Live Broadcast", artist: "97.5 FM" })}
          className="absolute top-[58%] right-8 w-16 h-16 bg-[#D32F2F] text-white rounded-full shadow-[0_20px_40px_-10px_rgba(211,47,47,0.6)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20 border-4 border-[#121212] group"
        >
          {isPlaying && currentTrack?.title === "Live Broadcast" ? <Pause size={28} fill="currentColor"/> : <Play size={28} fill="currentColor" className="ml-1 group-hover:scale-110 transition-transform"/>}
       </button>
    </div>
  );

  const renderNews = () => (
    <div className="pb-32 animate-fade-in bg-[#FAFAFA] min-h-full">
      <ModernHeader activeTab="News" />
      
      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto pb-4 pt-6 px-5 no-scrollbar">
        {["All", "Politics", "Entertainment", "Finance", "Sports", "Tech"].map((cat, i) => (
          <button key={i} className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${i === 0 ? 'bg-black text-white' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-200'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3 px-5">
        {NEWS_DATA.map(item => <NewsCard key={item.id} item={item} />)}
        {NEWS_DATA.map(item => <NewsCard key={item.id + 10} item={item} />)}
      </div>
    </div>
  );

  const renderPodcasts = () => (
    <div className="pb-32 animate-fade-in bg-[#FAFAFA] min-h-full">
      <ModernHeader activeTab="Podcasts" />

      <div className="px-5 mt-6 space-y-8">
        {/* Highlight Card */}
        <div className="w-full bg-[#1C1C1E] p-8 rounded-[32px] flex items-center gap-5 relative overflow-hidden shadow-2xl text-white group cursor-pointer">
            <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">New Release</span>
            </div>
            <h2 className="font-bold text-white text-2xl leading-tight mb-6">New bill aims to curb rising digital scams</h2>
            <button onClick={() => handlePlay({ title: "Digital Scams", artist: "Pekanbaru Daily" })} className="bg-white text-black px-6 py-3 rounded-full text-xs font-black flex items-center gap-2 w-fit hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 active:scale-95">
                <Play size={14} fill="currentColor"/> Listen Now
            </button>
            </div>
            <div className="w-36 h-36 bg-gray-700 rounded-2xl shrink-0 relative z-10 shadow-2xl -rotate-6 overflow-hidden border-4 border-white/10 group-hover:rotate-0 transition-transform duration-500">
            <img src="/api/placeholder/150/150" className="w-full h-full object-cover opacity-80" alt="Host"/>
            </div>
            {/* Glow */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/20 blur-3xl rounded-full pointer-events-none"></div>
        </div>

        {/* Horizontal Scroll */}
        <div>
            <div className="flex justify-between items-center mb-5 px-1">
            <h3 className="font-black text-xl text-gray-900 tracking-tight">Trending</h3>
            <TrendingUp size={20} className="text-red-500"/>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-6 -mx-5 px-5 snap-x no-scrollbar">
            {PODCAST_DATA.map(item => (
                <div key={item.id} className="min-w-[170px] snap-start group cursor-pointer" onClick={() => handlePlay({ title: item.title, artist: item.author })}>
                <div className={`w-full aspect-square ${item.color} rounded-[24px] mb-3 overflow-hidden relative shadow-md`}>
                    <img src="/api/placeholder/150/150" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" alt="cover"/>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="bg-white/90 p-3.5 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl backdrop-blur-sm">
                            <Play size={20} fill="black" className="ml-1"/>
                        </div>
                    </div>
                </div>
                <h4 className="font-bold text-gray-900 text-[15px] truncate">{item.title}</h4>
                <p className="text-xs text-gray-500 truncate font-bold">{item.author}</p>
                </div>
            ))}
            </div>
        </div>

        {/* List */}
        <div>
            <h3 className="font-black text-xl text-gray-900 mb-4 px-1 tracking-tight">For You</h3>
            <div className="space-y-4">
            {PODCAST_DATA.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-[20px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePlay({ title: item.title, artist: item.author })}>
                <div className="w-12 h-12 bg-gray-50 rounded-full shrink-0 flex items-center justify-center text-gray-500 border border-gray-100">
                    <Mic size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 truncate">{item.title}</h4>
                    <p className="text-xs text-gray-500 truncate font-bold">{item.desc}</p>
                </div>
                <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white group-hover:border-transparent transition-all">
                    <Play size={12} fill="currentColor" className="ml-0.5"/>
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="pb-32 animate-fade-in bg-[#FAFAFA] min-h-full">
      <ModernHeader activeTab="Library" />

      <div className="px-5 mt-6">
        <div className="bg-white p-2 rounded-2xl flex mb-8 shadow-sm border border-gray-100">
            <button className="flex-1 py-3 text-xs font-black bg-black text-white shadow-lg rounded-xl">Playlists</button>
            <button className="flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">Downloads</button>
            <button className="flex-1 py-3 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">History</button>
        </div>

        <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Your Favorites</h3>
            {[1,2,3,4,5].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white hover:shadow-sm transition-all group cursor-pointer border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shadow-sm border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Music size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">Save Your Tears</h4>
                    <p className="text-xs text-gray-500 font-bold">Sabrina Carpenter</p>
                </div>
                </div>
                <MoreHorizontal size={20} className="text-gray-300 group-hover:text-gray-600" />
            </div>
            ))}
        </div>
      </div>
    </div>
  );

  // --- Layout ---

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F2F2F7] p-8 antialiased">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .stripe-pattern { background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255, 255, 255, 0.2) 5px, rgba(255, 255, 255, 0.2) 10px); }
          @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .animate-slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
          @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        `}</style>

      {/* iPhone 17 Concept Frame Container */}
      <div className="relative w-full max-w-[400px] h-[860px] bg-white rounded-[55px] shadow-[0_0_0_4px_#3d3d3d,0_30px_80px_-10px_rgba(0,0,0,0.4)] overflow-hidden border-[4px] border-[#3d3d3d] ring-1 ring-white/10">
        
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-[60] flex justify-center items-center pointer-events-none transition-all duration-300">
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#1a1a1a]"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-[#101010]"></div>
             </div>
        </div>

        {/* Status Bar - Always visible */}
        <div className={`absolute top-0 w-full pt-1 z-50`}>
           <StatusBar theme={activeTab === 'live' ? 'light' : 'light'} />
        </div>

        {/* Main Content */}
        <div 
          ref={scrollContainerRef}
          className={`h-full overflow-y-auto no-scrollbar bg-[#FAFAFA]`}
        >
          {activeTab === 'home' && renderHome()}
          {activeTab === 'live' && renderLive()}
          {activeTab === 'news' && renderNews()}
          {activeTab === 'podcast' && renderPodcasts()}
          {activeTab === 'library' && renderLibrary()}
        </div>

        {/* Floating Mini Player */}
        <MiniPlayer 
          isPlaying={isPlaying} 
          onTogglePlay={() => setIsPlaying(!isPlaying)} 
          currentTrack={currentTrack}
          visible={!!currentTrack}
        />

        {/* Bottom Navigation */}
        <nav 
          className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-2xl px-2 py-3 flex justify-between items-center rounded-[32px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-white/40 z-50"
        >
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'live', icon: Radio, label: 'Live' },
            { id: 'news', icon: Newspaper, label: 'News' },
            { id: 'podcast', icon: Headphones, label: 'Podcast' },
            { id: 'library', icon: Library, label: 'Library' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center gap-1 relative group w-full h-full"
            >
              <div className={`transition-all duration-300 p-3 rounded-full ${activeTab === tab.id ? 'bg-gradient-to-br from-[#D32F2F] to-[#E53935] text-white shadow-lg shadow-red-500/30 -translate-y-2' : 'text-gray-400 hover:bg-gray-100'}`}>
                 <tab.icon 
                  size={22} 
                  className={`transition-colors duration-300 ${activeTab === tab.id ? 'fill-current' : ''}`}
                  strokeWidth={activeTab === tab.id ? 2.5 : 2}
                />
              </div>
            </button>
          ))}
        </nav>
        
        {/* iPhone Home Indicator */}
        <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full z-[60] pointer-events-none ${activeTab === 'live' ? 'bg-white/20' : 'bg-black/20'}`}></div>

      </div>
    </div>
  );
}
