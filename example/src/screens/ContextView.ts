import { createContext } from 'react';
import { type NiInputInterface } from '@networkinternational/ni-card-management-sdk';

interface ContextProps {
  readonly inputData: NiInputInterface | null;
  readonly setInputData: (inputData: NiInputInterface) => void;
  readonly loadInputData: () => Promise<void>;
}

export const InputContext = createContext<ContextProps>({
  inputData: null,
  setInputData: () => null,
  loadInputData: async () => {},
});
