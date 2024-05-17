import { useState } from 'react';

import { joinByNewline, splitByNewline } from '../../util/functions';

import { Button } from '../../components/buttons';
import { TextArea } from '../../components/form';

import {
  playlistSquareToCurly,
  playlistItemNumbering,
  playlistAddCarret,
  playlistToYoutubePlaylist,
} from './transformers';

const TextTransformers = () => {
  const [transformer, setTransformer] = useState(playlistSquareToCurly);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleInputValueChange: Form.ChangeEventHandler<string> = (e, field) =>
    setInputValue(field.value!);
  const handleOutputValueChange: Form.ChangeEventHandler<string> = (e, field) =>
    setInputValue(field.value!);
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      transform();
    }
  };

  const onTransformerClick = (transformer: Helper.Transformer) =>
    setTransformer(transformer);

  const transform = () => {
    const result = transformer.run(splitByNewline(inputValue));
    setOutputValue(joinByNewline(result));
  };

  return (
    <div onKeyDown={onKeyDown}>
      <div className='border-b-2 border-theme-4 mb-4'>
        <div className='mb-4'>
          <div className='text-2xl mb-2'>
            Txt playlist transformation scripts:
          </div>
          <div className='flex flex-wrap justify-start mb-1'>
            <Button
              onClick={() => onTransformerClick(playlistSquareToCurly)}
              className={
                transformer.name === playlistSquareToCurly.name
                  ? 'btn-selected'
                  : ''
              }
              tooltip='Transform Square brackets to Curly'
            >
              {'[] -> {}'}
            </Button>
            <Button
              onClick={() => onTransformerClick(playlistItemNumbering)}
              className={
                transformer.name === playlistItemNumbering.name
                  ? 'btn-selected'
                  : ''
              }
            >
              Add playlist numbering
            </Button>
            <Button
              onClick={() => onTransformerClick(playlistAddCarret)}
              className={
                transformer.name === playlistAddCarret.name
                  ? 'btn-selected'
                  : ''
              }
            >
              {`Add Carret "^"`}
            </Button>
          </div>
        </div>
        <div className='mb-4'>
          <div className='text-2xl mb-2'>Other scripts:</div>
          <div className='flex flex-wrap justify-start mb-1'>
            <Button
              onClick={() => onTransformerClick(playlistToYoutubePlaylist)}
              className={
                transformer.name === playlistToYoutubePlaylist.name
                  ? 'btn-selected'
                  : ''
              }
            >
              {`Extract youtube playlist`}
            </Button>
          </div>
        </div>
      </div>
      <div className='form-row'>
        <TextArea
          // containerClassName={error ? 'border border-error-1' : ''}
          label='Input'
          rows={32}
          autoSize={false}
          name='inputValue'
          value={inputValue}
          onChange={handleInputValueChange}
          copy
          paste
          textMono
        />
        <TextArea
          label='Output'
          name='outputValue'
          rows={32}
          autoSize={false}
          value={outputValue}
          onChange={handleOutputValueChange}
          copy
          paste
          textMono
        />
      </div>
      <div className='form-row'>
        <Button onClick={transform}>Run</Button>
      </div>
    </div>
  );
};

export default TextTransformers;
