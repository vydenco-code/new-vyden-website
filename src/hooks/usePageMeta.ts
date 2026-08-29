import { useEffect } from 'react';

const BASE_TITLE = 'Vyden Co.';

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
