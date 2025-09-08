import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/config/localization/i18n';
import { DemoScreen } from './src/screens/DemoScreen';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <DemoScreen />
    </I18nextProvider>
  );
};

export default App;