import { useState, useEffect, useCallback } from 'react';
import fallbackWorks from '../data/works.json';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const STORAGE_KEY = 'fresh_concept_portfolio_items';

function getLocalItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse local storage portfolio items', e);
  }
  return fallbackWorks;
}

function saveLocalItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('portfolio_items_updated'));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}

export function usePortfolioItems() {
  const [items, setItems] = useState(getLocalItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setItems(getLocalItems());
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data, error: sbError } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (sbError) throw sbError;

      if (data && data.length > 0) {
        const formatted = data.map((d) => ({
          id: d.id,
          title: d.title,
          tagline: d.tagline || '',
          client: d.client || '',
          category: d.category,
          mediaType: d.media_type,
          youtubeId: d.youtube_id || '',
          imageSrc: d.image_path || '',
          externalUrl: d.external_url || '',
          year: d.year || new Date().getFullYear(),
          tools: d.tools || [],
          featured: Boolean(d.featured),
          sortOrder: d.sort_order ?? 0,
        }));
        setItems(formatted);
        saveLocalItems(formatted);
      } else {
        setItems(getLocalItems());
      }
    } catch (err) {
      console.warn('Supabase fetch failed, using local storage:', err);
      setError(err.message || 'Failed to fetch items');
      setItems(getLocalItems());
    } finally {
      setLoading(false);
    }
  }, []);

  const saveItem = async (itemData) => {
    // 1. Supabase Mode
    if (isSupabaseConfigured && supabase) {
      const payload = {
        title: itemData.title,
        tagline: itemData.tagline,
        client: itemData.client,
        category: itemData.category,
        media_type: itemData.mediaType || itemData.media_type,
        youtube_id: itemData.youtubeId || itemData.youtube_id || null,
        image_path: itemData.imageSrc || itemData.image_path || null,
        external_url: itemData.externalUrl || itemData.external_url || null,
        year: parseInt(itemData.year, 10) || new Date().getFullYear(),
        tools: itemData.tools || [],
        featured: Boolean(itemData.featured),
        sort_order: parseInt(itemData.sortOrder ?? itemData.sort_order, 10) || 0,
      };

      if (itemData.id && !itemData.id.startsWith('local-')) {
        const { error } = await supabase
          .from('portfolio_items')
          .update(payload)
          .eq('id', itemData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('portfolio_items')
          .insert([payload]);
        if (error) throw error;
      }
      await fetchItems();
      return;
    }

    // 2. Local Storage Mode
    const current = getLocalItems();
    const formattedItem = {
      id: itemData.id || `local-${Date.now()}`,
      title: itemData.title,
      tagline: itemData.tagline || '',
      client: itemData.client || '',
      category: itemData.category,
      mediaType: itemData.mediaType || itemData.media_type || 'video',
      youtubeId: itemData.youtubeId || itemData.youtube_id || '',
      imageSrc: itemData.imageSrc || itemData.image_path || '',
      externalUrl: itemData.externalUrl || itemData.external_url || '',
      year: parseInt(itemData.year, 10) || new Date().getFullYear(),
      tools: itemData.tools || [],
      featured: Boolean(itemData.featured),
      sortOrder: parseInt(itemData.sortOrder ?? itemData.sort_order, 10) || 0,
    };

    let updated;
    const existingIndex = current.findIndex((i) => i.id === formattedItem.id);
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = formattedItem;
    } else {
      updated = [formattedItem, ...current];
    }

    saveLocalItems(updated);
    setItems(updated);
  };

  const deleteItem = async (id) => {
    if (isSupabaseConfigured && supabase && !id.startsWith('local-')) {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchItems();
      return;
    }

    const current = getLocalItems();
    const updated = current.filter((item) => item.id !== id);
    saveLocalItems(updated);
    setItems(updated);
  };

  const resetToSeed = () => {
    saveLocalItems(fallbackWorks);
    setItems(fallbackWorks);
  };

  useEffect(() => {
    fetchItems();

    const handleLocalUpdate = () => {
      setItems(getLocalItems());
    };

    window.addEventListener('portfolio_items_updated', handleLocalUpdate);
    window.addEventListener('storage', handleLocalUpdate);

    return () => {
      window.removeEventListener('portfolio_items_updated', handleLocalUpdate);
      window.removeEventListener('storage', handleLocalUpdate);
    };
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    refetch: fetchItems,
    saveItem,
    deleteItem,
    resetToSeed,
    isLive: isSupabaseConfigured,
  };
}
