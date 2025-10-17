'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Leaf, Plus, Minus, RefreshCw, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import NavigationHeader from '@/components/NavigationHeader';
import { InventoryItem, isPlant } from '@/utils/xmlParser';
import { loadInventoryFromFile } from '@/utils/loadInventory';

const ITEMS_PER_PAGE = 20;

export default function PiantePage() {
  const { isAuthenticated, user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Paginazione
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredInventory.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  // Filtri
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedDiameter, setSelectedDiameter] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');
  const [selectedProvenience, setSelectedProvenience] = useState('');
  const [selectedProducer, setSelectedProducer] = useState('');

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadInventoryFromFile();
      // Filtra solo le piante
      const plantsOnly = data.filter(item => isPlant(item.categoria));
      setInventory(plantsOnly);
    } catch (err) {
      setError('Errore nel caricamento dell\'inventario piante');
      console.error('Error loading inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtri unici (solo per piante)
  const categories = [...new Set(inventory.map(item => item.categoria))];
  const colors = [...new Set(inventory.map(item => item.colore))];
  const diameters = [...new Set(inventory.map(item => item.diametro).filter(d => d))];
  const qualities = [...new Set(inventory.map(item => item.qualita))];
  const proveniences = [...new Set(inventory.map(item => item.provenienza).filter(p => p))];
  const producers = [...new Set(inventory.map(item => item.produttore).filter(p => p))];

  // Applica filtri
  useEffect(() => {
    let filtered = inventory;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descrizione?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(item => item.categoria === selectedCategory);
    }

    if (selectedColor) {
      filtered = filtered.filter(item => item.colore === selectedColor);
    }

    if (selectedDiameter) {
      filtered = filtered.filter(item => item.diametro === selectedDiameter);
    }

    if (selectedQuality) {
      filtered = filtered.filter(item => item.qualita === selectedQuality);
    }

    if (selectedProvenience) {
      filtered = filtered.filter(item => item.provenienza === selectedProvenience);
    }

    if (selectedProducer) {
      filtered = filtered.filter(item => item.produttore === selectedProducer);
    }

    setFilteredInventory(filtered);
    setCurrentPage(1);
  }, [inventory, searchTerm, selectedCategory, selectedColor, selectedDiameter, selectedQuality, selectedProvenience, selectedProducer]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedDiameter('');
    setSelectedQuality('');
    setSelectedProvenience('');
    setSelectedProducer('');
  };

  const addToCart = (itemId: string, minQuantity: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + minQuantity
    }));
  };

  const removeFromCart = (itemId: string, minQuantity: number) => {
    setCart(prev => {
      const newQuantity = (prev[itemId] || 0) - minQuantity;
      if (newQuantity <= 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const getTotalCartValue = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = inventory.find(i => i.id === itemId);
      return total + (item ? item.prezzo * quantity : 0);
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  // Funzione per generare immagine placeholder basata sul nome
  const getPlantImageUrl = (name: string) => {
    const seed = name.toLowerCase().replace(/\s+/g, '-');
    return `https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=200&fit=crop&seed=${seed}`;
  };



  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 25%, #f0f8f0 50%, #f8faf9 75%, #fbfcfb 100%)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          padding: '32px', 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
        }}>
          <Leaf style={{ width: '64px', height: '64px', color: '#2d5a27', margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a1a', marginBottom: '16px' }}>
            Accesso Richiesto
          </h1>
          <p style={{ color: '#2d5a27', marginBottom: '24px' }}>
            È necessario effettuare l&apos;accesso per visualizzare le piante
          </p>
          <Link 
            href="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              padding: '12px 24px', 
              backgroundColor: '#2d5a27', 
              color: 'white', 
              borderRadius: '8px', 
              textDecoration: 'none',
              transition: 'background-color 0.3s'
            }}
          >
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      {/* Header */}
      <NavigationHeader 
        onRefresh={loadInventory}
        loading={loading}
        cartItems={getTotalCartItems()}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 2rem 24px' }}>
        
        <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
          
          {/* Left Sidebar - Filters */}
          <div style={{ width: '280px', flexShrink: 0 }}>
            <div style={{ 
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              {/* Header Piante */}
              <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Leaf style={{ width: '20px', height: '20px', color: '#2d5a27' }} />
                  <span style={{ fontSize: '1rem', fontWeight: '600', color: '#2d5a27' }}>Piante & Vasi</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {inventory.length} piante disponibili
                </div>
              </div>

              {/* Categoria Piante */}
              <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    color: '#374151',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Tutte le piante</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cerca piante..."
                    style={{
                      width: '100%',
                      paddingLeft: '36px',
                      paddingRight: '12px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      color: '#374151'
                    }}
                  />
                </div>
              </div>

              {/* Filter Section */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                  FILTRI
                </h3>

                {/* Diametro Vaso (solo per piante) */}
                {diameters.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Diametro Vaso</span>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>▼</span>
                    </div>
                    <div style={{ paddingLeft: '8px' }}>
                      {diameters.sort((a, b) => {
                        const aNum = parseInt(a.replace('D', ''));
                        const bNum = parseInt(b.replace('D', ''));
                        return aNum - bNum;
                      }).map(diameter => (
                        <label key={diameter} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedDiameter === diameter}
                            onChange={(e) => setSelectedDiameter(e.target.checked ? diameter : '')}
                            style={{ width: '14px', height: '14px' }} 
                          />
                          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{diameter}</span>
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginLeft: 'auto' }}>
                            {inventory.filter(item => item.diametro === diameter).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Qualità (Freschezza) */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Freschezza</span>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>▼</span>
                  </div>
                  <div style={{ paddingLeft: '8px' }}>
                    {qualities.map(quality => {
                      const emoji = quality === 'Freschissimo' ? '🟢' : 
                                   quality === 'Fresco' ? '🟡' : 
                                   quality === 'Buono' ? '🟠' : '🔴';
                      return (
                        <label key={quality} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedQuality === quality}
                            onChange={(e) => setSelectedQuality(e.target.checked ? quality : '')}
                            style={{ width: '14px', height: '14px' }} 
                          />
                          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{emoji} {quality}</span>
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginLeft: 'auto' }}>
                            {inventory.filter(item => item.qualita === quality).length}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Colore */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Colore</span>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>▼</span>
                  </div>
                  <div style={{ paddingLeft: '8px' }}>
                    {colors.map(color => (
                      <label key={color} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <input 
                          type="checkbox" 
                          checked={selectedColor === color}
                          onChange={(e) => setSelectedColor(e.target.checked ? color : '')}
                          style={{ width: '14px', height: '14px' }} 
                        />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{color}</span>
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginLeft: 'auto' }}>
                          {inventory.filter(item => item.colore === color).length}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Provenienza */}
                {proveniences.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Provenienza</span>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>▼</span>
                    </div>
                    <div style={{ paddingLeft: '8px' }}>
                      {proveniences.sort().map(provenience => (
                        <label key={provenience} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedProvenience === provenience}
                            onChange={(e) => setSelectedProvenience(e.target.checked ? provenience : '')}
                            style={{ width: '14px', height: '14px' }} 
                          />
                          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{provenience}</span>
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginLeft: 'auto' }}>
                            {inventory.filter(item => item.provenienza === provenience).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Produttore */}
                {producers.length > 0 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Produttore</span>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>▼</span>
                    </div>
                    <div style={{ paddingLeft: '8px' }}>
                      {producers.sort().map(producer => (
                        <label key={producer} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedProducer === producer}
                            onChange={(e) => setSelectedProducer(e.target.checked ? producer : '')}
                            style={{ width: '14px', height: '14px' }} 
                          />
                          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{producer}</span>
                          <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginLeft: 'auto' }}>
                            {inventory.filter(item => item.produttore === producer).length}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Content - Plants */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <RefreshCw style={{ width: '64px', height: '64px', color: '#2d5a27', margin: '0 auto 16px' }} className="animate-spin" />
                <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#1e3a1a', marginBottom: '8px' }}>
                  Caricamento piante...
                </h3>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                <Leaf style={{ width: '64px', height: '64px', color: '#ef4444', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#ef4444', marginBottom: '8px' }}>
                  {error}
                </h3>
                <button
                  onClick={loadInventory}
                  style={{
                    marginTop: '16px',
                    padding: '12px 24px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Riprova
                </button>
              </div>
            ) : (
              <>
                {/* Plants Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
                  gap: '16px',
                  marginBottom: '40px'
                }}>
                  {paginatedItems.map(item => {
                    const cartQuantity = cart[item.id] || 0;
                    const qualityEmoji = item.qualita === 'Freschissimo' ? '🟢' : 
                                        item.qualita === 'Fresco' ? '🟡' : 
                                        item.qualita === 'Buono' ? '🟠' : '🔴';
                    
                    return (
                      <div 
                        key={item.id} 
                        style={{ 
                          background: 'white',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          overflow: 'hidden',
                          transition: 'all 0.2s ease',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {/* Plant Image */}
                        <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                          <img 
                            src={getPlantImageUrl(item.nome)}
                            alt={item.nome}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover'
                            }}
                          />
                          {/* Freshness Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '12px',
                            padding: '4px 8px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>
                            {qualityEmoji} {item.qualita}
                          </div>
                        </div>

                        {/* Plant Info */}
                        <div style={{ padding: '16px' }}>
                          {/* Plant Name */}
                          <h3 style={{ 
                            fontSize: '1rem', 
                            fontWeight: '600', 
                            color: '#374151', 
                            marginBottom: '4px',
                            lineHeight: '1.3'
                          }}>
                            {item.nome}
                          </h3>

                          {/* Category and Origin */}
                          <p style={{ 
                            fontSize: '0.875rem', 
                            color: '#6b7280', 
                            marginBottom: '4px'
                          }}>
                            {item.categoria}
                          </p>
                          {item.provenienza && (
                            <p style={{ 
                              fontSize: '0.75rem', 
                              color: '#9ca3af', 
                              marginBottom: '8px'
                            }}>
                              📍 {item.provenienza} {item.produttore && `• ${item.produttore}`}
                            </p>
                          )}

                          {/* Package Info */}
                          <div style={{ 
                            fontSize: '1.125rem', 
                            fontWeight: '700', 
                            color: '#374151',
                            marginBottom: '8px'
                          }}>
                            {item.giacenza} x {item.imballaggio}
                          </div>

                          {/* Details */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {item.diametro && <div>🪴 {item.diametro}</div>}
                              {item.colore && <div>🎨 {item.colore}</div>}
                              <div>📅 {item.giorni || 'N/A'} giorni</div>
                            </div>
                            
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                min. x{item.imballaggio}
                              </div>
                            </div>
                          </div>

                          {/* Price and Add to Cart */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#374151' }}>
                              €{item.prezzo.toFixed(2)}
                            </div>
                            
                            {cartQuantity > 0 ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                  onClick={() => removeFromCart(item.id, item.imballaggio)}
                                  style={{
                                    width: '28px',
                                    height: '28px',
                                    backgroundColor: '#f3f4f6',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    color: '#374151',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Minus style={{ width: '14px', height: '14px' }} />
                                </button>
                                <span style={{
                                  minWidth: '32px',
                                  textAlign: 'center',
                                  fontWeight: '600',
                                  color: '#374151',
                                  fontSize: '0.875rem'
                                }}>
                                  {cartQuantity}
                                </span>
                                <button
                                  onClick={() => addToCart(item.id, item.imballaggio)}
                                  style={{
                                    width: '28px',
                                    height: '28px',
                                    backgroundColor: '#2d5a27',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Plus style={{ width: '14px', height: '14px' }} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(item.id, item.imballaggio)}
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#2d5a27',
                                  border: 'none',
                                  borderRadius: '6px',
                                  color: 'white',
                                  cursor: 'pointer',
                                  fontSize: '0.875rem',
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Plus style={{ width: '14px', height: '14px' }} />
                                Aggiungi
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginTop: '40px'
                  }}>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '8px 12px',
                        background: currentPage === 1 ? '#f3f4f6' : '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.875rem'
                      }}
                    >
                      <ChevronLeft style={{ width: '16px', height: '16px' }} />
                      Precedente
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          style={{
                            width: '36px',
                            height: '36px',
                            background: currentPage === pageNum ? '#2d5a27' : '#ffffff',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            color: currentPage === pageNum ? 'white' : '#374151',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '8px 12px',
                        background: currentPage === totalPages ? '#f3f4f6' : '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.875rem'
                      }}
                    >
                      Successiva
                      <ChevronRight style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Carrello fisso in basso */}
        {getTotalCartItems() > 0 && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid #e5e7eb',
            zIndex: 50,
            boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>
                    {getTotalCartItems()} piante - €{getTotalCartValue().toFixed(2)}
                  </span>
                </div>
                <button 
                  style={{
                    padding: '12px 24px',
                    background: '#2d5a27',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}
                >
                  Procedi con l&apos;ordine
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
