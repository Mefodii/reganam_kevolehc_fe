import React, { useState } from 'react';
import { SidepanelElement } from '../../components/layout';
import { TextTransformers } from './TextTransformers';
import { TransExcelToTxt } from './TransExcelToTxt';

export const HelpersDashboard = React.memo(() => {
  const [helper, setHelper] = useState(<TextTransformers />);
  // TODO: (L) - helper does not have type.name anymore
  return (
    <div className='flex grow'>
      <div className='side-panel'>
        <SidepanelElement
          isSelected={helper.type.name === 'TextTransformers'}
          onClick={() => setHelper(<TextTransformers />)}
        >
          Different text Transformers
        </SidepanelElement>

        <SidepanelElement
          isSelected={helper.type.name === 'TransExcelToTxt'}
          onClick={() => setHelper(<TransExcelToTxt />)}
        >
          Transform Excel song list to txt
        </SidepanelElement>
      </div>
      <div className='py-5 px-10 bg-theme-2 w-full'>{helper}</div>
    </div>
  );
});
