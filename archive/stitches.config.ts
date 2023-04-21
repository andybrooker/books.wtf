import { createStitches } from '@stitches/react';
import { gray, sand } from '@radix-ui/colors';

export const { styled, getCssText } = createStitches({
    media: {
        mobile: '(max-width: 640px)',
    },
  theme: {
    fonts: {
      system: 'system-ui',
      sans: 'Manrope'
    },
    colors: {
      ...gray,
      ...sand,
      loContrast: 'white',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
    },
    shadows: {
        'shadowColor': '60deg 1% 60%',
        'low': '0.3px 0.5px 0.7px hsl($shadowColor / 0.34), 0.4px 0.8px 1px -1.2px hsl($shadowColor / 0.34), 1px 2px 2.5px -2.5px hsl($shadowColor / 0.34)',
        'medium': '0.3px 0.5px 0.7px hsl($shadowColor / 0.36), 0.8px 1.6px 2px -0.8px hsl($shadowColor / 0.36), 2.1px 4.1px 5.2px -1.7px hsl($shadowColor / 0.36), 5px 10px 12.6px -2.5px hsl($shadowColor / 0.36)'
    }
  },
});

