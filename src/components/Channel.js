import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useFirestoreQuery } from '../hooks';
// Components
import Article from './Article';


const Channel = ({ user = null }) => {
  const db = firebase.firestore();
  const articlesRef = db.collection('articles');
  const articles = useFirestoreQuery(
    articlesRef.orderBy('createdAt', 'desc').limit(100)
  );

  const inputRef = useRef();
  const bottomListRef = useRef();
  // const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-sm mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">Bienvenue sur le Blog de la</p>
              <p className="mb-3">PLA (Positive Lifestyle Attitude)</p>
            </div>
            <p className="text-gray-400 text-center">
              Vous pouvez parcourir nos articles.
            </p>
          </div>
          <ul>
            {articles
              ?.map(article => (
                <li key={article.id}>
                  <Article {...article} />
                </li>
              ))}
          </ul>
          <div ref={bottomListRef} />
        </div>
      </div>
    </div>
  );
};

/* Channel.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
}; */

export default Channel;
