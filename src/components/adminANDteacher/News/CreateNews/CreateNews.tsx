import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import classes from './CreateNews.module.scss';

type CreateNewsProps = {
  errorMessage: any;
  onChangeRichText: any;
  onChangeAbstract: any;
  onChangeHeadline: any;
};

const CreateNews: React.FC<CreateNewsProps> = props => {
  const [joditWarning, setJoditWarning] = useState<string | null>();
  const editor: any = useRef({
    buttons:
      'bold,italic,underline,,|,brush,fontsize,paragraph,eraser,outdent,indent,,,,link,source,hr,table,undo,redo',
  });

  const config: any = {
    height: '400',
    readonly: false,
    sizeLG: 5000,
    sizeMD: 600,
    sizeSM: 400,
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'brush',
      'fontsize',
      'paragraph',
      'eraser',
      'outdent',
      'indent',
      'ul',
      'ol',
      '|',
      'link',
      'source',
      'hr',
      'table',
      'undo',
      'redo',
    ],
    buttonsMD: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'brush',
      'fontsize',
      'paragraph',
      'eraser',
      'outdent',
      'indent',
      'ul',
      'ol',
      '|',
      'link',
      'dots',
    ],
    buttonsSM: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'brush',
      'fontsize',
      'paragraph',
      'eraser',
      'outdent',
      'indent',
      'ul',
      'ol',
      '|',
      'link',
      'dots',
    ],
    buttonsXS: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'brush',
      'fontsize',
      'paragraph',
      'eraser',
      'outdent',
      'indent',
      'ul',
      'ol',
      '|',
      'link',
      'dots',
    ],
    colors: ['#ff0000', '#00ff00', '#0000ff'],

    events: {
      getIcon: function (name: any, control: any, clearName: any) {
        switch (clearName) {
          case 'bold':
            return '<i class="ms-Icon ms-Icon--Bold" aria-hidden="true"></i>';
          case 'italic':
            return '<i class="ms-Icon ms-Icon--Italic" aria-hidden="true"></i>';
          case 'underline':
            return '<i class="ms-Icon ms-Icon--Underline" aria-hidden="true"></i>';
          case 'strikethrough':
            return '<i class="ms-Icon ms-Icon--Strikethrough" aria-hidden="true"></i>';
          case 'brush':
            return '<i class="ms-Icon ms-Icon--Highlight" aria-hidden="true"></i>';
          case 'fontsize':
            return '<i class="ms-Icon ms-Icon--FontSize" aria-hidden="true"></i>';
          case 'paragraph':
            return '<span style="text-align: center;font-size:10px; width:50px;">Paragraph</span>';
          case 'eraser':
            return '<i class="ms-Icon ms-Icon--ClearFormattingEraser" aria-hidden="true"></i>';
          case 'outdent':
            return '<i class="ms-Icon ms-Icon--DecreaseIndentLegacy" aria-hidden="true"></i>';
          case 'indent':
            return '<i class="ms-Icon ms-Icon--IncreaseIndentLegacy" aria-hidden="true"></i>';
          case 'ul':
            return '<i class="ms-Icon ms-Icon--BulletedList" aria-hidden="true"></i>';
          case 'ol':
            return '<i class="ms-Icon ms-Icon--NumberedList" aria-hidden="true"></i>';
          case 'link':
            return '<i class="ms-Icon ms-Icon--Link" aria-hidden="true"></i>';
          default:
            break;
        }
      },
    },
  };

  useEffect(() => {
    if (props.errorMessage?.richtext) {
      setJoditWarning('JoditWarning ');
    } else {
      setJoditWarning(classes.joditHeight);
    }
  }, [props]);

  return (
    <div className="manageNews">
      <div className={'ms-Grid-row ' + classes.richTextDiv}>
        <TextField
          label="HEADLINE"
          placeholder="Untitled Story"
          onChange={(event: any) => {
            props.onChangeHeadline(event.target!.value);
          }}
          errorMessage={props.errorMessage?.headline}
        />
      </div>
      <br />
      <div className={'ms-Grid-row ' + classes.richTextDiv}>
        <TextField
          label="ABSTRACT"
          onChange={(event: any) => {
            props.onChangeAbstract(event.target!.value);
          }}
          errorMessage={props.errorMessage?.abstract}
          placeholder="Type a short description here so readers will be captivated to read!"
        />
      </div>

      <br />
      <br />

      <div
        className={
          'ms-Grid-col ms-lg12  ' + classes.richTextDiv + ' ' + joditWarning
        }>
        <JoditEditor
          ref={editor}
          value={''}
          onBlur={props.onChangeRichText}
          config={config}
          //tabIndex={1}
        />
      </div>
      {props.errorMessage?.richtext ? (
        <div className={'warning ' + classes.padB}>
          Please input required field
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CreateNews;
