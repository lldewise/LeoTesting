/* import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 */

import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import { createEditorViewState, EmojiPlugin } from 'roosterjs-react';
import { Ribbon, RibbonPlugin } from 'roosterjs-react-ribbon';

import ReactEditor from '../../../../components/adminANDteacher/Mailbox/RoosterTextEditor/ReactEditor';
import { ribbonButtonRenderer } from '../../../../components/adminANDteacher/Mailbox/RoosterTextEditor/ribbonButtonRenderer';
import styles from './index.module.scss';
 
const container = document.getElementById('root');
const viewState = createEditorViewState('Hello Jay!');
const ribbonPlugin = new RibbonPlugin();
const emojiPlugin = new EmojiPlugin();
const emojiButton = {
  name: 'btnEmoji',
  onClick: (editor :any) => emojiPlugin.startEmoji(),
} ;

const ribbonButtons = [
  'bold',
  'italic',
  'underline',
  'font',
  'size',
  'bkcolor',
  'color',
  'bullet',
  'number',
  'indent',
  'outdent',
  'quote',
  'left',
  'center',
  'right',
  'link',
  'unlink',
  'sub',
  'super',
  'strike',
  'alttext',
  'ltr',
  'rtl',
  'undo',
  'redo',
  'unformat',
] as any;

const emoji = [
  'emoji',
] as any;
const CreateEmail: React.FC = () => {
  return (
    <Fragment>
    
        <Ribbon
          ribbonPlugin={ribbonPlugin}
          className={'myRibbon'}
          buttonRenderer={ribbonButtonRenderer}
          buttonNames={ribbonButtons}
       
        /> 
        <ReactEditor
          className={styles.editor}
          viewState={viewState}
          plugins={[ribbonPlugin, emojiPlugin]}
        />
         {/* Other Buttons */}
         <Ribbon ribbonPlugin={ribbonPlugin}   
         buttonNames={emoji}    
         buttonRenderer={ribbonButtonRenderer}  
         additionalButtons={{ emoji: emojiButton }} />
    
    </Fragment>
  );
}
/* 
window.addEventListener('resize', () => ribbonPlugin.resize());
ReactDom.render(<CreateEmail />, container);
  */
export default CreateEmail;