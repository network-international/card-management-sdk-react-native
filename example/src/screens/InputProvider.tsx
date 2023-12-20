import React, { useState } from 'react';
import { type NIInputInterface } from '@networkinternational/ni-card-management-sdk';
import { InputContext } from './ContextView';
import { TEST_INPUT } from '../config/config';

export const InputProvider = ({ children }: { children: any }) => {
  const [inputData, setInputData] = useState<NIInputInterface | null>(
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
