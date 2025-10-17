import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Legge il file XML dal filesystem
    const filePath = join(process.cwd(), 'exptab.xml');
    const xmlContent = readFileSync(filePath, 'utf-8');
    
    return new NextResponse(xmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Errore lettura file inventario:', error);
    return NextResponse.json(
      { error: 'File inventario non trovato' },
      { status: 404 }
    );
  }
}

