import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { Upload, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

export default function AdminGallery() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadData, setUploadData] = useState({ category: 'general', caption: '' });
  const fileInputRef = useRef(null);

  const fetchPhotos = async () => {
    try {
      const res = await api.get('/gallery/photos');
      setPhotos(res.data);
    } catch (err) {
      toast.error('Failed to load photos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) return toast.error('Please select an image to upload');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', uploadData.category);
    formData.append('caption', uploadData.caption);

    setIsUploading(true);
    try {
      await api.post('/gallery/photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Photo uploaded successfully');
      fileInputRef.current.value = '';
      setUploadData({ category: 'general', caption: '' });
      fetchPhotos();
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await api.delete(`/gallery/photos/${id}`);
      toast.success('Photo deleted');
      setPhotos(photos.filter(p => p.id !== id));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-charcoal">Manage Gallery</h1>
        <p className="text-charcoal/60 mt-1">Upload and organise hospital photos</p>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
        <h2 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
          <Upload size={24} className="text-saffron" /> Upload New Photo
        </h2>
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="col-span-1 lg:col-span-2">
            <label className="block text-sm font-medium text-charcoal mb-2">Image File</label>
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/*"
              className="w-full text-sm text-charcoal file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-forest/10 file:text-forest hover:file:bg-forest/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Category</label>
            <select 
              value={uploadData.category}
              onChange={e => setUploadData({...uploadData, category: e.target.value})}
              className="w-full px-4 py-2 bg-cream/50 border border-border rounded-xl"
            >
              <option value="general">General</option>
              <option value="surgery">Surgery</option>
              <option value="ambulance">Ambulance</option>
              <option value="wards">Wards</option>
              <option value="csr">CSR</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={isUploading}
            className="w-full bg-forest hover:bg-forest-light text-white font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-2"
          >
            {isUploading ? <Loader2 className="animate-spin" size={20} /> : 'Upload Photo'}
          </button>
        </form>
      </div>

      {/* Photo Grid */}
      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-saffron" size={40} /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map(photo => (
            <div key={photo.id} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden group">
              <div className="aspect-square relative overflow-hidden bg-cream">
                <img 
                  src={`http://localhost:5000${photo.filepath}`} 
                  alt={photo.caption || photo.category} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button onClick={() => handleDelete(photo.id)} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-3 text-center">
                <span className="inline-block px-2 py-1 bg-forest/10 text-forest text-xs font-bold uppercase rounded-md">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
          {photos.length === 0 && (
            <div className="col-span-full py-12 text-center text-charcoal/40 border-2 border-dashed border-border rounded-2xl">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>No photos uploaded yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
