'use client';

import { Provider } from 'jotai';
import { useAtomsDevtools } from 'jotai-devtools/utils';
import type { PropsWithChildren } from 'react';

import NoSSR from '../NoSSR';

const DevTools = ({ children }: PropsWithChildren) => {
  useAtomsDevtools('Jotai');
  return children;
};

const JotaiProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider>
      <NoSSR>
        <DevTools>{children}</DevTools>
      </NoSSR>
    </Provider>
  );
};

export default JotaiProvider;
