import React from 'react';

import { MembersProvider } from '../../contexts/MembersContext';
import List from './index';

const Container = () => (
  <MembersProvider>
    <List />
  </MembersProvider>
);

export default Container;
