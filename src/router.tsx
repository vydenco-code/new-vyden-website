import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';

interface RouterValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} });

function currentPath(): string {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(currentPath);

  useEffect(() => {
    const onPop = () => {
      setPath(currentPath());
      window.dispatchEvent(new CustomEvent("route-change", { detail: { path: currentPath() } }));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to.startsWith('#')) {
      const el = document.querySelector(to);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const [pathname, hash] = to.split('#');
    if (pathname && pathname !== currentPath()) {
      window.history.pushState({}, '', to);
      setPath(currentPath());
      window.dispatchEvent(new CustomEvent("route-change", { detail: { path: currentPath() } }));
      window.scrollTo(0, 0);
    }

    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterValue {
  return useContext(RouterContext);
}

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
  ariaLabel?: string;
}

export function Link({ to, children, className, onClick, ariaLabel, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} aria-label={ariaLabel} {...rest}>
      {children}
    </a>
  );
}
