import { InventoryItem, parseXMLInventory } from './xmlParser';

// Per ora uso i dati parsati dal file XML
// In futuro questo sarà sostituito da una chiamata API
export async function loadInventoryFromFile(): Promise<InventoryItem[]> {
  try {
    // Legge il contenuto del file XML
    const response = await fetch('/api/inventory/load');
    if (!response.ok) {
      throw new Error('Errore nel caricamento inventario');
    }
    
    const xmlContent = await response.text();
    return parseXMLInventory(xmlContent);
  } catch (error) {
    console.error('Errore caricamento inventario:', error);
    
    // Fallback ai dati mock se il file non è disponibile
    return getMockInventory();
  }
}

// Dati mock di backup
function getMockInventory(): InventoryItem[] {
  return [
    {
      id: '1',
      nome: 'AGLAONEMA MIX',
      categoria: 'PIANTE VERDI',
      colore: 'Verde',
      misura: 'Medio',
      qualita: 'A1',
      giacenza: 22,
      imballaggio: 1,
      prezzo: 10.20,
      unitaMisura: 'PZ',
      giorni: 5
    },
    {
      id: '2',
      nome: 'ALCHEMILLA',
      categoria: 'Fiori diversi',
      colore: 'Verde',
      misura: 'Mazzo',
      qualita: 'A1',
      giacenza: 100,
      imballaggio: 50,
      prezzo: 0.55,
      unitaMisura: 'ST',
      giorni: 6
    },
    {
      id: '3',
      nome: 'ALLIUM SPHAEROCEPHALON',
      categoria: 'Fiori diversi',
      colore: 'Viola',
      misura: 'Mazzo',
      qualita: 'A1',
      giacenza: 90,
      imballaggio: 10,
      prezzo: 0.60,
      unitaMisura: 'ST',
      giorni: 6
    },
    {
      id: '4',
      nome: 'ALSTROEMERIA WHITE SWAN',
      categoria: 'Alstroemeria',
      colore: 'Bianco',
      misura: 'Mazzo',
      qualita: 'A1',
      giacenza: 40,
      imballaggio: 10,
      prezzo: 0.80,
      unitaMisura: 'ST'
    }
  ];
}

