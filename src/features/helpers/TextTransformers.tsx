import React, { useState } from 'react';
import { Button } from '../../components/buttons';
import { TextArea } from '../../components/form';
import { joinByNewline, splitByNewline } from '../../util/functions';
import {
  playlistAddCarret,
  playlistItemNumbering,
  playlistSquareToCurly,
  playlistToYoutubePlaylist,
} from './transformers';

export const TextTransformers = React.memo(() => {
  const [transformer, setTransformer] = useState(playlistSquareToCurly);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleInputValueChange: Form.ChangeEventHandler<string> = (e, field) =>
    setInputValue(field.value!);
  const handleOutputValueChange: Form.ChangeEventHandler<string> = (e, field) =>
    setInputValue(field.value!);
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      transform();
    }
  };

  const handleTransformerClick = (transformer: Helper.Transformer) =>
    setTransformer(transformer);

  const transform = () => {
    const result = transformer.run(splitByNewline(inputValue));
    setOutputValue(joinByNewline(result));
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <div className='border-b-2 border-theme-4 mb-4'>
        <div className='mb-4'>
          <div className='text-2xl mb-2'>
            Txt playlist transformation scripts:
          </div>
          <div className='flex flex-wrap justify-start mb-1'>
            <Button
              onClick={() => handleTransformerClick(playlistSquareToCurly)}
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
              onClick={() => handleTransformerClick(playlistItemNumbering)}
              className={
                transformer.name === playlistItemNumbering.name
                  ? 'btn-selected'
                  : ''
              }
            >
              Add playlist numbering
            </Button>
            <Button
              onClick={() => handleTransformerClick(playlistAddCarret)}
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
              onClick={() => handleTransformerClick(playlistToYoutubePlaylist)}
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
});
