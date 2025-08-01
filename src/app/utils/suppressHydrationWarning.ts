export function suppressHydrationWarnings() {
  if (typeof window !== 'undefined') {
    const originalConsoleError = console.error;
    
    console.error = (...args: any[]) => {
      const isHydrationWarning = args.some(
        (arg) => 
          typeof arg === 'string' && 
          (arg.includes('Hydration failed because') || 
           arg.includes('A tree hydrated but some attributes') ||
           arg.includes('Warning: Text content did not match'))
      );
      
      if (!isHydrationWarning) {
        originalConsoleError.apply(console, args);
      }
    };
  }
}
