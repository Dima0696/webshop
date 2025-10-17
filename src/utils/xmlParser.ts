interface InventoryItem {
  id: string;
  nome: string;
  categoria: string;
  colore: string;
  altezza: string;
  diametro: string;
  qualita: string;
  giacenza: number;
  imballaggio: number;
  prezzo: number;
  descrizione?: string;
  unitaMisura: string;
  giorni?: number;
  provenienza?: string;
  produttore?: string;
  confezione?: string;
}

export function parseXMLInventory(xmlContent: string): InventoryItem[] {
  const items: InventoryItem[] = [];
  const rows = xmlContent.split('<Row >').slice(2);
  
  let id = 1;
  
  for (const row of rows) {
    if (!row.includes('<Cell') || row.includes('</Table>')) continue;
    
    const cells = extractCellsFromRow(row);
    
    if (cells.length >= 18) {
      const magazzino = cells[0] || '';
      const genere = cells[1] || '';
      const classificazione = cells[3] || '';
      const articolo = cells[4] || '';
      const altezzaCol = cells[5] || '';
      const coloreReale = cells[6] || '';
      const qualitaReale = cells[7] || '';
      const confezione = cells[8] || '';
      const provenienza = cells[9] || '';
      const produttore = cells[10] || '';
      const classeIngresso = cells[11] || '';
      const unitaMisura = cells[12] || '';
      const giorni = parseFloat(cells[13]) || undefined;
      const giacenza = parseFloat(cells[15]) || 0;
      const quantitaMinima = parseFloat(cells[16]) || 1;
      const prezzo = parseFloat(cells[17]) || 0;
      
      if (!articolo || giacenza <= 0) continue;
      
      // Estrai altezza, diametro e qualità (basata sui giorni di giacenza)
      const { altezza, diametro, qualita } = extractMeasurements(qualitaReale, giorni);
      
      const item: InventoryItem = {
        id: id.toString(),
        nome: articolo.trim(),
        categoria: normalizeCategory(genere.trim(), classificazione.trim()),
        colore: normalizeColor(coloreReale.trim()),
        altezza: altezza,
        diametro: diametro,
        qualita: qualita,
        giacenza: Math.floor(giacenza),
        imballaggio: Math.floor(quantitaMinima),
        prezzo: Math.round(prezzo * 100) / 100,
        unitaMisura: unitaMisura.trim(),
        giorni,
        provenienza: provenienza.trim(),
        produttore: produttore.trim(),
        confezione: confezione.trim(),
        descrizione: generateDescription(articolo, genere, giorni, unitaMisura, provenienza, produttore)
      };
      
      items.push(item);
      id++;
    }
  }
  
  return items;
}

function extractMeasurements(qualitaReale: string, giorni: number | undefined): { altezza: string, diametro: string, qualita: string } {
  const qual = qualitaReale.trim();
  
  let altezza = '';
  let diametro = '';
  let qualita = '';
  
  // ALTEZZE (30 CM, 45 CM, 50 CM, etc.)
  if (qual.includes('CM')) {
    altezza = qual;
  }
  // DIAMETRI (D09, D14, D17, D21, D35, etc.)
  else if (qual.match(/^D\d+$/)) {
    diametro = qual;
  }
  
  // QUALITÀ BASATA SUI GIORNI DI GIACENZA (FRESCHEZZA)
  if (giorni) {
    if (giorni <= 3) qualita = 'Freschissimo';      // 1-3 giorni
    else if (giorni <= 6) qualita = 'Fresco';       // 4-6 giorni  
    else if (giorni <= 10) qualita = 'Buono';       // 7-10 giorni
    else qualita = 'Sconto';                        // 11+ giorni
  } else {
    qualita = 'Standard'; // Se non abbiamo giorni
  }
  
  return { altezza, diametro, qualita };
}



function extractCellsFromRow(row: string): string[] {
  const cells: string[] = [];
  const cellMatches = row.match(/<Cell[^>]*>.*?<\/Cell>/g) || [];
  
  for (const cellMatch of cellMatches) {
    const dataMatch = cellMatch.match(/<Data ss:Type="[^"]*">([^<]*)<\/Data>/);
    const value = dataMatch ? dataMatch[1] : '';
    cells.push(value);
  }
  
  return cells;
}

function normalizeColor(coloreReale: string): string {
  if (!coloreReale) return 'Naturale';
  
  const color = coloreReale.toLowerCase();
  
  if (color.includes('bordeaux')) return 'Bordeaux';
  if (color.includes('giallo verde')) return 'Giallo Verde';
  if (color.includes('viola')) return 'Viola';
  if (color.includes('bianco')) return 'Bianco';
  if (color.includes('verde')) return 'Verde';
  if (color.includes('rosa chiaro')) return 'Rosa Chiaro';
  if (color.includes('rosa')) return 'Rosa';
  if (color.includes('giallo')) return 'Giallo';
  if (color.includes('rosso')) return 'Rosso';
  if (color.includes('blu')) return 'Blu';
  if (color.includes('arancio')) return 'Arancione';
  
  return coloreReale || 'Naturale';
}

function normalizeCategory(genere: string, classificazione: string): string {
  const lowerGenere = genere.toLowerCase();
  
  // PIANTE (in vaso, da interno/esterno)
  if (lowerGenere.includes('piante verdi') || lowerGenere.includes('671')) return 'Piante Verdi';
  if (lowerGenere.includes('orchidee') || lowerGenere.includes('110')) return 'Orchidee';
  if (lowerGenere.includes('kalancole') || lowerGenere.includes('500')) return 'Kalanchoe';
  if (lowerGenere.includes('anthurium') || lowerGenere.includes('515')) return 'Anthurium';
  if (lowerGenere.includes('bromeliacee') || lowerGenere.includes('528')) return 'Bromeliacee';
  if (lowerGenere.includes('piante fiorite') || lowerGenere.includes('5555')) return 'Piante Fiorite';
  if (lowerGenere.includes('phalaenopsis') || lowerGenere.includes('602')) return 'Phalaenopsis';
  if (lowerGenere.includes('succulente') || lowerGenere.includes('618')) return 'Succulente';
  if (lowerGenere.includes('verdi') || lowerGenere.includes('100')) return 'Piante Verdi';
  
  // FIORI RECISI (per mazzi, composizioni)
  if (lowerGenere.includes('fiori diversi') || lowerGenere.includes('160')) return 'Fiori Misti';
  if (lowerGenere.includes('alstroemeria') || lowerGenere.includes('170')) return 'Alstroemeria';
  if (lowerGenere.includes('rose') || lowerGenere.includes('10')) return 'Rose';
  if (lowerGenere.includes('gerbere') || lowerGenere.includes('30')) return 'Gerbere';
  if (lowerGenere.includes('crisantemina') || lowerGenere.includes('50')) return 'Crisantemina';
  if (lowerGenere.includes('crisantemi') || lowerGenere.includes('60')) return 'Crisantemi';
  if (lowerGenere.includes('santini') || lowerGenere.includes('70')) return 'Crisantemi Santini';
  if (lowerGenere.includes('gipsophila') || lowerGenere.includes('120')) return 'Gipsophila';
  if (lowerGenere.includes('aster') || lowerGenere.includes('130')) return 'Aster';
  if (lowerGenere.includes('statice') || lowerGenere.includes('140')) return 'Statice';
  if (lowerGenere.includes('fresia') || lowerGenere.includes('180')) return 'Fresia';
  if (lowerGenere.includes('lilium asiatici') || lowerGenere.includes('190')) return 'Lilium Asiatici';
  if (lowerGenere.includes('lilium orientali') || lowerGenere.includes('200')) return 'Lilium Orientali';
  if (lowerGenere.includes('gladioli') || lowerGenere.includes('250')) return 'Gladioli';
  if (lowerGenere.includes('garofani') || lowerGenere.includes('260')) return 'Garofani';
  if (lowerGenere.includes('girasoli') || lowerGenere.includes('320')) return 'Girasoli';
  if (lowerGenere.includes('lisianthus') || lowerGenere.includes('0320')) return 'Lisianthus';
  if (lowerGenere.includes('nutans') || lowerGenere.includes('340')) return 'Nutans';
  if (lowerGenere.includes('hydrangea') || lowerGenere.includes('581')) return 'Hydrangea';
  if (lowerGenere.includes('hypericum') || lowerGenere.includes('582')) return 'Hypericum';
  if (lowerGenere.includes('zantedeschia') || lowerGenere.includes('625')) return 'Zantedeschia';
  
  return genere || 'Varie';
}

// Funzione helper per identificare se un prodotto è una pianta
export function isPlant(categoria: string): boolean {
  const plantCategories = [
    'Piante Verdi', 'Orchidee', 'Kalanchoe', 'Anthurium', 
    'Bromeliacee', 'Piante Fiorite', 'Phalaenopsis', 'Succulente'
  ];
  return plantCategories.includes(categoria);
}

function generateDescription(nome: string, genere: string, giorni?: number, unitaMisura?: string, provenienza?: string, produttore?: string): string {
  let description = '';
  
  if (provenienza) {
    description += `Origine: ${provenienza}. `;
  }
  
  if (produttore) {
    description += `Produttore: ${produttore}. `;
  }
  
  if (giorni) {
    description += `Durata: ${giorni} giorni. `;
  }
  
  if (unitaMisura) {
    const unitaDescrizione = {
      'PZ': 'Venduto per singolo pezzo',
      'ST': 'Venduto a steli/mazzi',
      'CF': 'Venduto in confezione',
      'KG': 'Venduto al chilogrammo'
    }[unitaMisura];
    
    if (unitaDescrizione) {
      description += unitaDescrizione + '. ';
    }
  }
  
  return description.trim() || undefined;
}

export { type InventoryItem };
