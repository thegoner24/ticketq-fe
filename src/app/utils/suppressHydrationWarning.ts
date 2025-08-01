// This utility helps suppress hydration warnings caused by browser extensions
// It works by overriding the console.error method to filter out specific hydration warnings

export function suppressHydrationWarnings() {
  if (typeof window !== 'undefined') {
    // Store the original console.error function
    const originalConsoleError = console.error;
    
    // Override console.error to filter out hydration warnings
    console.error = (...args: any[]) => {
      // Check if this is a hydration warning
      const isHydrationWarning = args.some(
        (arg) => 
          typeof arg === 'string' && 
          (arg.includes('Hydration failed because') || 
           arg.includes('A tree hydrated but some attributes') ||
           arg.includes('Warning: Text content did not match'))
      );
      
      // If it's not a hydration warning, pass it through to the original console.error
      if (!isHydrationWarning) {
        originalConsoleError.apply(console, args);
      }
    };
  }
}
