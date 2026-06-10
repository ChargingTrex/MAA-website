import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { PackageSearch, Trash2, Loader2, CheckCircle2, Circle, Pencil } from 'lucide-react';

export default function AdminSponsor() {
  const [needs, setNeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', cost: '', status: 'Needed', description: '' });

  const fetchNeeds = async () => {
    try {
      const res = await api.get('/sponsors');
      setNeeds(res.data);
    } catch (err) {
      toast.error('Failed to load sponsor needs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNeeds();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', cost: '', status: 'Needed', description: '' });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.cost) return toast.error('Name and cost are required');

    setIsSubmitting(true);
    try {
      if (editId) {
        await api.put(`/sponsors/${editId}`, formData);
        toast.success('Sponsor need updated');
      } else {
        await api.post('/sponsors', formData);
        toast.success('Sponsor need added');
      }
      resetForm();
      fetchNeeds();
    } catch (err) {
      toast.error('Failed to save');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (need) => {
    setEditId(need.id);
    setFormData({
      name: need.name,
      cost: need.cost,
      status: need.status,
      description: need.description || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;
    try {
      await api.delete(`/sponsors/${id}`);
      toast.success('Item removed');
      setNeeds(needs.filter(n => n.id !== id));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const toggleStatus = async (need) => {
    const newStatus = need.status === 'Needed' ? 'Funded' : 'Needed';
    try {
      await api.put(`/sponsors/${need.id}`, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      fetchNeeds();
    } catch (err) {
      toast.error('Status update failed');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-charcoal">Manage Sponsor Needs</h1>
        <p className="text-charcoal/60 mt-1">Add and manage hospital equipment & funding needs</p>
      </div>

      {/* Add / Edit Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
        <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
          <PackageSearch size={24} className="text-saffron" />
          {editId ? 'Edit Need' : 'Add New Need'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Item Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
              placeholder="Ultrasound Machine"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Estimated Cost</label>
            <input 
              type="text" 
              value={formData.cost}
              onChange={e => setFormData({...formData, cost: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
              placeholder="₹2,50,000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Status</label>
            <select
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
            >
              <option value="Needed">Needed</option>
              <option value="Funded">Funded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
            <input 
              type="text" 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
              placeholder="Crucial for non-invasive diagnostics."
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            {editId && (
              <button type="button" onClick={resetForm} className="px-6 py-2 rounded-xl border border-border text-charcoal hover:bg-cream transition-colors">
                Cancel
              </button>
            )}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-forest hover:bg-forest-light text-white font-bold py-2 px-8 rounded-xl flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : editId ? 'Update' : 'Add Need'}
            </button>
          </div>
        </form>
      </div>

      {/* Needs List */}
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="animate-spin text-saffron" size={40} /></div>
        ) : needs.length === 0 ? (
          <div className="p-12 text-center text-charcoal/40">
            <PackageSearch size={48} className="mx-auto mb-4 opacity-50" />
            <p>No sponsor needs added yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-forest/5 text-forest border-b border-border">
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Item</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Cost</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Status</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {needs.map((need) => (
                  <tr key={need.id} className="border-b border-border hover:bg-cream/30">
                    <td className="p-4 text-charcoal">
                      <div className="font-bold">{need.name}</div>
                      {need.description && <div className="text-sm text-charcoal/70 mt-1">{need.description}</div>}
                    </td>
                    <td className="p-4 font-mono font-bold text-forest whitespace-nowrap">{need.cost}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleStatus(need)}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                          need.status === 'Funded' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-saffron/10 text-saffron hover:bg-saffron/20'
                        }`}
                      >
                        {need.status === 'Funded' ? <CheckCircle2 size={14} /> : <Circle size={14} className="fill-saffron text-saffron" />}
                        {need.status}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(need)} className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDelete(need.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
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
