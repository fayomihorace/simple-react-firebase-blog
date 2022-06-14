import React from 'react';
import firebase from 'firebase/app';
import Dropdown from './Dropdown'
import { Link } from "react-router-dom";

const AccountButton = function ({user}) {

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  if (user) {
    return (
      <Dropdown
        template={
          <div className="flex items-center mb-1">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="rounded-full mr-4"
                width={30}
                style={{border: '1px solid #e5e7eb'}}
              />
            ) : null}
            {user.displayName}
          </div>
        }
        items={[
          {
            id: 0,
            component: (
              <Link to="/">
                <button
                  className="uppercase text-sm font-medium text-primary-500 hover:text-white tracking-wide hover:bg-primary-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 transition-all"
                >
                  Blog
                </button>
              </Link>
            )
          },
          {
            id: 1,
            component: (
              <Link to="/admin">
                <button
                  className="uppercase text-sm font-medium text-primary-500 hover:text-white tracking-wide hover:bg-primary-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 transition-all"
                >
                  Admin
                </button>
              </Link>
            )
          },
          {
            id: 2,
            component: (
              <button
                onClick={() => signOut()}
                className="uppercase text-sm font-medium text-primary-500 hover:text-white tracking-wide hover:bg-primary-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 transition-all"
              >
                Deconnexion
              </button>
            )
          }
        ]}
      />
    )
  } else {
    return (
      <button
        onClick={signInWithGoogle}
        className="uppercase text-sm font-medium text-primary-500 hover:text-white tracking-wide hover:bg-primary-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 transition-all"
      >
        Se connecter
      </button>
    )
  }
}

export default AccountButton;
