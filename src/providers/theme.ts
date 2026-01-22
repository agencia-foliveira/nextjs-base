import { ActionIcon, Badge, createTheme, Loader } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: 7,
  defaultRadius: 'md',
  focusRing: 'always',
  fontFamily: 'Segoe UI, Roboto, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily: 'Segoe UI, Roboto, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
    sizes: {
      h1: { fontSize: '56px', lineHeight: '1.1', fontWeight: '800' },
      h2: { fontSize: '40px', lineHeight: '1.15', fontWeight: '700' },
      h3: { fontSize: '32px', lineHeight: '1.2', fontWeight: '700' },
      h4: { fontSize: '24px', lineHeight: '1.3', fontWeight: '600' },
      h5: { fontSize: '20px', lineHeight: '1.4', fontWeight: '600' },
      h6: { fontSize: '16px', lineHeight: '1.5', fontWeight: '600' },
    },
  },
  colors: {
    brand: [
      '#E3F2FF',
      '#B3DAFF',
      '#81C2FF',
      '#4FADFF',
      '#1E99FF',
      '#0078E0',
      '#0061B4',
      '#004888',
      '#002D5C',
      '#001433',
    ],
  },
  fontSizes: {
    xs: '10px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '32px',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '32px',
  },
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: 'subtle',
      },
    }),

    Badge: Badge.extend({
      styles: () => ({
        root: {
          minWidth: '80px',
          textAlign: 'left',
        },
      }),
    }),

    DatePicker: {
      defaultProps: {
        locale: 'pt-br',
      },
    },

    DatePickerInput: {
      defaultProps: {
        locale: 'pt-br',
      },
    },

    DateRangePicker: {
      defaultProps: {
        locale: 'pt-br',
      },
    },

    DateRangePickerInput: {
      defaultProps: {
        locale: 'pt-br',
      },
    },

    Loader: Loader.extend({}),
  },
});
