import React from 'react';
import { useSegmentCtx } from '../../../model/context';

const ItemHiddenInput: React.FC<{ name: string; value: string }> = ({ name, value }) => {
  const { value: current } = useSegmentCtx();
  return <input type="radio" name={name} value={value} checked={current === value} readOnly aria-hidden style={{ display: 'none' }} />;
};

export default ItemHiddenInput;


