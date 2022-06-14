import React from 'react';
import { Outlet } from "react-router-dom";

// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Hooks
import { useAuthState } from './hooks';
// Components
import Loader from './components/Loader';
import AccountButton from './components/AccountButton';


firebase.initializeApp({
  apiKey: "AIzaSyCXJwOQv-McJaw4o4lbZovUUFDDSPHqpLA",
  authDomain: "selfmade-f1b13.firebaseapp.com",
  databaseURL: "https://selfmade-f1b13.firebaseio.com",
  projectId: "selfmade-f1b13",
  storageBucket: "selfmade-f1b13.appspot.com",
  messagingSenderId: "302912867093",
  appId: "1:302912867093:web:b1e5d17e421112ba49b71c"
})

function App() {
  const { user, initializing } = useAuthState(firebase.auth());
  const brandLogo = `${process.env.PUBLIC_URL}/logo.png`;

  const renderContent = () => {
    if (initializing) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader size="lg" />
        </div>
      );
    }

    return <Outlet />;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md"
        style={{ height: 'var(--topbar-height)' }}
      >
        <a href="/">
          <img src={brandLogo} alt="Positive LifeStyle attitude" width={50} />
        </a>
        <div className="flex items-center">
          <AccountButton user={user}/>
        </div>
      </header>
      <main
        className="flex-1"
        style={{ maxHeight: 'calc(100% - var(--topbar-height))' }}
      >
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
