import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form } from '../.';

const App = () => {
  return (
    <div>
      <Form
        schema={{

        }}
        handleSubmit={console.log}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
