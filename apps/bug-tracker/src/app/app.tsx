// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client/client';
import React from 'react';
import 'antd/dist/antd.less'
import './app.module.scss'
import MainLayout from '../layouts/main-layout';

export function App() {
  return (
    <ApolloProvider client={client}>
      <MainLayout />
    </ApolloProvider>
  );
}

export default App;
