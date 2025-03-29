import React from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import AppRoutes from './Routes/routes';
import './styles/variables.css';
import { SessionProvider } from './context/SessionContext';
import InactivityHandler from './ComponentsUI/InactivityHandler/InactivityHandler';
import 'antd/dist/reset.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FC0533',
        },
      }}
    >
      <AntdApp>
        <SessionProvider>
          <div className="fixed-layout">
            <BrowserRouter>
              <InactivityHandler />
              <AppRoutes />
            </BrowserRouter>
          </div>
        </SessionProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
