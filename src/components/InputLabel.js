import React from 'react';
import * as Label from '@radix-ui/react-label';
import './styles.css';

const InputLabel = () => (
  <div
    style={{ display: 'flex', padding: '0 20px', flexWrap: 'wrap', gap: 15, alignItems: 'center' }}
  >
    <Label.Root 
      className="text-sm leading-7 text-black" 
      htmlFor="firstName"
    >
      First name
    </Label.Root>
    <input 
      className="w-48 inline-flex items-center justify-center rounded h-8 text-sm leading-none text-black shadow-sm shadow-slate-400 px-2" 
      type="text" 
      id="firstName" 
      defaultValue="Pedro Duarte" 
    />
  </div>
);

export default InputLabel;