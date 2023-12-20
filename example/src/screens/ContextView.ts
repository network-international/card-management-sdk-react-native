import { createContext } from 'react';
import { NIInputInterface } from '@networkinternational/ni-card-management-sdk';

interface ContextProps {
  readonly inputData: NIInputInterface | null;
  readonly setInputData: (inputData: NIInputInterface) => void;
  readonly loadInputData: () => Promise<void>;
}

export const InputContext = createContext<ContextProps>({
  inputData: null,
  setInputData: () => null,
  loadInputData: async () => {},
});
