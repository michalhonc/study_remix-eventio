import { createStitches } from '@stitches/react'

import { pxToRem } from '~/ui/utils/conversion'
import { media } from '~/ui/utils/media'

const { css, styled, getCssText, globalCss, theme, createTheme } = createStitches({
  theme: {
    fonts: {
      system: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      Xenosphere:
        'Xenosphere, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      Archivo:
        'Archivo, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',

      title: '$Xenosphere',
      body: '$Archivo',
    },
    colors: {
      black: 'hsla(0, 0%, 0%, 1)',
      white: 'hsla(0, 0%, 100%, 1)',

      white075: 'hsla(0, 0%, 100%, 0.75)',
      white050: 'hsla(0, 0%, 100%, 0.5)',

      primary: 'hsla(180, 100%, 50%, 1)',
      primary050: 'hsla(180, 100%, 50%, 0.1)',
      primary100: 'hsla(187, 100%, 50%, 1)',
      primary200: 'hsla(194, 100%, 49%, 0.5)',
      primary500: 'hsla(191, 100%, 41%, 1)',
      primary700: 'hsla(191, 100%, 50%, 1)',

      secondary500: 'hsla(358, 50%, 42%, 1)',
      secondary700: 'hsla(358, 54%, 33%, 1)',
      secondary900: 'hsla(214, 100%, 8%, 1)',

      text: '$white',
      label: '$white',

      background: '$secondary900',
    },
    space: {
      0: pxToRem(2),
      1: pxToRem(4),
      2: pxToRem(8),
      3: pxToRem(12),
      4: pxToRem(16),
      5: pxToRem(20),
      6: pxToRem(24),
      7: pxToRem(28),
      8: pxToRem(32),
      9: pxToRem(36),
      10: pxToRem(40),

      pagePaddingBottom: '$10',
      pagePadding: '$6',
      pagePaddingMobile: '$4',
    },
    sizes: {
      pageMaxWidth: '1400px',
    },
    fontSizes: {
      1: pxToRem(8),
      2: pxToRem(12),
      3: pxToRem(14),
      4: pxToRem(16),
      5: pxToRem(24),
      50: pxToRem(30),
      6: pxToRem(32),
      7: pxToRem(40),
      8: pxToRem(48),
      9: pxToRem(56),
      10: pxToRem(64),
      11: pxToRem(72),
      12: pxToRem(76),
    },
    fontWeights: {
      medium: 400,
      bold: 700,
    },
    lineHeights: {
      default: 1.5,
      tight: 0.88,
    },
    letterSpacings: {
      0: '0.005em',
      3: '0.03em',
    },
    zIndices: {
      lowerBackgroundImage: -2,
      backgroundImage: -1,
    },
  },
  media: {
    ...media,
    motion: '(prefers-reduced-motion)',
    hover: '(hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
    pointerNone: '(pointer: none)',
    pointerCoarse: '(pointer: coarse)',
    pointerFine: '(pointer: fine)',
  },
  utils: {
    paddingVertical: (value: string & {}) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    paddingHorizontal: (value: string & {}) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
  },
})

const yellow = createTheme({
  colors: {
    primary: 'yellow',
    secondary: 'orange',
  },
})

const themeList = {
  default: theme,
  yellow: yellow,
}

const themeClassList = {
  default: theme.className,
  yellow: yellow.className,
}

export { css, styled, getCssText, globalCss, themeList, themeClassList }
