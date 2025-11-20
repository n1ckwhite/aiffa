import React from 'react';
import type { ItemsProps } from '../../../types';
import Item from '../Item/Item';
import ItemText from '../ItemText/ItemText';
import ItemHiddenInput from '../ItemHiddenInput/ItemHiddenInput';

const Items: React.FC<ItemsProps> = ({ items, name = 'segment' }) => {
  return (
    <>
      {items.map((it) => (
        <Item key={it.value} value={it.value}>
          <ItemText>{it.label}</ItemText>
          <ItemHiddenInput name={name} value={it.value} />
        </Item>
      ))}
    </>
  );
};

export default Items;


