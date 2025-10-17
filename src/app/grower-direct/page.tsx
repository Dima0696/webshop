'use client';

import { useState } from 'react';
import { Truck, Calendar, MapPin, Phone, Mail } from 'lucide-react';

// Dati di esempio per i produttori
const growers = [
  {
    id: '1',
    name: 'Produttore Verde',
    location: 'Piemonte',
    products: ['Prodotti Freschi', 'Verdure Bio'],
    contact: '+39 011 1234567',
    email: 'info@produttoreverde.it',
    nextDelivery: '2024-09-15',
    minOrder: 50.00
  },
  {
    id: '2',
    name: 'Fattoria Sole',
    location: 'Toscana',
    products: ['Frutta di Stagione', 'Ortaggi'],
    contact: '+39 055 9876543',
    email: 'contatti@fattoriasole.it',
    nextDelivery: '2024-09-12',
    minOrder: 75.00
  },
  {
    id: '3',
    name: 'Bio Garden',
    location: 'Lombardia',
    products: ['Prodotti Biologici', 'Erbe Aromatiche'],
    contact: '+39 02 4567890',
    email: 'ordini@biogarden.it',
    nextDelivery: '2024-09-18',
    minOrder: 60.00
  }
];

export default function GrowerDirectPage() {
  const [selectedGrower, setSelectedGrower] = useState<string | null>(null);
  const [cart, setCart] = useState<{[key: string]: number}>({});

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

  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <Truck className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Grower Direct</h1>
          </div>
          <p className="text-gray-600">
            Acquista direttamente dai nostri produttori e fornitori. 
            Prodotti freschi e di qualità con consegna programmata.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Growers List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">I Nostri Produttori</h3>
              <div className="space-y-4">
                {growers.map((grower) => (
                  <div
                    key={grower.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedGrower === grower.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedGrower(grower.id)}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{grower.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {grower.location}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Prossima consegna: {new Date(grower.nextDelivery).toLocaleDateString('it-IT')}
                    </div>
                    <div className="text-sm text-gray-600">
                      Ordine minimo: €{grower.minOrder.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {selectedGrower ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {growers.find(g => g.id === selectedGrower)?.name}
                      </h2>
                      <p className="text-gray-600">
                        Prodotti disponibili per la prossima consegna
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        {totalItems} articoli nel carrello
                      </span>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <Truck className="h-4 w-4" />
                        <span>Prenota Ordine</span>
                      </button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Informazioni di Contatto</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {growers.find(g => g.id === selectedGrower)?.contact}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {growers.find(g => g.id === selectedGrower)?.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {growers.find(g => g.id === selectedGrower)?.products.map((product, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="aspect-square bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                          <span className="text-gray-500">🌱</span>
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2">{product}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Prodotto fresco dal produttore
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-600">€--</span>
                          <div className="flex items-center space-x-2">
                            {cart[`${selectedGrower}-${index}`] > 0 && (
                              <button
                                onClick={() => removeFromCart(`${selectedGrower}-${index}`)}
                                className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                              >
                                -
                              </button>
                            )}
                            {cart[`${selectedGrower}-${index}`] > 0 && (
                              <span className="text-sm font-medium">
                                {cart[`${selectedGrower}-${index}`]}
                              </span>
                            )}
                            <button
                              onClick={() => addToCart(`${selectedGrower}-${index}`)}
                              className="bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition-colors text-sm"
                            >
                              {cart[`${selectedGrower}-${index}`] > 0 ? 'Aggiungi' : 'Prenota'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Seleziona un Produttore
                  </h3>
                  <p className="text-gray-600">
                    Scegli un produttore dalla lista per vedere i prodotti disponibili
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
