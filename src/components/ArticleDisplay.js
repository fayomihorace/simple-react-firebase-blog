import React from 'react';
import { Remarkable } from 'remarkable';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthState } from './../hooks';
import { formatDate } from './../utils'
import firebase from 'firebase/app';

const ArticleDisplay = (props) => {

  var md = new Remarkable();
  const { user, initializing } = useAuthState(firebase.auth());
  const navigate = useNavigate();
  const {state} = useLocation();
  const {
    createdAt,
    title,
    content,
    author
  } = state;

  const getRawMarkup = () => {
    return { __html: md.render(content) };
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">{title}</p>
            </div>
            <p className="text-gray-400 text-center">
              {author},
              <span className="italic font-medium">
                {createdAt?.seconds ? (
                  <span className="text-gray-500 text-xs">
                    {formatDate(new Date(createdAt.seconds * 1000))}
                  </span>
                ) : null}
              </span>
            </p>
            {user.isAdmin && (
              <p>
                <button
                  type="button"
                  onClick={
                    () => navigate('/admin', { state: {
                      article: state
                    } })
                  }
                  className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  Modifier
                </button>
              </p>
            )}
          </div>
          <ul>
            <div
              style={{width: "100%"}}
              className="border-stone-800 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto"
              dangerouslySetInnerHTML={getRawMarkup()}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticleDisplay;
