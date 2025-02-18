import { QUINIELA_DATA_URL } from '@/core/config';
import { QuinielaData, QuinielaResponse } from '@/utils/types/quiniela.types';
import axios from 'axios';

export const getQuinielaData = async (): Promise<QuinielaResponse | []> => {
  try {
    const maxDays = 7;
    let quinielaResponse = null;
    let foundDate = '';

    // Iterar desde hoy hasta maxDays en el futuro
    for (let i = 0; i < maxDays; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, ''); // formato YYYYMMDD
      const url = `${QUINIELA_DATA_URL}${formattedDate}`;

      const response = await axios.get<QuinielaData[] | string>(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      const data = response.data;

      // Suponiendo que cuando no hay quiniela la respuesta incluye un mensaje de error
      if (
        data ===
        'No se ha encontrado ningún registro para los parámetros introducidos.'
      ) {
        // No hay quiniela para esta fecha, seguimos al siguiente día
        continue;
      } else {
        quinielaResponse = data as QuinielaData[];
        foundDate = formattedDate;
        break;
      }
    }

    if (!quinielaResponse) {
      return [];
    }

    return {
      data: quinielaResponse[0],
      date: foundDate,
    };
  } catch (error) {
    console.log('error =>', error);
    return [];
  }
};
