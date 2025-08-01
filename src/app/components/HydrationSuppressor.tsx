'use client';

import { useEffect } from 'react';
import { suppressHydrationWarnings } from '../utils/suppressHydrationWarning';

export default function HydrationSuppressor() {
  // Suppress hydration warnings from browser extensions
  useEffect(() => {
    suppressHydrationWarnings();
  }, []);
  
  // This component doesn't render anything
  return null;
}
