import ProductCard from './ProductCard';

// Dati di esempio per i prodotti
const featuredProducts = [
  {
    id: '1',
    name: 'Prodotto Premium Qualità',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 156,
    category: 'Categoria A'
  },
  {
    id: '2',
    name: 'Prodotto Esclusivo',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 203,
    category: 'Categoria B'
  },
  {
    id: '3',
    name: 'Prodotto Innovativo',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 89,
    category: 'Categoria C'
  },
  {
    id: '4',
    name: 'Prodotto Best Seller',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 342,
    category: 'Categoria A'
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prodotti in Evidenza
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scopri la nostra selezione di prodotti più popolari, 
            scelti con cura per offrirti la migliore esperienza di acquisto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/prodotti"
            className="inline-flex items-center px-8 py-3 border border-amber-600 text-amber-600 font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-colors"
          >
            Vedi Tutti i Prodotti
          </a>
        </div>
      </div>
    </section>
  );
}
