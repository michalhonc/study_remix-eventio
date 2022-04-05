/**
 * Map of existing breakpoints.
 */
enum EBreakpoint {
  small = 'small',
  medium = 'medium',
  large = 'large',
  max = 'max',
}

/**
 * List of breakpoint ids.
 */
const breakpointKeys = Object.values(EBreakpoint) as EBreakpoint[]

type TBreakpointNames = Record<EBreakpoint, string>

/**
 * Breakpoint names, used on admin input fields.
 */
const breakpointNames: TBreakpointNames = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  max: 'Maximum',
}

type TBreakpoints = Record<EBreakpoint, number>

/**
 * Breakpoint width values map.
 */
const breakpoints: TBreakpoints = {
  small: 375,
  medium: 1024,
  large: 1280,
  max: 2560,
}

export type { TBreakpointNames, TBreakpoints }

export { EBreakpoint, breakpoints, breakpointKeys, breakpointNames }
