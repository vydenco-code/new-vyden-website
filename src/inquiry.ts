import { createContext, useContext } from 'react';

export const InquiryContext = createContext<(serviceName?: string) => void>(() => {});

export function useInquiry(): (serviceName?: string) => void {
  return useContext(InquiryContext);
}
