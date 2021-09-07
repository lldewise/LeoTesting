import React, { Fragment, useEffect, useState } from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import NewsFeeds from '../../../components/news/NewsFeeds/NewsFeeds';
import Likes from '../../../components/news/Likes/Likes';
import Comments from '../../../components/news/Comments/Comments';
import CommentsItem from '../../../components/news/CommentsItem/CommentsItem';
import classes from './TeachersNotes.module.scss';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { Attachment } from '../../../components/news/Attachment';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';
import { Dialog } from 'office-ui-fabric-react/lib/Dialog';
import pic from '../../../assets/images/persona/helle.png';
import pic1 from '../../../assets/images/persona/helle.png';
import pic2 from '../../../assets/images/persona/mona.png';

import { useBoolean } from '@uifabric/react-hooks';
import { UserProfile } from '../../../types/store/users';

const modelProps = {
  isBlocking: true,
  topOffsetFixed: true,
};

const newsFeedsItem = [
  {
    id: 1,
    name: 'Anne Nielsen',
    initial: 'AN',
    persona: pic1,
    date: 'October 2, 2020 Fri Lesson ',
    comments:
      '<p>No late comers allowed! Bring your English 101 Book. Please study the attached file.</p>',
    status: 2,
    active: false,
    count: 3,
    commentCount: 0,
    commentList: [],
    commentClick: false,
    attachmentList: [
      {
        fileName: 'Study Reference.png',
        fileExtension: '.png',
        fileType: 'image',
        icon: '',
        src: 'https://images-na.ssl-images-amazon.com/images/I/41aooW9N63L._SX326_BO1,204,203,200_.jpg',
      },
      {
        fileName: 'English Reference.docx',
        fileExtension: '.docx',
        fileType: 'video',
        icon: '',
        src: '',
      },
      {
        fileName: 'Science Reference.docx',
        fileExtension: '.docx',
        fileType: 'file',
        icon: 'docx',
        src: '',
      },
      {
        fileName: 'Math Reference.pptx',
        fileExtension: '.pptx',
        fileType: 'file',
        icon: 'pptx',
        src: '',
      },
      {
        fileName: 'English Reference.xlsx',
        fileExtension: '.xlsx',
        fileType: 'file',
        icon: 'xlsx',
        src: '',
      },
      {
        fileName: 'History Reference.xlsx',
        fileExtension: '.xlsx',
        fileType: 'file',
        icon: 'xlsx',
        src: '',
      },
    ],
  },
  {
    id: 2,
    name: 'Anne Nielsen',
    initial: 'AN',
    persona: pic1,
    date: 'October 1, 2020 Thu Lesson ',
    comments:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
      ' sed do eiusmod tempor</p><ul><li><em>&nbsp;<span style="text-decoration: underline; color: #0000ff;">' +
      ' <a href="https://somewebsite">https://somewebsite</a></span></em></li> <li>Lorem ipsum dolor sit amet, consectetur</li>' +
      ' <li>Consectetur adipiscing elit, sed do eiusmod tempor</li>' +
      ' <li>Lorem ipsum dolor sit amet, consectetur</li>' +
      ' <li>Consectetur adipiscing elit, sed do eiusmod tempor</li></ul>',
    status: 2,
    active: true,
    count: 3,
    commentCount: 1,
    commentList: [
      {
        name: 'Lebron James ',
        initial: 'LB',
        comments: 'This is noted Ms. Anne Nielsen',
        persona: null,
        status: 2,
      },
    ],
    commentClick: false,
    attachmentList: [
      {
        fileName: 'Study Reference.docx',
        fileExtension: '.docx',
        fileType: 'file',
        icon: 'docx',
      },
    ],
  },
];

type TeahcersNotesProps = {
  user: UserProfile;
};

const TeachersNotes: React.FC<TeahcersNotesProps> = props => {
  const [newsFeedList, setnewsFeedList] = useState<any[] | []>([]);
  const [newsFeedData, setNewsFeedData] = useState(newsFeedsItem);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const heartHandler = (value: any, id: any) => {
    const updateData = [...newsFeedData];
    const index = updateData.findIndex(r => r.id === id);
    updateData[index].active = value;
    setNewsFeedData(updateData);
  };

  const commentHandler = (item: any, index: any) => {
    item.commentClick = !item.commentClick;
    const viewComment: any[] = [];
    if (item.commentClick) {
      item.commentList.forEach((item: any, i: any) => {
        viewComment.push(
          <div key={i}>
            {
              <CommentsItem
                persona={item.persona}
                initial={item.initial}
                comments={item.comments}
                status={item.status}
              />
            }
          </div>,
        );
      });
    }

    updateNewsFeeds(index, viewComment);
  };
  const likesHandler = () => {
    toggleHideDialog();
  };

  const updateNewsFeeds = (index: any, viewComment: any) => {
    const newsFeeds: any[] = [];
    newsFeedData.forEach((item, i) => {
      let divComment = '';

      if (i === index) {
        divComment = viewComment;
      }
      newsFeeds.push(
        <div key={i} className={classes.divnewFeeds}>
          <NewsFeeds item={item} />

          <Attachment item={item.attachmentList} />

          <Likes
            active={item.active}
            likesClick={likesHandler}
            heartHandler={heartHandler}
            itemId={item.id}
            count={item.count}
            commentCount={item.commentCount}
            clickComment={() => {
              commentHandler(item, i);
            }}
          />
          {divComment}
          <Comments item={item} user={props.user} />
        </div>,
      );
    });

    setnewsFeedList(newsFeeds);
  };

  useEffect(() => {
    const newsFeeds: any[] = [];
    newsFeedData.forEach((item, i) => {
      newsFeeds.push(
        <div key={i} className={classes.divnewFeeds}>
          <NewsFeeds item={item} />

          <Attachment item={item.attachmentList} />

          <Likes
            active={item.active}
            likesClick={likesHandler}
            heartHandler={heartHandler}
            itemId={item.id}
            count={item.count}
            commentCount={item.commentCount}
            clickComment={() => {
              commentHandler(item, i);
            }}
          />
          <Comments item={item} user={props.user} />
        </div>,
      );
    });

    setnewsFeedList(newsFeeds);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const newsFeeds: any[] = [];
    newsFeedData.forEach((item, i) => {
      newsFeeds.push(
        <div key={i} className={classes.divnewFeeds}>
          <NewsFeeds item={item} />

          <Attachment item={item.attachmentList} />

          <Likes
            active={item.active}
            likesClick={likesHandler}
            heartHandler={heartHandler}
            itemId={item.id}
            count={item.count}
            commentCount={item.commentCount}
            clickComment={() => {
              commentHandler(item, i);
            }}
          />
          <Comments item={item} user={props.user} />
        </div>,
      );
    });

    setnewsFeedList(newsFeeds);
  }, [newsFeedData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={'ms-Grid-row padT15 ' + classes.container}>
        <div className="ms-Grid-col ms-lg12 ">
          <div className="ms-Grid-row ">
            <div className={'ms-Grid-col ms-lg12 ' + classes.headerFilter}>
              <span>
                <FontIcon iconName="Sort" className={classes.cursor} />
              </span>
              <span className="padl10">
                {' '}
                {intl(LabelNames.dateCreated)} ({intl(LabelNames.latestoldest)})
              </span>
              <span className="padl10">
                <FontIcon iconName="ChevronDown" className={classes.cursor} />
              </span>
            </div>
          </div>
          <div className={'ms-Grid-row'}>
            <div className="ms-Grid-col ms-lg12">{newsFeedList}</div>
          </div>
        </div>
      </div>

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        modalProps={modelProps}>
        <div className={classes.likePerson}>
          <Persona
            {...{ imageUrl: pic }}
            text="Kat Larrson"
            size={PersonaSize.size24}
          />
        </div>
        <div className={classes.likePerson}>
          <Persona
            {...{ imageUrl: pic1 }}
            text="Bell Coco"
            size={PersonaSize.size24}
          />
        </div>
        <div className={classes.likePerson}>
          <Persona
            {...{ imageUrl: pic2 }}
            text="Zara King"
            size={PersonaSize.size24}
          />
        </div>
      </Dialog>
    </>
  );
};

export default TeachersNotes;
