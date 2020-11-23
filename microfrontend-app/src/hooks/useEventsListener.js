import { useEffect } from 'react';

const useEventListener = (eventName, eventHandler) => {
    useEffect(() => {
        window.addEventListener(eventName, eventHandler);
        return () => window.removeEventListener(eventName, eventHandler, false);
    }, []);
  };
  
  export default useEventListener;