'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps,
} from 'next-themes'
interface MyThemeProviderProps extends NextThemesProviderProps {
  children?: React.ReactNode
}

export function ThemeProvider({ children, ...props }: MyThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
