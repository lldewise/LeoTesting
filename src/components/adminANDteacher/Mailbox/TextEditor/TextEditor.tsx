import React, { useRef, Fragment, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import './TextEditor.scss';
import Picker from 'emoji-picker-react';
// import emojiSlice from 'emoji-slice';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Callout, mergeStyleSets, FontWeights } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { IconButton } from '@fluentui/react/lib/Button';
import { getBase64 } from '../../../../util/commonFunction';
import { CreateEmailAttachment } from '../EmailDetails/CreateEmailAttachment';

type TextEditorProps = {
  htmlValue: any;
  sendMail: any;
  saveAsDraft: any;
  onCreateMessage: any;
  oneDriveAttachment: any;
  mailAttachments: any;
  subjectValue: any;
};
const emojiSlice = require('emoji-slice');

const TextEditor: React.FC<TextEditorProps> = props => {
  const editor2:any = useRef({
    buttons:
      'copyformat,font,fontsize,bold,italic,underline,brush,link,ul,ol,outdent,indent,left,center,right,superscript,subscript,strikethrough,undo,redo,eraser,table',
  });
  const [htmlValue, setHtmlValue] = useState(props.htmlValue);
  //eslint-disable-next-line
  const [emoji, setEmoji] = useState(null);
  //eslint-disable-next-line
  const [text, setText] = useState(null);
  //eslint-disable-next-line
  const [arr, setArr] = useState<any[]>([]);

  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');

  const calloutProps = { gapSpace: 0 };

  const tooltipId = useId('tooltip');

  const hostStyles = { root: { display: 'inline-block' } };

  const [attachments, setAttachments] = useState<any[]>([]);
  const [attachTrigger, setAttachTrigger] = useState<any | null>();
  const [divAttachments, setDivAttachments] = useState<any | null>();
  const textFieldData = useRef<any>('');

  const onEmojiClick = (event:any, emojiObject:any) => {
    // eslint-disable-next-line no-extend-native
    // String.prototype.insert = function (index:any, string:any) {
    //   if (index > 0) {
    //     return this.substring(0, index) + string + this.substr(index);
    //   }

    //   return string + this;
    // };

    var idx = textFieldData.current.lastIndexOf('<');
    arr.push(emojiObject.emoji);
    var item = arr.join('');
    var filtered = emojiSlice(item, -1);
    var text = textFieldData.current.insert(idx, filtered);
    setEmoji(text);
  };

  const onChangeRichText = (data:any) => {
    textFieldData.current = data;
  };

  const sendMessage = () => {
    props.sendMail(textFieldData.current, attachments);
  };

  const saveAsDraft = () => {
    props.saveAsDraft(textFieldData.current);
  };

  const config2:any = {
    controls: {
      font: {
        list: {
          'Arial Black': 'Arial Black',
          Calibri: 'Calibri',
          'Calibri Light': 'Calibri Light',
          Cambria: 'Cambria',
          Candara: 'Candara',
          'Century Gothic': 'Century Gothic',
          'Comic Sans MS': 'Comic Sans MS',
          Consolas: 'Consolas',
          Constantia: 'Constantia',
          Corbel: 'Corbel',
          Courier: 'Courier',
          'Franklik Gothic Book': 'Franklik Gothic Book',
          'Franklik Gothic Demi': 'Franklik Gothic Demi',
          'Franklik Gothic Medium': 'Franklik Gothic Medium',
          Garamond: 'Garamond',
          'Lucida Console': 'Lucida Console',
          'Lucida Handwriting': 'Lucida Handwriting',
          'Lucida Sans Unicode': 'Lucida Sans Unicode',
          'Palatino Linotype': 'Palatino Linotype',
          'Segoe UI': 'Segoe UI',
          'Sitka Heading': 'Sitka Heading',
          'Sitka Text': 'Sitka Text',
          Times: 'Times',
          'Trebuchet MS': 'Trebuchet MS',
          'TW Cen MT': 'TW Cen MT',
        },
      },
    },
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    height: '350',
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    showCharsCounter: false,
    showXPathInStatusbar: false,
    showWordsCounter: false,
    sizeLG: 5000,
    sizeMD: 600,
    sizeSM: 400,
    buttons: [
      'copyformat',
      'font',
      'fontsize',
      'bold',
      'italic',
      'underline',
      'brush',
      'link',
      'ul',
      'ol',
      'outdent',
      'indent',
      'left',
      'center',
      'right',
      'superscript',
      'subscript',
      'strikethrough',
      'undo',
      'redo',
      'eraser',
      'table',
    ],
    buttonsMD: [
      'copyformat',
      'font',
      'fontsize',
      'bold',
      'italic',
      'underline',
      'brush',
      'link',
      'ul',
      'ol',
      'outdent',
      'indent',
      'left',
      'center',
      'right',
      'superscript',
      'subscript',
      'strikethrough',
      'dots',
      //   "strikethrough",
      //   "undo",
      //   "redo",
      //   "eraser",
      //   "table"
    ],
    buttonsSM: [
      'copyformat',
      'font',
      'fontsize',
      'bold',
      'italic',
      'underline',
      'brush',
      'link',
      'ul',
      'ol',
      'outdent',
      'indent',
      'left',
      'center',
      'right',
      'superscript',
      'subscript',
      'strikethrough',
      'dots',
      //   "strikethrough",
      //   "undo",
      //   "redo",
      //   "eraser",
      //   "table"
    ],
    buttonsXS: [
      'copyformat',
      'font',
      'fontsize',
      'bold',
      'italic',
      'underline',
      'brush',
      'link',
      'ul',
      'ol',
      'outdent',
      'indent',
      'left',
      'center',
      'right',
      'superscript',
      'subscript',
      'strikethrough',
      'dots',
      //   "strikethrough",
      //   "undo",
      //   "redo",
      //   "eraser",
      //   "table"
    ],
    colors: ['#ff0000', '#00ff00', '#0000ff'],

    events: {
      getIcon: function (name:any, control:any, clearName:any) {
        switch (clearName) {
          case 'copyformat':
            return '<i class="joditFormatPainter" aria-hidden="true"></i>';

          case 'font':
            return '<i class="joditFont" aria-hidden="true"></i>';

          case 'fontsize':
            return '<i class="joditFontSize" aria-hidden="true"></i>';

          case 'bold':
            return '<i class="joditBold" aria-hidden="true"></i>';

          case 'italic':
            return '<i class="joditItalic" aria-hidden="true"></i>';

          case 'underline':
            return '<i class="joditUnderline" aria-hidden="true"></i>';

          case 'brush':
            return '<i class="joditHighlight" aria-hidden="true"></i>';

          case 'link':
            return '<i class="joditLink" aria-hidden="true"></i>';

          case 'ul':
            return '<i class="joditBullets" aria-hidden="true"></i>';

          case 'ol':
            return '<i class="joditNumbering" aria-hidden="true"></i>';

          case 'outdent':
            return '<i class="joditOutdent" aria-hidden="true"></i>';

          case 'indent':
            return '<i class="joditIndent" aria-hidden="true"></i>';

          case 'left':
            return '<i class="joditAlignLeft" aria-hidden="true"></i>';

          case 'center':
            return '<i class="joditAlignCenter" aria-hidden="true"></i>';

          case 'right':
            return '<i class="joditAlignRight" aria-hidden="true"></i>';

          case 'superscript':
            return '<i class="joditSuperScript" aria-hidden="true"></i>';

          case 'subscript':
            return '<i class="joditSubScript" aria-hidden="true"></i>';

          case 'strikethrough':
            return '<i class="joditStrikeThrough" aria-hidden="true"></i>';

          case 'undo':
            return '<i class="joditUndo" aria-hidden="true"></i>';

          case 'redo':
            return '<i class="joditRedo" aria-hidden="true"></i>';

          case 'eraser':
            return '<i class="joditEraser" aria-hidden="true"></i>';

          case 'table':
            return '<i class="joditTable" aria-hidden="true"></i>';

          case 'dots':
            return '<i class="joditDots" aria-hidden="true"></i>';

          default:
            break;
        }
      },
    },
  };

  const styles = mergeStyleSets({
    button: {
      width: 130,
    },
    callout: {
      width: 320,
      padding: '20px 24px',
    },
    title: {
      marginBottom: 12,
      fontWeight: FontWeights.semilight,
    },
    link: {
      display: 'block',
      marginTop: 20,
    },
  });

  const removeAttachmentHandler = (key:any, files:any) => {
    let idxFile = attachments.findIndex((a:any) => a.name === files.name);
    if (idxFile !== -1) {
      attachments.splice(idxFile, 1);
      setAttachTrigger(Math.random().toString(10).substring(7));
    }
  };

  useEffect(() => {
    setDivAttachments(
      <div className="divBG">
        <div className="attachments">
          {attachments
            ?.filter(a => a.contentType.split('/')[0] === 'image')
            .map((a, key) => (
              <CreateEmailAttachment
                item={a}
                key={key}
                removeAttachment={removeAttachmentHandler}
              />
            ))}
        </div>
        <div className="fileAttachments">
          {attachments
            ?.filter(
              a =>
                a.contentType.split('/')[0] === 'application' ||
                a.contentType.split('/')[0] === 'text' ||
                a.contentType.split('/')[0] === 'video' ||
                a.contentType.split('/')[0] === 'audio',
            )
            .map((a, key) => (
              <CreateEmailAttachment
                item={a}
                key={key}
                removeAttachment={removeAttachmentHandler}
              />
            ))}
        </div>
      </div>,
    );
  }, [attachTrigger]);

  const onFileChange = (event:any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      getBase64(event.target.files[i]).then(response => {
        var item = {
          name: response.fileName,
          contentType: response.fileType,
          contentBytes: response.contentByte.split(',')[1],
        };
        attachments.push(item);

        setAttachTrigger(Math.random().toString(10).substring(7));
      });
    }
  };

  useEffect(() => {
    for (let i = 0; i < props.oneDriveAttachment.length; i++) {
      var item = {
        name: props.oneDriveAttachment[i].name,
        contentType: props.oneDriveAttachment[i].contentType,
        contentBytes: props.oneDriveAttachment[i].base64Content.split(',')[1],
      };

      attachments.push(item);
      setAttachTrigger(Math.random().toString(10).substring(7));
    }
  }, [props.oneDriveAttachment]);

  useEffect(() => {
    if (props.mailAttachments != undefined) {
      props.mailAttachments.forEach((element: any) => {
        var item = {
          name: element.name,
          contentType: element.contentType,
          contentBytes: element.contentBytes,
        };
        attachments.push(item);
        setAttachTrigger(Math.random().toString(10).substring(7));
      });
    }
  }, [props.mailAttachments]);

  const upload = () => {
    document.getElementById('selectImage')!.click();
  };

  const emojiIcon = { iconName: 'Emoji2' };

  const attachIcon = { iconName: 'Attach' };

  const photoIcon = { iconName: 'Photo2' };

  const moreIcon = { iconName: 'More' };

  const menuProps = {
    items: [
      {
        key: 'thisComputer',
        text: 'Browse this computer',
      },
      {
        key: 'cloudLocation',
        text: 'Browse cloud locations',
      },
    ],
    onItemClick: (e: any, value: any) => {
      clickFilterHandler(value);
    },
    directionalHintFixed: true,
  };

  const clickFilterHandler = (value: any) => {
    upload();
  };

  const menuMoreProps = {
    items: [
      {
        key: 'saveAsDraft',
        text: 'Save as draft',
      },
      {
        key: 'insertSignature',
        text: 'Insert signature',
      },
      {
        key: 'setImportance',
        text: 'Set importance',
      },
    ],
    onItemClick: (e: any, props: any) => {
      clickMenuHandler(props.key);
    },
    directionalHintFixed: true,
  };

  // handles for callout click event
  const clickMenuHandler = (props: any) => {
    switch (props) {
      case 'saveAsDraft':
        saveAsDraft();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (props.htmlValue != undefined) {
      setHtmlValue(
        <JoditEditor
          ref={editor2}
          value={props.htmlValue}
          config={config2}
          //tabIndex={1} // tabIndex of textarea
          //onBlur={onChangeRichText}
          // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={onChangeRichText}
          // placeholder=""
        />,
      );
    }
  }, [props.htmlValue]);

  return (
    <Fragment>
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          role="alertdialog"
          gapSpace={0}
          target={`#${buttonId}`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus>
          <Picker onEmojiClick={onEmojiClick} />
        </Callout>
      )}
      {divAttachments}
      <div className="joditContainer">
        {/* <JoditEditor
          ref={editor2}
          value={htmlValue}
          config={config2}
          //tabIndex={1} // tabIndex of textarea
          //onBlur={onChangeRichText}
          // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={onChangeRichText}
          placeholder=""
        /> */}
        {htmlValue}
      </div>
      <div className="buttonContainer">
        <PrimaryButton text="Send" onClick={sendMessage} type="button" />
        <DefaultButton
          text="Discard"
          type="button"
          className="btn"
          onClick={saveAsDraft}
        />
        <TooltipHost
          content="Insert emojis and GIFs"
          id={tooltipId}
          calloutProps={calloutProps}
          styles={hostStyles}
          className="btn">
          <IconButton
            menuProps={menuProps}
            iconProps={attachIcon}
            title="Emoji"
            ariaLabel="Emoji"
            className="btn"
          />
          <IconButton iconProps={photoIcon} title="Emoji" className="btn" />
          <IconButton
            iconProps={emojiIcon}
            title="Emoji"
            ariaLabel="Emoji"
            id={buttonId}
            onClick={toggleIsCalloutVisible}
            className="btn"
          />
          <IconButton
            iconProps={moreIcon}
            title="Emoji"
            menuProps={menuMoreProps}
            className="btn"
          />
          <input
            type="file"
            id="selectImage"
            onChange={onFileChange}
            className="customBtnupload"
            multiple
          />
        </TooltipHost>
      </div>
    </Fragment>
  );
};

export default TextEditor;
