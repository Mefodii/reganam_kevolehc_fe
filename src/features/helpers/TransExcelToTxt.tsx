import { useState } from 'react';

import { Button } from '../../components/buttons';
import { TextArea } from '../../components/form';

const SEPARATOR = '<SEPARATOR>';
const UNDERLINE =
  '________________________________________________________________________________________________________________________________________________________________';
const WITH_COMMENT = false;

const TransExcelToTxt = () => {
  const [excelValue, setExcelValue] = useState('');
  const [txtValue, setTxtValue] = useState('');

  const handleExcelValueChange: Form.ChangeEventHandler<string> = (e, field) =>
    setExcelValue(field.value!);
  const handleTxtValueChange: Form.ChangeEventHandler<string> = (e, field) =>
    setTxtValue(field.value!);
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleTransform();
    }
  };

  let artist: string = '';
  const handleTransform = () => {
    const excelLines = excelValue.split('\n');
    const [name, date, ...tracks] = excelLines;
    artist = name;

    const year = date.slice(-4);
    const month = date.slice(3, 5);
    const day = date.slice(0, 2);

    const txtName = `-> Name: ${name}`;
    const txtDate = `-> Date: ${year}.${month}.${day}`;
    const trackList = transformExcelLines(tracks);

    const txtArray = [txtName, txtDate, UNDERLINE, ...trackList];
    const txtValue = txtArray.reduce((val, line) => `${val}${line}\n`, '');
    setTxtValue(txtValue);
  };

  const transformExcelLines = (tracks: string[]): string[] => {
    let trackList: string[] = [];

    let checked = true;
    tracks.forEach((line) => {
      if (line === SEPARATOR) {
        checked = false;
      }

      if (line !== SEPARATOR && line.length > 0) {
        trackList.push(parseTrack(line, checked));
      }
    });

    trackList.sort((a, b) => a.slice(6).localeCompare(b.slice(6)));
    return trackList;
  };

  const parseTrack = (line: string, checked: boolean): string => {
    const head = `  [${checked ? 'X' : '-'}] ${artist} - ${line}`;
    if (!WITH_COMMENT) return head;

    let tail;
    if (head.length < 119) tail = ' '.repeat(119 - head.length) + '# -';
    else tail = ' # -';

    return `${head}${tail}`;
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <div className='form-row mb-2'>
        <Button onClick={handleTransform}>Transform</Button>
      </div>

      <div className='form-row'>
        <TextArea
          containerClassName='w-1/2'
          label='Excel'
          rows={40}
          autoSize={false}
          name='excelValue'
          value={excelValue}
          onChange={handleExcelValueChange}
          copy
          paste
          textMono
        />
        <TextArea
          label='Text'
          name='txtValue'
          rows={40}
          autoSize={false}
          value={txtValue}
          onChange={handleTxtValueChange}
          copy
          paste
          textMono
        />
      </div>
      <div className='form-row'>
        <Button onClick={handleTransform}>Transform</Button>
      </div>
    </div>
  );
};

export default TransExcelToTxt;
