import React, { Fragment, useEffect, useState } from 'react';
import pic1 from '../../../../assets/images/persona/helle.png';
import NewsFeeds from '../../../../components/news/NewsFeeds/NewsFeeds';
import classes from './TeachersNotesDetails.module.scss';
import logger from 'loglevel';
import { UserProfile } from '../../../../types/store/users';

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
    count: 2,
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
        fileName: 'Study Reference.docx',
        fileExtension: '.docx',
        fileType: 'file',
        icon: 'docx',
        src: '',
      },
      {
        fileName: 'Study Reference.pptx',
        fileExtension: '.pptx',
        fileType: 'file',
        icon: 'pptx',
        src: '',
      },
      {
        fileName: 'Study Reference.xlsx',
        fileExtension: '.xlsx',
        fileType: 'file',
        icon: 'xlsx',
        src: '',
      },
    ],
  },
];

type TeachersNotesDetails = {
  user: UserProfile;
};
const TeachersNotesDetails: React.FC<TeachersNotesDetails> = props => {
  const [newsFeedList, setnewsFeedList] = useState<any[] | []>([]);
  useEffect(() => {
    const newsFeeds: any[] = [];
    newsFeedsItem.forEach((item, i) => {
      logger.log(item.attachmentList);
      newsFeeds.push(
        <div key={i} className={classes.divnewFeeds}>
          <NewsFeeds item={item} />
        </div>,
      );
    });

    setnewsFeedList(newsFeeds);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={'ms-Grid-row padT40 ' + classes.container}>
        <div className="ms-Grid-col ms-lg12">{newsFeedList}</div>
      </div>
    </>
  );
};

export default TeachersNotesDetails;
