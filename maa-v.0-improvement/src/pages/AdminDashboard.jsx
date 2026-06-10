import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Image, Users, HeartHandshake, Loader2, PackageSearch } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ photos: 0, team: 0, csr: 0, sponsors: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [photos, team, csr, sponsors] = await Promise.all([
          api.get('/gallery/photos'),
          api.get('/team'),
          api.get('/csr'),
          api.get('/sponsors')
        ]);
        setStats({
          photos: photos.data.length,
          team: team.data.length,
          csr: csr.data.length,
          sponsors: sponsors.data.length
        });
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-saffron" size={40} /></div>;

  const cards = [
    { label: 'Gallery Photos', value: stats.photos, icon: Image, color: 'bg-forest' },
    { label: 'Team Members', value: stats.team, icon: Users, color: 'bg-saffron' },
    { label: 'CSR Activities', value: stats.csr, icon: HeartHandshake, color: 'bg-charcoal' },
    { label: 'Sponsor Needs', value: stats.sponsors, icon: PackageSearch, color: 'bg-blue-600' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-charcoal">Dashboard</h1>
        <p className="text-charcoal/60 mt-1">Welcome to the MAA Hospital Content Management System.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-border p-6 flex items-center gap-6">
            <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center shrink-0`}>
              <card.icon className="text-white" size={32} />
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal/60 uppercase tracking-wider">{card.label}</p>
              <p className="text-4xl font-display font-bold text-charcoal">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
