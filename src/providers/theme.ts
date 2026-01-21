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
    },
  },
  colors: {},
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
