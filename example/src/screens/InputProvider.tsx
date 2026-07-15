import React, { useState } from 'react';
import { type ReactNode } from 'react';
import { type NiInputInterface } from '@networkinternational/ni-card-management-sdk';
import { InputContext } from './ContextView';
import { TEST_INPUT } from '../config/config';

export const InputProvider = ({ children }: { children: ReactNode }) => {
  const [inputData, setInputData] = useState<NiInputInterface | null>(
    TEST_INPUT
  );

  const loadInputData = async () => {
    setInputData(TEST_INPUT);
  };

  React.useEffect(() => {
    loadInputData();
  }, []);

  const value = {
    inputData,
    setInputData,
    loadInputData,
  };

  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};
