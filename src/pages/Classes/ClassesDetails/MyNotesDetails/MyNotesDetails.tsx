import React, { useState, useRef, Fragment } from 'react';
import JoditEditor from 'jodit-react';
import { CommandButton } from '@fluentui/react';
import { NoteList } from '../../../../components/itemlist/NoteList';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import classes from './MyNotesDetails.module.scss';
import { intl } from '../../../../util/commonFunction';
import { LabelNames } from '../../../../util/constant';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

const items = [
  {
    index: 0,
    title: 'Pointers for the Exam on Monday..  ',
    senderName: 'Mona Kane',
    dateSent: 'Oct 2',
    privacy: 'Only Me',
    notes:
      '<p><strong>Pointers for the Exam on Monday, Oct 5th 2020</strong></p> ' +
      '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elit.</p> ' +
      '<ul> ' +
      '   <li>Hello. Stet clita kasd <strong>gubergren</strong>, no sea takimata sanctus est.</li> ' +
      '   <li>Lorem ipsum dolor sit amet, consetetur sadipscing elit.</li> ' +
      '  <li>Sed diam nonumy eirmod tempor invidunt ut labore et.</li> ' +
      ' </ul> ' +
      ' <p>Dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.<br></p>',
    selected: true,
  },
];

const sortingOptions = [
  {
    key: 'Date latest-oldest',
    text: intl(LabelNames.date) + ' ' + intl(LabelNames.latestoldest),
  },
  {
    key: 'Date oldest-latest',
    text: intl(LabelNames.date) + ' ' + intl(LabelNames.oldestlatest),
  },
  { key: 'A-Z', text: intl(LabelNames.az) },
  { key: 'Z-A', text: intl(LabelNames.za) },
];

const SortingdropdownStyles = {
  dropdown: {
    width: 150,
  },
};

const MyNotesDetails: React.FC = () => {
  const [itemList, setItemList] = useState(items);

  const [selectedIndex, setIndex] = useState(0);
  const [content, setContent] = useState(itemList[selectedIndex].notes);
  const editor: any = useRef({
    buttons:
      'bold,italic,underline,,|,brush,fontsize,paragraph,eraser,outdent,indent,,,,link,source,hr,table,undo,redo',
  });

  const addIcon = { iconName: 'Add' };
  const addNoteStyle = {
    label: { fontSize: 16, fontWeight: 'bold' },
  };

  const selecteditem = (index: any) => {
    const updateItemList = [...items];
    updateItemList.forEach(item => {
      item.selected = false;
      if (item.index === index) {
        item.selected = true;
      }
    });

    const selItem: any = updateItemList.find(item => item.index === index);
    setItemList(updateItemList);
    setContent(selItem.notes);
    setIndex(index);
  };
  const config: any = {
    height: '650',
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
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

  return (
    <>
      <div className="ms-Grid-row">
        <div className={'ms-Grid-row bclist ' + classes.container}>
        <div className={'ms-Grid-col ms-lg1 ' + classes.filterwidth}>
            <FontIcon iconName="Sort" className={classes.cursor} />
          </div>
          <div className={'ms-Grid-col ms-lg5 headerFilter'}>
            <span className="padl10">
              <Dropdown
                defaultSelectedKey="Date latest-oldest"
                options={sortingOptions}
                styles={SortingdropdownStyles}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="ms-Grid-row ">
        <div className="ms-Grid-col ms-lg12">
          <div className={'ms-Grid-col ms-lg3 ' + classes.listBg}>
            <div className={classes.addNote}>
              <CommandButton
                iconProps={addIcon}
                text={intl(LabelNames.addNote)}
                styles={addNoteStyle}
              />
            </div>
            <NoteList itemlist={itemList} selecteditem={selecteditem} />
          </div>
          <div className="ms-Grid-col ms-lg9">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              //tabIndex={1} // tabIndex of textarea
              // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              // onChange={newContent => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyNotesDetails;