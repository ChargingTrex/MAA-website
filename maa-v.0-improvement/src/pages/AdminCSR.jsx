import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { HeartHandshake, Trash2, Loader2, Calendar } from 'lucide-react';

export default function AdminCSR() {
  const [csr, setCsr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', date: '' });

  const fetchCsr = async () => {
    try {
      const res = await api.get('/csr');
      setCsr(res.data);
    } catch (err) {
      toast.error('Failed to load CSR activities');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCsr();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return toast.error('Title and Date are required');

    setIsUploading(true);
    try {
      await api.post('/csr', formData); // Not doing images for simplicity right now
      toast.success('CSR Activity logged');
      setFormData({ title: '', description: '', date: '' });
      fetchCsr();
    } catch (err) {
      toast.error('Failed to save CSR activity');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this activity?')) return;
    try {
      await api.delete(`/csr/${id}`);
      toast.success('Activity removed');
      setCsr(csr.filter(m => m.id !== id));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-charcoal">Manage CSR</h1>
        <p className="text-charcoal/60 mt-1">Log Corporate Social Responsibility events</p>
      </div>

      {/* Add Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
        <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
          <HeartHandshake size={24} className="text-saffron" /> Log New Activity
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Event Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
              placeholder="Free Rabies Vaccination Drive"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Event Date</label>
            <input 
              type="date" 
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl h-24 resize-none"
              placeholder="Describe the event and its impact..."
            />
          </div>
          <div className="md:col-span-2 flex justify-end mt-4">
            <button 
              type="submit" 
              disabled={isUploading}
              className="bg-forest hover:bg-forest-light text-white font-bold py-2 px-8 rounded-xl flex items-center gap-2"
            >
              {isUploading ? <Loader2 className="animate-spin" size={20} /> : 'Save Activity'}
            </button>
          </div>
        </form>
      </div>

      {/* CSR List */}
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="animate-spin text-saffron" size={40} /></div>
        ) : csr.length === 0 ? (
          <div className="p-12 text-center text-charcoal/40">
            <Calendar size={48} className="mx-auto mb-4 opacity-50" />
            <p>No CSR activities logged yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-forest/5 text-forest border-b border-border">
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Date</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Event Details</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {csr.map((activity) => (
                  <tr key={activity.id} className="border-b border-border hover:bg-cream/30">
                    <td className="p-4 whitespace-nowrap text-charcoal font-medium">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-charcoal">
                      <div className="font-bold">{activity.title}</div>
                      <div className="text-sm text-charcoal/70 line-clamp-2 max-w-lg mt-1">{activity.description}</div>
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleDelete(activity.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
