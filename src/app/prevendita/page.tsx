'use client';

import { useState } from 'react';
import { Calendar, Clock, Truck, ShoppingCart, AlertCircle } from 'lucide-react';

// Dati di esempio per la prevendita
const preSaleProducts = [
  {
    id: '1',
    name: 'Prodotto in Arrivo - Edizione Limitata',
    price: 89.99,
    arrivalDate: '2024-09-25',
    preOrderDeadline: '2024-09-20',
    maxQuantity: 50,
    reservedQuantity: 35,
    category: 'Categoria 1',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
    description: 'Prodotto esclusivo in arrivo. Prenota ora per assicurarti la disponibilità!'
  },
  {
    id: '2',
    name: 'Nuovo Prodotto - Anteprima',
    price: 120.00,
    arrivalDate: '2024-10-05',
    preOrderDeadline: '2024-09-30',
    maxQuantity: 100,
    reservedQuantity: 15,
    category: 'Categoria 2',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Anteprima del nuovo prodotto. Prenota con sconto speciale!'
  },
  {
    id: '3',
    name: 'Prodotto Stagionale - Preordine',
    price: 75.50,
    arrivalDate: '2024-09-30',
    preOrderDeadline: '2024-09-25',
    maxQuantity: 30,
    reservedQuantity: 28,
    category: 'Categoria 1',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Prodotto stagionale disponibile per preordine limitato'
  },
  {
    id: '4',
    name: 'Esclusiva - Solo Prevendita',
    price: 200.00,
    arrivalDate: '2024-10-15',
    preOrderDeadline: '2024-10-10',
    maxQuantity: 20,
    reservedQuantity: 5,
    category: 'Categoria 3',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    description: 'Esclusiva disponibile solo in prevendita. Quantità limitata!'
  }
];

export default function PrevenditaPage() {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [sortBy, setSortBy] = useState('arrivalDate');

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

  const getAvailabilityStatus = (reserved: number, max: number) => {
    const percentage = (reserved / max) * 100;
    if (percentage >= 90) return { text: 'Quasi esaurito', color: 'text-red-600 bg-red-100' };
    if (percentage >= 70) return { text: 'Limitato', color: 'text-orange-600 bg-orange-100' };
    return { text: 'Disponibile', color: 'text-green-600 bg-green-100' };
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysUntilArrival = (arrivalDate: string) => {
    const today = new Date();
    const arrival = new Date(arrivalDate);
    const diffTime = arrival.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedProducts = [...preSaleProducts].sort((a, b) => {
    switch (sortBy) {
      case 'arrivalDate':
        return new Date(a.arrivalDate).getTime() - new Date(b.arrivalDate).getTime();
      case 'deadline':
        return new Date(a.preOrderDeadline).getTime() - new Date(b.preOrderDeadline).getTime();
      case 'availability':
        return (b.maxQuantity - b.reservedQuantity) - (a.maxQuantity - a.reservedQuantity);
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
            <Calendar className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Prevendita</h1>
          </div>
          <p className="text-gray-600">
            Prenota i prodotti in arrivo e assicurati la disponibilità. 
            Ordini con consegna programmata e sconti speciali per chi preordina!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Prodotti in Prevendita ({sortedProducts.length})
              </h2>
              <p className="text-gray-600">
                Prenota ora per assicurarti la disponibilità
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {totalItems} articoli nel carrello
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="arrivalDate">Arriva prima</option>
                <option value="deadline">Scade prima</option>
                <option value="availability">Più disponibile</option>
              </select>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Prenota Ordine</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const availabilityStatus = getAvailabilityStatus(product.reservedQuantity, product.maxQuantity);
            const cartQuantity = cart[product.id] || 0;
            const daysUntilDeadline = getDaysUntilDeadline(product.preOrderDeadline);
            const daysUntilArrival = getDaysUntilArrival(product.arrivalDate);
            const availableQuantity = product.maxQuantity - product.reservedQuantity;
            
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-200">
                {/* Product Image */}
                <div className="relative">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">🖼️</span>
                  </div>
                  <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Prevendita
                  </div>
                  {daysUntilDeadline <= 3 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {daysUntilDeadline} giorni
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
                  {/* Price */}
                  <div className="mb-3">
                    <span className="text-lg font-bold text-purple-600">€{product.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Availability */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${availabilityStatus.color}`}>
                      {availabilityStatus.text}
                    </span>
                    <span className="text-xs text-gray-500">
                      {availableQuantity} disponibili
                    </span>
                  </div>
                  
                  {/* Dates */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      Arrivo: {new Date(product.arrivalDate).toLocaleDateString('it-IT')} ({daysUntilArrival} giorni)
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      Prenotazione fino: {new Date(product.preOrderDeadline).toLocaleDateString('it-IT')}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Prenotazioni</span>
                      <span>{product.reservedQuantity}/{product.maxQuantity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(product.reservedQuantity / product.maxQuantity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Add to Cart */}
                  <div className="flex items-center space-x-2">
                    {cartQuantity > 0 && (
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                      >
                        -
                      </button>
                    )}
                    {cartQuantity > 0 && (
                      <span className="text-sm font-medium">{cartQuantity}</span>
                    )}
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={availableQuantity === 0 || daysUntilDeadline <= 0}
                      className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                    >
                      {cartQuantity > 0 ? 'Aggiungi' : 'Prenota'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nessun Prodotto in Prevendita
            </h3>
            <p className="text-gray-600">
              Al momento non ci sono prodotti disponibili per la prevendita. Torna presto!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
