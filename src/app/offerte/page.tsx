'use client';

import { useState } from 'react';
import { Tag, Clock, ShoppingCart, Star } from 'lucide-react';

// Dati di esempio per le offerte
const offers = [
  {
    id: '1',
    name: 'Offerta Speciale - Prodotto A',
    originalPrice: 89.99,
    offerPrice: 59.99,
    discount: 33,
    endDate: '2024-09-10',
    stock: 15,
    category: 'Categoria 1',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
    description: 'Offerta limitata per questo prodotto di qualità'
  },
  {
    id: '2',
    name: 'Sconto 50% - Prodotto B',
    originalPrice: 120.00,
    offerPrice: 60.00,
    discount: 50,
    endDate: '2024-09-15',
    stock: 8,
    category: 'Categoria 2',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Sconto eccezionale su questo prodotto'
  },
  {
    id: '3',
    name: 'Promozione - Prodotto C',
    originalPrice: 75.50,
    offerPrice: 45.30,
    discount: 40,
    endDate: '2024-09-08',
    stock: 22,
    category: 'Categoria 1',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Promozione speciale per questo articolo'
  },
  {
    id: '4',
    name: 'Mega Sconto - Prodotto D',
    originalPrice: 200.00,
    offerPrice: 120.00,
    discount: 40,
    endDate: '2024-09-20',
    stock: 5,
    category: 'Categoria 3',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    description: 'Mega sconto su questo prodotto premium'
  }
];

export default function OffertePage() {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [sortBy, setSortBy] = useState('discount');

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Esaurito', color: 'text-red-600 bg-red-100' };
    if (stock <= 5) return { text: 'Ultimi pezzi', color: 'text-orange-600 bg-orange-100' };
    return { text: 'Disponibile', color: 'text-green-600 bg-green-100' };
  };

  const getDaysLeft = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedOffers = [...offers].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return b.discount - a.discount;
      case 'price':
        return a.offerPrice - b.offerPrice;
      case 'endDate':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      default:
        return 0;
    }
  });

  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <Tag className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Offerte Speciali</h1>
          </div>
          <p className="text-gray-600">
            Scopri le nostre offerte speciali e promozioni limitate. 
            Affrettati, le offerte sono valide solo per un tempo limitato!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Offerte Disponibili ({sortedOffers.length})
              </h2>
              <p className="text-gray-600">
                Ordina e filtra le offerte disponibili
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {totalItems} articoli nel carrello
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              >
                <option value="discount">Maggior Sconto</option>
                <option value="price">Prezzo più basso</option>
                <option value="endDate">Scade prima</option>
              </select>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Invia Ordine</span>
              </button>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedOffers.map((offer) => {
            const stockStatus = getStockStatus(offer.stock);
            const cartQuantity = cart[offer.id] || 0;
            const daysLeft = getDaysLeft(offer.endDate);
            
            return (
              <div key={offer.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-red-200">
                {/* Discount Badge */}
                <div className="relative">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">🖼️</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{offer.discount}%
                  </div>
                  {daysLeft <= 3 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {daysLeft} giorni
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{offer.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{offer.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-red-600">€{offer.offerPrice.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 line-through">€{offer.originalPrice.toFixed(2)}</span>
                  </div>
                  
                  {/* Stock Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                    <span className="text-xs text-gray-500">
                      {offer.stock} disponibili
                    </span>
                  </div>
                  
                  {/* Add to Cart */}
                  <div className="flex items-center space-x-2">
                    {cartQuantity > 0 && (
                      <button
                        onClick={() => removeFromCart(offer.id)}
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        -
                      </button>
                    )}
                    {cartQuantity > 0 && (
                      <span className="text-sm font-medium">{cartQuantity}</span>
                    )}
                    <button
                      onClick={() => addToCart(offer.id)}
                      disabled={offer.stock === 0}
                      className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                    >
                      {cartQuantity > 0 ? 'Aggiungi' : 'Aggiungi al Carrello'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedOffers.length === 0 && (
          <div className="text-center py-12">
            <Tag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nessuna Offerta Disponibile
            </h3>
            <p className="text-gray-600">
              Al momento non ci sono offerte attive. Torna presto per nuove promozioni!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
