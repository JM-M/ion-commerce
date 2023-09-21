import { useEffect } from 'react';

const useEruda = () => {
  const isSSR = typeof document === 'undefined';
  useEffect(() => {
    if (isSSR) return;

    // load eruda
    (function () {
      var src = '//cdn.jsdelivr.net/npm/eruda';
      if (
        !/eruda=true/.test(window.location as any) &&
        localStorage.getItem('active-eruda') != 'true'
      )
        return;
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.src = src;
      document.body.appendChild(script1);
      setTimeout(() => {
        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.innerHTML = 'eruda.init();';
        document.body.appendChild(script2);
      }, 15000);
    })();
  }, [isSSR]);
};

export default useEruda;
