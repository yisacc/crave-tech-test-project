// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client/client';

export function App() {
  return (
    <ApolloProvider client={client}>
      <h1>Test</h1>
    </ApolloProvider>
  );
}

export default App;
