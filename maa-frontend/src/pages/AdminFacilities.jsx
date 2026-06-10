import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Upload, Trash2, Loader2, Image as ImageIcon, Edit2, X, Check } from 'lucide-react';

const BACKEND = 'http://localhost:5000';
const CATEGORIES = ['general', 'cattle', 'dogs', 'sheep', 'poultry'];

export default function AdminFacilities() {
  const [items, setItems]           = useState([]);
  const [isLoading, setIsLoading]   = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId]   = useState(null);
  const [form, setForm]             = useState({ title: '', description: '', category: 'general', display_order: 0 });
  const [preview, setPreview]       = useState(null);
  const fileRef                     = useRef(null);

  const fetchItems = async () => {
    try {
      const res = await api.get('/facilities');
      setItems(res.data);
    } catch {
      toast.error('Failed to load facilities');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({ title: '', description: '', category: 'general', display_order: 0 });
    setPreview(null);
    setEditingId(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return toast.error('Title is required');

    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('category', form.category);
    fd.append('display_order', form.display_order);
    if (fileRef.current?.files[0]) fd.append('image', fileRef.current.files[0]);

    setIsUploading(true);
    try {
      if (editingId) {
        await api.put(`/facilities/${editingId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Facility updated!');
      } else {
        await api.post('/facilities', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Facility added!');
      }
      resetForm();
      fetchItems();
    } catch {
      toast.error(editingId ? 'Update failed' : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ title: item.title, description: item.description || '', category: item.category, display_order: item.display_order });
    setPreview(item.image_path ? `${BACKEND}${item.image_path}` : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this facility card?')) return;
    try {
      await api.delete(`/facilities/${id}`);
      toast.success('Deleted');
      setItems(items.filter(i => i.id !== id));
    } catch {
      toast.error('Delete failed');
    }
  };

  const imgSrc = (item) =>
    item.image_path?.startsWith('/facilities/')
      ? item.image_path
      : `${BACKEND}${item.image_path}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-charcoal">Manage Medical Facilities</h1>
        <p className="text-charcoal/60 mt-1">Upload photos with titles for the Medical Facilities page</p>
      </div>

      {/* Upload / Edit Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
        <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
          {editingId ? <Edit2 size={22} className="text-saffron" /> : <Upload size={22} className="text-saffron" />}
          {editingId ? 'Edit Facility Card' : 'Add New Facility Card'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload + Preview */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-48 h-40 rounded-2xl border-2 border-dashed border-border bg-cream/40 overflow-hidden flex-shrink-0 flex items-center justify-center relative group">
              {preview ? (
                <>
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Change Photo</span>
                  </div>
                </>
              ) : (
                <div className="text-center text-charcoal/40 p-4">
                  <ImageIcon size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-xs">Click below to select</p>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Photo <span className="text-charcoal/40">(JPG, PNG, WEBP)</span></label>
                <input
                  type="file"
                  ref={fileRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-forest/10 file:text-forest hover:file:bg-forest/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl text-charcoal capitalize"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    value={form.display_order}
                    onChange={e => setForm({ ...form, display_order: e.target.value })}
                    className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl text-charcoal"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Title <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Operation Theatre"
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl text-charcoal"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Description <span className="text-charcoal/40">(optional)</span></label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description shown on the card..."
              rows={3}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl text-charcoal resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            {editingId && (
              <button type="button" onClick={resetForm} className="flex items-center gap-2 px-5 py-2 border border-border rounded-xl text-charcoal hover:bg-cream transition-colors">
                <X size={16} /> Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isUploading}
              className="flex items-center gap-2 bg-forest hover:bg-forest-light text-white font-bold py-2 px-8 rounded-xl transition-colors"
            >
              {isUploading
                ? <><Loader2 className="animate-spin" size={18} /> Saving...</>
                : editingId
                  ? <><Check size={18} /> Update Card</>
                  : <><Upload size={18} /> Add Card</>
              }
            </button>
          </div>
        </form>
      </div>

      {/* Cards Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-display font-bold text-charcoal mb-5">
          All Facility Cards <span className="text-charcoal/40 font-normal text-sm ml-1">({items.length})</span>
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-saffron" size={36} /></div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-charcoal/40 border-2 border-dashed border-border rounded-2xl">
            <ImageIcon size={48} className="mx-auto mb-3 opacity-40" />
            <p>No facility cards yet. Add your first one above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(item => (
              <div key={item.id} className="rounded-2xl border border-border overflow-hidden group">
                <div className="relative aspect-[4/3] bg-cream/50 overflow-hidden">
                  {item.image_path ? (
                    <img
                      src={imgSrc(item)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">🏥</div>
                  )}
                  <span className="absolute top-2 left-2 bg-forest text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-bold text-charcoal text-sm line-clamp-1">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-charcoal/50 mt-1 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => startEdit(item)}
                      className="flex-1 flex items-center justify-center gap-1 text-sm text-forest border border-forest/30 hover:bg-forest/5 rounded-lg py-1.5 transition-colors"
                    >
                      <Edit2 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 flex items-center justify-center gap-1 text-sm text-red-500 border border-red-200 hover:bg-red-50 rounded-lg py-1.5 transition-colors"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
