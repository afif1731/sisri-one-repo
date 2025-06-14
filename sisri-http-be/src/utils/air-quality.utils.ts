import { type Quality } from '@prisma/client';

export const getAqiQuality = (aqi: number | null): Quality => {
  let quality: Quality;
  if (aqi >= 1 && aqi <= 50) quality = 'GOOD';
  else if (aqi >= 51 && aqi <= 100) quality = 'MILD';
  else if (aqi >= 101 && aqi <= 200) quality = 'UNHEALTHY';
  else if (aqi >= 201 && aqi <= 300) quality = 'VERY_UNHEALTHY';
  else quality = 'DANGEROUS';

  return quality;
};
