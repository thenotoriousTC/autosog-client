import { useRef, useEffect } from 'react';

/**
 * Custom hook to track component render count
 * Useful for debugging and performance optimization
 * 
 * @param componentName Name of the component to track
 * @param enableLogging Whether to log renders to console (default: false)
 * @returns Current render count
 */
export function useRenderCount(componentName: string, enableLogging = false) {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    
    if (enableLogging) {
      console.log(`[Render Count] ${componentName}: ${renderCount.current}`);
    }
  });
  
  return renderCount.current;
}

export default useRenderCount; 