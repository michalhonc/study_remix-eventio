import { pxToRem } from './conversion'
import type { EBreakpoint } from './breakpoints'
import { breakpoints } from './breakpoints'

type TMedia = `${EBreakpoint}Up` | `${EBreakpoint}Down`
type TMediaMap = Record<TMedia, string>

/**
 * Media queries map based on theme defined breakpoints.
 *
 * result:
 * {
 *   "smallUp": "(min-width: ...)",
 *   "smallDown": "(max-width: ...)",
 *   ...
 * }
 */
const media = Object.fromEntries(
  Object.entries(breakpoints).flatMap(([key, value]) => [
    [`${key}Up`, `(min-width: ${pxToRem(value, true)}em)`],
    [`${key}Down`, `(max-width: ${pxToRem(value - 0.02, true)}em)`],
    // Why subtract .02px? Browsers don’t currently support range context queries, so we work around the limitations
    // of min- and max- prefixes and viewports with fractional widths (which can occur under certain conditions on
    // high-dpi devices, for instance) by using values with higher precision.
    // Read more here: https://getbootstrap.com/docs/5.0/layout/breakpoints/

    // TODO: [`${key}Only`]: `(min-width: ${value / 16}em) and (max-width: ${(value - 0.02) / 16}em)`,
  ])
) as TMediaMap

const mediaKeys = Object.keys(media) as TMedia[]

type TMediaSelector = `@${TMedia}` | '@initial'

const mediaSelectors = [...mediaKeys, 'initial'].map((key) => `@${key}` as TMediaSelector)

export type { TMedia, TMediaSelector }

export { media, mediaKeys, mediaSelectors }
