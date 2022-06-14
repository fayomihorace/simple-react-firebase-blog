import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/app';
import { useAuthState } from './../hooks';
import { useNavigate, useLocation } from "react-router-dom";
import { Remarkable } from 'remarkable';
import Article from './Article';


const ArticleEditor = () => {
  const { user } = useAuthState(firebase.auth());
  const navigate = useNavigate();
  const routeParams = useLocation();
  const articleParam = routeParams?.state?.article
  const db = firebase.firestore();
  const articlesRef = db.collection('articles');
  const inputRef = useRef();
  const [editedArticle, setArticle] = useState(articleParam?.content || initialPayload);
  const [title, setTitle] = useState(articleParam?.title || '');
  var md = new Remarkable();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  if (!user) return <></>


  const { uid, displayName, photoURL } = user;

  const getRawMarkup = () => {
    return { __html: md.render(editedArticle) };
  }

  const handleArticleOnChange = e => {
    setArticle(e.target.value);
  };

  const handleTitleOnChange = e => {
    setTitle(e.target.value);
  };

  const createArticle = () => {
    const trimmedArticle = editedArticle.trim();
    if (!trimmedArticle) return
    articlesRef.add({
      title: title.trim(),
      content: trimmedArticle,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      displayName,
      photoURL,
    });
    navigate("/");
    // Clear input field
    // setArticle('');
  }

  const updateArticle = async () => {
    console.log('--update: id=', articleParam.id)
    let res = await db.collection('articles').doc(articleParam.id).update({
      title: title.trim(),
      content: editedArticle.trim()
    });
    navigate("/");
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    if (articleParam?.content) {
      updateArticle()
    } else (
      createArticle()
    )
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className=""
    >
      <table style={{width: "100%"}}>
        <tbody>
          <tr>
            <td colSpan={2}>
              <button
                type="submit"
                disabled={!editedArticle}
                className="uppercase text-sm font-medium text-primary-500 hover:text-white tracking-wide hover:bg-primary-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 transition-all"
              >
                Enregistrer
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <input
                type="text"
                style={{width: "100%"}}
                ref={inputRef}
                value={title}
                onChange={handleTitleOnChange}
                placeholder="Title of the article..."
                className="flex-1 bg-transparent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td
              style={{width: "50%"}}
              className="border-gray-500 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto shadow-md"
            >
              <textarea
                rows="25"
                style={{width: "100%"}}
                ref={inputRef}
                value={editedArticle}
                onChange={handleArticleOnChange}
                placeholder="Type your article here..."
                className="flex-1 bg-transparent outline-none"
              />
            </td>
            <td style={{verticalAlign: "text-top"}}>
              <div
                style={{width: "100%"}}
                className="border-stone-800 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto"
                dangerouslySetInnerHTML={getRawMarkup()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

const initialPayload = `
***This is a Blog article example in markdown.***

[This is the link of PLA facebook](https://web.facebook.com/PLAVisionaries)

*This is italic*

**This is bold**

***Bold and italic***
______

![An immage](https://palam.ca/wp-content/uploads/2018/11/D%C3%A9couvrez-trois-sites-d%E2%80%99images-gratuites-libre-de-droit-pour-votre-cr%C3%A9ativit%C3%A9e-768x512.jpg)
`
export default ArticleEditor;
