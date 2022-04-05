import { REM_SIZE } from './constants'

export const pxToRem = (pixels: number, removeSuffix: boolean = false): string | number => {
  if (removeSuffix) {
    return pixels / REM_SIZE
  } else {
    return `${pxToRem(pixels, true)}rem`
  }
}
