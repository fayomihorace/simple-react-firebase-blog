import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { formatDate } from './../utils'
import { useAuthState } from './../hooks';
import firebase from 'firebase/app';

import Modal from './Modal'

const Article = ({
  id,
  createdAt = null,
  title = '',
  content = '',
  displayName = '',
  photoURL = '',
}) => {
  const navigate = useNavigate();
  const { user, initializing } = useAuthState(firebase.auth());
  const db = firebase.firestore();
  if (!title) return null;

  async function deleteArticle () {
    const res = await db.collection('articles').doc(id).delete();
  }

  return (
    <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-1">
      <div
        className="col-span-3 px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start"
        style={{ cursor: "pointer" }}
        onClick={
          () => navigate('/post', { 
            state: {
              id,
              createdAt,
              title,
              content,
              author: displayName
            }
          })
        }
      >
        {photoURL ? (
          <img
            src={photoURL}
            alt="Avatar"
            className="rounded-full mr-4"
            width={45}
            height={45}
          />
        ) : null}
        <div>
          <div className="flex items-center mb-1">
            {displayName ? (
              <p className="mr-2 text-primary-500">{displayName}</p>
            ) : null}
            {createdAt?.seconds ? (
              <span className="text-gray-500 text-xs">
                {formatDate(new Date(createdAt.seconds * 1000))}
              </span>
            ) : null}
          </div>
          <p>{title}, <span className="italic font-medium">{displayName}</span></p>
        </div>
      </div>
      {user.isAdmin && (
        <div className='text-right'>
          <Modal
            buttonText="Supprimer"
            title="Supprimer ce article"
            description="Voulez vous vriament supprimer ce article?"
          >
            <button
              type="button"
              onClick={deleteArticle}
              className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Oui
            </button>
          </Modal>
        </div>
      )}
    </div>
  );
};

Article.propTypes = {
  content: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Article;
