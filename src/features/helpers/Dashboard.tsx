import TransExcelToTxt from './TransExcelToTxt';
import TextTransformers from './TextTransformers';
import { SidepanelElement } from '../../components/layout';
import { useState } from 'react';

const Dashboard = () => {
  const [helper, setHelper] = useState(<TextTransformers />);
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
};

export default Dashboard;
