/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Heart, 
  User, 
  Calendar, 
  Star, 
  ArrowRight, 
  Menu,
  ChevronLeft,
  Settings,
  Bell
} from 'lucide-react';
import { DESTINATIONS, Destination } from './constants';

type Tab = 'home' | 'explore' | 'bookings' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-luxury-black max-w-md mx-auto relative overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {selectedDestination ? (
          <DetailView 
            destination={selectedDestination} 
            onBack={() => setSelectedDestination(null)} 
          />
        ) : (
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 pb-24"
          >
            {activeTab === 'home' && (
              <HomeView onSelect={setSelectedDestination} />
            )}
            {activeTab === 'explore' && <ExploreView onSelect={setSelectedDestination} />}
            {activeTab === 'bookings' && <BookingsView />}
            {activeTab === 'profile' && <ProfileView />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      {!selectedDestination && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl py-4 px-6 flex justify-between items-center z-50">
          <NavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} icon={<Navigation className="w-5 h-5" />} label="Home" />
          <NavButton active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} icon={<Search className="w-5 h-5" />} label="Explore" />
          <NavButton active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} icon={<Calendar className="w-5 h-5" />} label="Plan" />
          <NavButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User className="w-5 h-5" />} label="Me" />
        </div>
      )}
    </div>
  );
}

function HomeView({ onSelect }: { onSelect: (d: Destination) => void }) {
  return (
    <div className="px-6 pt-12 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white/50 text-xs font-medium uppercase tracking-[0.2em] mb-1">Discover</p>
          <h1 className="text-3xl font-display font-light">Lumina Travels</h1>
        </div>
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center relative">
          <Bell className="w-5 h-5 text-white/80" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-luxury-gold rounded-full border-2 border-luxury-black"></span>
        </div>
      </div>

      {/* Hero Card */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(DESTINATIONS[0])}
        className="relative h-[480px] rounded-[40px] overflow-hidden group cursor-pointer"
      >
        <img 
          src={DESTINATIONS[0].image} 
          alt={DESTINATIONS[0].name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-8 left-8 right-8 space-y-3">
          <div className="flex items-center gap-2 text-white/70 text-xs font-medium uppercase tracking-widest">
            <MapPin className="w-3 h-3 text-luxury-gold" />
            <span>{DESTINATIONS[0].location}</span>
          </div>
          <h2 className="text-4xl font-display font-light leading-tight">Villas over the <br/><span className="italic">Amalfi Coast</span></h2>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xl font-light">{DESTINATIONS[0].price}<span className="text-sm text-white/50">/night</span></span>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-luxury-gold transition-colors">
              <ArrowRight className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Popular Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-xl font-display font-light">Most curated</h3>
          <button className="text-xs text-white/50 border-b border-white/20 pb-0.5">View all</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {DESTINATIONS.slice(1).map((dest) => (
            <motion.div 
              key={dest.id} 
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(dest)}
              className="min-w-[280px] group cursor-pointer"
            >
              <div className="h-[200px] rounded-3xl overflow-hidden mb-3 relative">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-lg">{dest.name}</h4>
                  <p className="text-sm text-white/50">{dest.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                  <span className="text-sm font-medium">{dest.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExploreView({ onSelect }: { onSelect: (d: Destination) => void }) {
  return (
    <div className="px-6 pt-12 space-y-6">
      <h2 className="text-3xl font-display font-light">Find your<br/>next escape</h2>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <input 
          placeholder="Search world curated places..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-luxury-gold/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {DESTINATIONS.map((dest) => (
          <div key={dest.id} onClick={() => onSelect(dest)} className="aspect-[3/4] rounded-2xl overflow-hidden relative group cursor-pointer">
            <img 
              src={dest.image} 
              alt={dest.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">{dest.location}</p>
              <h4 className="font-display font-light">{dest.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingsView() {
  return (
    <div className="px-6 pt-12 text-center flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <Calendar className="w-8 h-8 text-white/20" />
      </div>
      <h2 className="text-2xl font-display font-light">No active plans</h2>
      <p className="text-white/40 text-sm max-w-[240px]">Start exploring and curate your personal luxury journey with us.</p>
      <button className="bg-white text-black px-8 py-3 rounded-2xl text-sm font-medium tracking-wide">Browse Collections</button>
    </div>
  );
}

function ProfileView() {
  const avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";
  
  return (
    <div className="px-6 pt-12 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-light">Profile</h2>
        <Settings className="w-5 h-5 text-white/50" />
      </div>

      <div className="flex flex-col items-center py-6">
        <div className="w-24 h-24 rounded-full p-1 border-2 border-luxury-gold/50 mb-4">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
        <h3 className="text-xl font-medium">Lucie Duteil</h3>
        <p className="text-white/40 text-sm">Platinum Member · Established 2024</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ProfileStat label="Bookings" value="12" />
        <ProfileStat label="Wishlist" value="48" />
        <ProfileStat label="Points" value="12k" />
      </div>

      <div className="space-y-2 pt-4">
        <ProfileItem icon={<Bell />} label="Notifications" />
        <ProfileItem icon={<Heart />} label="Favorites" />
        <ProfileItem icon={<MapPin />} label="Addresses" />
        <ProfileItem icon={<User />} label="Personal Info" />
      </div>
    </div>
  );
}

function DetailView({ destination, onBack }: { destination: Destination, onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="fixed inset-0 bg-luxury-black z-[100] flex flex-col h-full bg-black"
    >
      <div className="relative h-[60%] w-full">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black to-transparent" />
        
        <div className="absolute top-8 left-6 right-6 flex justify-between items-center">
          <button onClick={onBack} className="w-11 h-11 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="w-11 h-11 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-luxury-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2">{destination.location}</p>
          <h2 className="text-5xl font-display font-light leading-tight">{destination.name}</h2>
        </div>
      </div>

      <div className="flex-1 px-8 pt-8 space-y-6 overflow-y-auto no-scrollbar pb-32">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 bg-white/5 py-2 px-3 rounded-xl border border-white/10">
              <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
              <span className="text-sm font-medium">{destination.rating}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/5 py-2 px-3 rounded-xl border border-white/10">
              <Calendar className="w-3 h-3 text-white/50" />
              <span className="text-sm font-medium">4 Days</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[10px] uppercase tracking-wider">Start from</p>
            <p className="text-2xl font-display text-luxury-gold">{destination.price}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium tracking-wide italic">Overview</h3>
          <p className="text-white/60 leading-relaxed font-light text-sm">
            {destination.description} This curated escape offers unparalleled comfort and scenic beauty, designed for the most discerning travelers seeking both adventure and serenity.
          </p>
        </div>

        <div className="pt-4 flex gap-4 overflow-x-auto no-scrollbar">
          <div className="min-w-[120px] p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2">
            <Navigation className="w-5 h-5 text-luxury-gold" />
            <span className="text-[10px] uppercase tracking-wider">Flight</span>
          </div>
          <div className="min-w-[120px] p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2">
            <Search className="w-5 h-5 text-luxury-gold" />
            <span className="text-[10px] uppercase tracking-wider">Tour</span>
          </div>
          <div className="min-w-[120px] p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center gap-2">
            <Menu className="w-5 h-5 text-luxury-gold" />
            <span className="text-[10px] uppercase tracking-wider">Dining</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-8 right-8 z-50">
        <button className="w-full bg-white text-black py-5 rounded-3xl font-semibold tracking-widest uppercase text-xs flex items-center justify-center gap-3 shadow-2xl shadow-luxury-gold/10">
          Tailor my journey
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-white scale-110' : 'text-white/40 hover:text-white/60'}`}
    >
      <div className="relative">
        {icon}
        {active && (
          <motion.div 
            layoutId="nav-dot"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-luxury-gold rounded-full"
          />
        )}
      </div>
      <span className="text-[10px] font-medium tracking-wider">{label}</span>
    </button>
  );
}

function ProfileStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center p-4 bg-white/5 border border-white/10 rounded-2xl">
      <p className="text-xl font-display text-white">{value}</p>
      <p className="text-[10px] text-white/40 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function ProfileItem({ icon, label }: { icon: ReactNode, label: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-5 h-5 text-white/60">{icon}</div>
        <span className="text-sm font-medium tracking-wide">{label}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-white/20" />
    </div>
  );
}
