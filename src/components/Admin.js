import React from 'react';
import ArticleEditor from './ArticleEditor'


const Admin = ({ onArticleCreated }) => {
  
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">Vous etes un administrateur du Blog</p>
              <p className="mb-3">PLA (Positive Lifestyle Attitude)</p>
            </div>
            <p className="text-gray-400 text-center">
              Vous pouvez creer et modifier des articles.
            </p>
          </div>
        </div>
        <div style={{margin: "2%"}}>
          <ArticleEditor
            onArticleCreated={() => onArticleCreated()}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
