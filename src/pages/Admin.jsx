import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { usePortfolioItems } from '../hooks/usePortfolioItems';
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  ArrowLeft,
  Check,
  AlertCircle,
  RefreshCw,
  Eye,
  Sparkles,
  Film,
  Image as ImageIcon,
} from 'lucide-react';
import Button from '../components/Button';
import PortfolioCard from '../components/Work/PortfolioCard';
import { CATEGORIES } from '../components/Work/CategoryFilter';

export default function Admin() {
  const {
    items,
    loading: itemsLoading,
    saveItem,
    deleteItem,
    refetch,
    isLive,
  } = usePortfolioItems();

  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Form State for Add / Edit
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    title: '',
    tagline: '',
    client: '',
    category: 'podcast',
    mediaType: 'video',
    youtubeId: '',
    imageSrc: '',
    externalUrl: '',
    year: new Date().getFullYear(),
    tools: '',
    featured: false,
    sortOrder: 0,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formMsg, setFormMsg] = useState({ type: '', text: '' });

  // Listen to Supabase Auth State
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setAuthLoading(true);
    setAuthError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setSession(data.session);
    } catch (err) {
      setAuthError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      tagline: item.tagline || '',
      client: item.client || '',
      category: item.category,
      mediaType: item.mediaType || 'video',
      youtubeId: item.youtubeId || '',
      imageSrc: item.imageSrc || '',
      externalUrl: item.externalUrl || '',
      year: item.year || new Date().getFullYear(),
      tools: item.tools ? item.tools.join(', ') : '',
      featured: Boolean(item.featured),
      sortOrder: item.sortOrder ?? 0,
    });
    setFormMsg({ type: '', text: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setForm({
      title: '',
      tagline: '',
      client: '',
      category: 'podcast',
      mediaType: 'video',
      youtubeId: '',
      imageSrc: '',
      externalUrl: '',
      year: new Date().getFullYear(),
      tools: '',
      featured: false,
      sortOrder: 0,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) {
      return;
    }
    try {
      await deleteItem(id);
      if (editingItem?.id === id) {
        handleCancelEdit();
      }
      setFormMsg({ type: 'success', text: 'Item deleted successfully.' });
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMsg({ type: '', text: '' });

    const toolsArray = form.tools
      ? form.tools.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const itemPayload = {
      id: editingItem?.id,
      title: form.title,
      tagline: form.tagline,
      client: form.client,
      category: form.category,
      mediaType: form.mediaType,
      youtubeId: form.mediaType === 'video' ? form.youtubeId : '',
      imageSrc: form.mediaType === 'image' ? form.imageSrc : '',
      externalUrl: form.externalUrl || '',
      year: parseInt(form.year, 10) || new Date().getFullYear(),
      tools: toolsArray,
      featured: Boolean(form.featured),
      sortOrder: parseInt(form.sortOrder, 10) || 0,
    };

    try {
      await saveItem(itemPayload);
      setFormMsg({
        type: 'success',
        text: editingItem
          ? 'Item updated successfully!'
          : 'New piece added to catalog!',
      });
      handleCancelEdit();
    } catch (err) {
      setFormMsg({ type: 'error', text: err.message || 'Operation failed' });
    } finally {
      setFormLoading(false);
    }
  };

  // Construct preview item for real-time PortfolioCard preview
  const previewItem = {
    id: editingItem?.id || 'preview',
    title: form.title || 'Project Title Preview',
    tagline: form.tagline || 'One-line hook or description preview',
    client: form.client || 'Client Name',
    category: form.category,
    mediaType: form.mediaType,
    youtubeId: form.youtubeId,
    imageSrc: form.imageSrc,
    externalUrl: form.externalUrl,
    year: form.year,
    tools: form.tools ? form.tools.split(',').map((t) => t.trim()).filter(Boolean) : ['Premiere Pro'],
    featured: form.featured,
  };

  // 1. Unauthenticated Login Screen
  if (!session) {
    return (
      <div className="min-h-screen bg-bg-alt flex items-center justify-center p-6 text-ink font-body">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-line shadow-card-subtle">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold text-ink">
                Studio Admin Portal
              </h1>
              <p className="text-xs text-ink-soft font-mono mt-0.5">
                Fresh Concept Studio
              </p>
            </div>
            <a href="/" className="text-xs font-mono text-ink-soft hover:text-ink">
              ← Return Home
            </a>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-admin-email@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent font-body"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent font-body"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              disabled={authLoading}
            >
              {authLoading ? 'Signing In...' : 'Sign In with Supabase Auth'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-bg-alt text-ink font-body">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-line sticky top-0 z-30 px-6 py-4">
        <div className="max-w-[1120px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <h1 className="text-base font-display font-bold text-ink">
              Fresh Concept Studio — Work Catalog Admin
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-semibold">
              Live Cloud Connected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-ink-soft hover:text-ink px-3 py-1.5 rounded border border-line hover:bg-bg-alt"
            >
              Public Site ↗
            </a>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              icon={LogOut}
              iconPosition="right"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1120px] mx-auto p-6 md:p-8 space-y-8">
        {/* Form and Real-Time Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add / Edit Form (7 cols) */}
          <section className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-line shadow-card-subtle">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-line">
              <div>
                <h2 className="text-xl font-display font-bold text-ink">
                  {editingItem ? 'Edit Portfolio Piece' : 'Add New Portfolio Piece'}
                </h2>
                <p className="text-xs text-ink-soft font-mono mt-0.5">
                  {editingItem ? `Editing: ${editingItem.title}` : 'Fill in the details to publish a new piece to your site'}
                </p>
              </div>

              {editingItem && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs font-mono text-accent hover:underline font-semibold"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {formMsg.text && (
              <div
                className={`mb-6 p-3 rounded-lg text-xs font-mono flex items-center gap-2 ${
                  formMsg.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                {formMsg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{formMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. THE LAST DAYS"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                    Client / Production Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    placeholder="e.g. Fresh Concept Production"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                  One-Line Tagline / Hook
                </label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="e.g. When did you stop deciding — and when exactly did you hand that over?"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                    Category Track *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                    Media Type *
                  </label>
                  <select
                    value={form.mediaType}
                    onChange={(e) => setForm({ ...form, mediaType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent"
                  >
                    <option value="video">Video (YouTube)</option>
                    <option value="image">Image (Static)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {form.mediaType === 'video' ? (
                <div>
                  <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                    YouTube Video ID
                  </label>
                  <input
                    type="text"
                    value={form.youtubeId}
                    onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
                    placeholder="e.g. ImpZJ44Waqc"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent font-mono"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                      Image URL / Path
                    </label>
                    <input
                      type="text"
                      value={form.imageSrc}
                      onChange={(e) => setForm({ ...form, imageSrc: e.target.value })}
                      placeholder="/assets/work/illustration-001.jpg"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                      External Link URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={form.externalUrl}
                      onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono text-ink-soft uppercase font-semibold mb-1">
                  Tools (Comma-separated)
                </label>
                <input
                  type="text"
                  value={form.tools}
                  onChange={(e) => setForm({ ...form, tools: e.target.value })}
                  placeholder="Premiere Pro, DaVinci Resolve, Blender"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-accent focus:ring-accent border-line"
                  />
                  <span className="text-xs font-mono font-semibold text-ink">
                    Pin as Featured Piece
                  </span>
                </label>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={formLoading}
                >
                  {formLoading
                    ? 'Saving...'
                    : editingItem
                    ? 'Save Changes'
                    : 'Add Piece to Catalog'}
                </Button>

                {editingItem && (
                  <Button onClick={handleCancelEdit} variant="outline" size="md">
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </section>

          {/* Live Card Preview Column (5 cols) */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Eye className="w-4 h-4 text-ink-soft" />
              <span className="font-mono text-xs text-ink-soft font-semibold uppercase tracking-wider">
                Live Card Preview
              </span>
            </div>
            <div className="max-w-md mx-auto">
              <PortfolioCard item={previewItem} />
            </div>
          </aside>
        </div>

        {/* Catalog Table / Grid */}
        <section className="bg-white rounded-2xl p-6 md:p-8 border border-line shadow-card-subtle">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-line">
            <div>
              <h2 className="text-xl font-display font-bold text-ink">
                Current Portfolio Pieces ({items.length})
              </h2>
              <p className="text-xs text-ink-soft font-mono mt-0.5">
                Manage, edit metadata, or delete pieces from your live portfolio
              </p>
            </div>

            <button
              type="button"
              onClick={refetch}
              className="p-1.5 rounded text-ink-soft hover:text-ink hover:bg-bg-alt transition-colors"
              title="Refresh catalog"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-line">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-8 rounded bg-zinc-900 shrink-0 overflow-hidden flex items-center justify-center text-white font-mono text-[10px]">
                    {item.mediaType === 'video' ? 'VIDEO' : 'IMG'}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-display font-bold text-ink truncate">
                        {item.title}
                      </h4>
                      {item.featured && (
                        <span className="px-1.5 py-0.2 rounded bg-accent-soft text-accent text-[10px] font-mono font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-soft font-mono truncate">
                      {item.client} • {item.category} • {item.year}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={() => handleEditClick(item)}
                    variant="outline"
                    size="sm"
                    icon={Edit2}
                    iconPosition="left"
                  >
                    Edit
                  </Button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
