import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { UserPlus, Trash2, Loader2, Users } from 'lucide-react';

export default function AdminTeam() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ name: '', designation: '', qualification: '', display_order: 0 });
  const fileInputRef = useRef(null);

  const fetchTeam = async () => {
    try {
      const res = await api.get('/team');
      setTeam(res.data);
    } catch (err) {
      toast.error('Failed to load team');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.designation) return toast.error('Name and designation are required');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('designation', formData.designation);
    data.append('qualification', formData.qualification);
    data.append('display_order', formData.display_order);
    
    if (fileInputRef.current.files[0]) {
      data.append('photo', fileInputRef.current.files[0]);
    }

    setIsUploading(true);
    try {
      await api.post('/team', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Team member added');
      setFormData({ name: '', designation: '', qualification: '', display_order: 0 });
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchTeam();
    } catch (err) {
      toast.error('Failed to add team member');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this team member?')) return;
    try {
      await api.delete(`/team/${id}`);
      toast.success('Team member removed');
      setTeam(team.filter(m => m.id !== id));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-charcoal">Manage Team</h1>
        <p className="text-charcoal/60 mt-1">Add or remove doctors and staff</p>
      </div>

      {/* Add Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
        <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
          <UserPlus size={24} className="text-saffron" /> Add New Member
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
              placeholder="Dr. John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Designation</label>
            <input 
              type="text" 
              value={formData.designation}
              onChange={e => setFormData({...formData, designation: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
              placeholder="Chief Veterinarian"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Qualifications</label>
            <input 
              type="text" 
              value={formData.qualification}
              onChange={e => setFormData({...formData, qualification: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
              placeholder="MVSc, PhD"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Profile Photo (Optional)</label>
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/*"
              className="w-full text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-forest/10 file:text-forest hover:file:bg-forest/20"
            />
          </div>
          <div className="md:col-span-2 flex justify-end mt-4">
            <button 
              type="submit" 
              disabled={isUploading}
              className="bg-forest hover:bg-forest-light text-white font-bold py-2 px-8 rounded-xl flex items-center gap-2"
            >
              {isUploading ? <Loader2 className="animate-spin" size={20} /> : 'Save Member'}
            </button>
          </div>
        </form>
      </div>

      {/* Team List */}
      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="animate-spin text-saffron" size={40} /></div>
        ) : team.length === 0 ? (
          <div className="p-12 text-center text-charcoal/40">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No team members added yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-forest/5 text-forest border-b border-border">
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Photo</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Name</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Designation</th>
                  <th className="p-4 font-bold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {team.map((member) => (
                  <tr key={member.id} className="border-b border-border hover:bg-cream/30">
                    <td className="p-4">
                      {member.photo_path ? (
                        <img src={`http://localhost:5000${member.photo_path}`} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-border" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-charcoal">{member.name}</td>
                    <td className="p-4 text-charcoal/70">
                      <div>{member.designation}</div>
                      <div className="text-xs text-charcoal/50">{member.qualification}</div>
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors">
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
