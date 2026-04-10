import { createContext, use, type ReactNode } from 'react';

const ReadonlyContext = createContext({ readonly: false });

export const ReadonlyProvider = ({ readonly, children }: { readonly: boolean; children: ReactNode }) => {
  return <ReadonlyContext value={{ readonly }}>{children}</ReadonlyContext>;
};

export const useReadonly = (): boolean => {
  const context = use(ReadonlyContext);
  return context.readonly;
};
