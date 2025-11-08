import { ActionIcon, Badge, createTheme, Loader } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: 7,
  defaultRadius: 'md',
  focusRing: 'always',
  fontFamily: 'Roboto, sans-serif',
  headings: { fontFamily: 'Roboto, sans-serif' },
  colors: {
    brand: [
      '#fdf7e6',
      '#f5edd6',
      '#e8d9b1',
      '#dbc588',
      '#d0b366',
      '#c9a84f',
      '#c7a446',
      '#C7A446',
      '#9b7d2a',
      '#876c1d',
    ],
  },
  fontSizes: {
    xl: '24px',
    lg: '20px',
    md: '16px',
    sm: '14px',
    xs: '12px',
  },
  spacing: {
    xl: '24px',
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
