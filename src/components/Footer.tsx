import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-[#2d5a27] mb-4">DimitriFlor</h3>
            <p className="text-gray-600 mb-4">
              Fornitore affidabile di fiori recisi, piante e decor. 
              Servizio professionale, rapido e orientato al cliente.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#2d5a27] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#2d5a27] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#2d5a27] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#2d5a27]">Le Nostre Sezioni</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/magazzino" className="text-gray-600 hover:text-[#2d5a27] transition-colors">
                  Magazzino
                </Link>
              </li>
              <li>
                <Link href="/grower-direct" className="text-gray-600 hover:text-[#2d5a27] transition-colors">
                  Grower Direct
                </Link>
              </li>
              <li>
                <Link href="/offerte" className="text-gray-600 hover:text-[#2d5a27] transition-colors">
                  Offerte
                </Link>
              </li>
              <li>
                <Link href="/prevendita" className="text-gray-600 hover:text-[#2d5a27] transition-colors">
                  Prevendita
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#2d5a27]">Contatti</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-[#2d5a27]" />
                Via de Nicola, 20, 20090 Cesano Boscone (MI)
              </li>
              <li className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-[#2d5a27]" />
                +39 02 4504523
              </li>
              <li className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-[#2d5a27]" />
                info@dimitriflor.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 DimitriFlor. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
