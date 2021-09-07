import React, { Fragment, useState, useEffect } from 'react';
import classes from './EditNewsStory.module.scss';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
//import { LabelNames } from "../../../../util/constant";
//import { intl } from "../../../../util/commonFunction";
import RightLayoutNewsStory from '../../../../components/layout/RightLayoutNewsStory/RightLayoutNewsStory';
import { useBoolean } from '@uifabric/react-hooks';
import NewsBannerModal from '../../../../components/adminANDteacher/News/NewsBannerModal/NewsBannerModal';
import ThumbnailModal from '../../../../components/adminANDteacher/News/ThumbnailModal/ThumbnailModal';
//import Breadcrumb from './../../../FluentUISample/commandsmenusandnavs/breadcrumb/breadcrumb';
import { ActionButton, Stack, IStackStyles } from '@fluentui/react';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import EditNews from '../../../../components/adminANDteacher/News/EditNews/EditNews';
import { useStore } from '../../../../store/store';
import { DefaultButton } from 'office-ui-fabric-react';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import DialogConfimation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import apiPost from '../../../../services/apiPost';
import SmallThumbnailModal from './../../../../components/adminANDteacher/News/SmallThumbnail/SmallThumbnail';
import { useHistory } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import logger from 'loglevel';
import { useAuthentication } from '../../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';
import { INews } from '../../../../model/news';

const dialogContentPublish = {
  type: DialogType.normal,
  title: 'Confirmation',
  closeButtonAriaLabel: 'Close',
  subText: 'Publish this record?',
};
const dialogContentDraft = {
  type: DialogType.normal,
  title: 'Confirmation',
  closeButtonAriaLabel: 'Close',
  subText: 'Save this record?',
};

const EditNewsStory: React.FC = () => {
  const { principal } = useAuthentication();
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [hideDialogDraft, { toggle: toggleHideDialogDraft }] = useBoolean(true);
  const [data] = useStore();
  // eslint-disable-next-line
  const [ManageNewsStories, setItemList] = useState<INews | null>(
    data.manageNewsStories,
  );
  const [categoryItem, setCategoryItem] = useState<string | undefined>(
    ManageNewsStories?.category,
  );
  const [headline, setHeadline] = useState(data.manageNewsStories?.title);
  const [abstract, setAbstract] = useState(ManageNewsStories?.desc);
  const [richtext, setRichtext] = useState(ManageNewsStories?.content);
  const [featured, setFeatured] = useState(ManageNewsStories?.featured);
  const [imgClass, setImageClass] = useState(classes.customBgImage);
  const [newsscale, setNewsScale] = useState(
    Number(ManageNewsStories?.bannerscale),
  );

  const [newsposition, setNewsPosition] = useState({
    x: Number(ManageNewsStories?.bannerx),
    y: Number(ManageNewsStories?.bannery),
  });
  const [thumbscale, setThumbScale] = useState(1);
  const [thumbposition, setThumbPosition] = useState({ x: 0, y: 0 });

  const [smallscale, setSmallScale] = useState(1);
  const [smallposition, setSmallPosition] = useState({ x: 0, y: 0 });

  const [small1scale, setSmall1Scale] = useState(1);
  const [small1position, setSmall1Position] = useState({ x: 0, y: 0 });

  const [publisheddate, setpubliseddate] = useState<string | null>(null);
  const [archiveddate, setarchiveddate] = useState<string | null>(null);

  const [privacy, setPrivacy] = useState([
    {
      key: 'Everybody',
      name: 'Everybody',
    },
  ]);
  const [customurl, setcustomurl] = useState(ManageNewsStories?.customurl);
  const history = useHistory();
  const [imgProfile, setimgProfile] = useState<any | undefined>(
    ManageNewsStories?.img,
  );
  const [imgAvatar, setimgAvatar] = useState<any | undefined>(
    ManageNewsStories?.img,
  );
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const showModalHandler = () => {
    showModal();
  };
  const [isModalOpenST, { setTrue: showModalST, setFalse: hideModalST }] =
    useBoolean(false);
  const showModalHandlerST = () => {
    showModalST();
  };
  const onPreviousHandler = () => {
    showModalNewsBanner();
    hideModal();
  };
  const onPreviousHandlerST = () => {
    showModal();
    hideModalST();
  };

  const [
    isModalOpenNewsBanner,
    { setTrue: showModalNewsBanner, setFalse: hideModalNewsBanner },
  ] = useBoolean(false);

  // eslint-disable-next-line
  const [showCallout, { setTrue: onShowCallout, setFalse: onHideCallout }] =
    useBoolean(false);

  const nonShrinkingStackItemStyles: IStackStyles = {
    root: {
      alignItems: 'right',
      display: 'flex',
      justifyContent: 'right',
      overflow: 'hidden',
      color: '#6C35D4',
    },
  };

  const items = [
    { text: 'News', key: 'News' },
    { text: 'Edit News Story', key: 'EditNewsStory' },
  ];

  const onFileChange = (event: any) => {
    setImageClass('');
    setimgProfile(event.target.files[0]);
    showModalNewsBanner();
  };

  const onFileChangeEdit = (event: any) => {
    showModalNewsBanner();
  };

  const upload = () => {
    document.getElementById('selectImage')!.click();
  };

  const menuProps = {
    shouldFocusOnMount: true,
    items: [
      {
        key: 'uploadNewPhoto',
        text: 'Upload new photo',
        onClick: upload,
        iconProps: { iconName: 'Upload', style: { color: 'black' } },
      },
      {
        key: 'reposition',
        text: 'Reposition',
        onClick: onFileChangeEdit,
        iconProps: { iconName: 'PicturePosition', style: { color: 'black' } },
      },
      {
        key: 'remove',
        text: 'Remove',
        iconProps: { iconName: 'Delete', style: { color: 'black' } },
      },
    ],
  };

  const addIcon = { iconName: 'Camera' };

  const onChangeRichText = (value: any) => {
    const item = value.srcElement.innerHTML;
    setRichtext(item);
  };
  const onChangeAbstract = (value: any) => {
    setAbstract(value);
  };

  const onChangeHeadline = (value: any) => {
    setHeadline(value);
  };

  const onSaveDraftHandler = () => {
    toggleHideDialogDraft();
  };
  const categoryDataHandler = (value: any) => {
    setCategoryItem(value.key);
  };
  const publishDateHandler = (value: any) => {
    setpubliseddate(value.toString());
  };
  const archivedDateHandler = (value: any) => {
    setarchiveddate(value.toString());
  };
  const customizedurlHandler = (value: any) => {
    setcustomurl(value);
  };
  const featuredArticleHandler = (ev: any, value: any) => {
    setFeatured(value);
  };
  const privacyHandler = (value: any) => {
    setPrivacy(value);
  };

  const onPublishHandler = () => {
    if (!validateHandler()) {
      toggleHideDialog();
    }
  };

  const ConfirmHandler = () => {
    onSubmitHandler('published');
  };

  const onSubmitHandler = (status: string) => {
    saveData(status);
  };

  const uploadImage = (formData: any, id: string) => {
    apiPost.post(
      '/api/school/' + data.userProfile.school + '/news/blob/' + id,
      formData,
      {
        headers: {
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      },
    );
  };

  const ConfirmDraftHandler = () => {
    onSubmitHandler('draft');
  };

  const newBannerContinueHandler = (scale: any, position: any, img: any) => {
    hideModalNewsBanner();
    setNewsScale(scale);
    setNewsPosition(position);
    showModal();
  };

  const thumbnailContinueHandler = (scale: any, position: any) => {
    hideModal();
    setThumbScale(scale);
    setThumbPosition(position);
    showModalHandlerST();
  };

  const onFinishHandler = (
    scale: any,
    position: any,
    scale1: any,
    position1: any,
  ) => {
    setimgAvatar(imgProfile);
    setSmallScale(scale);
    setSmallPosition(position);
    setSmall1Scale(scale1);
    setSmall1Position(position1);
    hideModalST();
  };

  const saveData = (status: string) => {
    const newPrivacy: any[] = [];
    privacy.forEach(item => {
      newPrivacy.push(item.key);
    });
    let filename: any = null;
    if (ManageNewsStories?.img !== null) {
      filename = ManageNewsStories?.id.split('/')[1];
    }
    const pdate = publisheddate !== null ? publisheddate : new Date();
    const NewsStoryData = {
      id: ManageNewsStories?.id,
      targetId: data.userProfile.school,
      authorId: data.userProfile.id,
      newsTitle: headline,
      newsCategory: categoryItem?.toString(),
      newsStatus: status,
      picture: imgProfile !== null ? imgProfile?.name : filename,
      publisheddate: pdate,
      archiveddate: archiveddate,
      customurl: customurl,
      privacy: newPrivacy,

      data: {
        description: abstract,
        content: richtext,
        featured: featured,
        imgBannerUrl: filename,
        imgFeatureThumbUrl: filename,
        imgSmallThumbUrl: filename,
        image: [
          {
            banner: [
              {
                scale: newsscale.toString(),
                position: [
                  {
                    positionx: newsposition.x.toString(),
                    positiony: newsposition.y.toString(),
                  },
                ],
              },
            ],
            featured: [
              {
                scale: thumbscale.toString(),
                position: [
                  {
                    positionx: thumbposition.x.toString(),
                    positiony: thumbposition.y.toString(),
                  },
                ],
              },
            ],
            thumb1: [
              {
                scale: smallscale.toString(),
                position: [
                  {
                    positionx: smallposition.x.toString(),
                    positiony: smallposition.y.toString(),
                  },
                ],
              },
            ],
            thumb2: [
              {
                scale: small1scale.toString(),
                position: [
                  {
                    positionx: small1position.x.toString(),
                    positiony: small1position.y.toString(),
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    apiPost
      .post('/api/school/' + data.userProfile.school + '/news', NewsStoryData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(response => {
        if (imgProfile != null) {
          const formData = new FormData();
          formData.append('image', imgProfile, imgProfile.name);
          uploadImage(formData, response.data);
        }
      })
      .catch(error => {
        logger.log(error);
      })
      .then(() => {
        if (status === 'published') {
          toggleHideDialog();
        } else {
          toggleHideDialogDraft();
        }
        history.push('list');
      });
  };

  useEffect(() => {
    if (ManageNewsStories != null) {
      if (ManageNewsStories?.privacy !== undefined) {
        const privacyList = [];
        const privacySplit = ManageNewsStories.privacy;
        for (let i = 0; i < privacySplit.length; i++) {
          privacyList.push({
            key: privacySplit[i],
            name: privacySplit[i],
          });
        }
        setPrivacy(privacyList);
      }

      if (
        data.manageNewsStories.publishdate !== '' &&
        data.manageNewsStories.publishdate !== undefined
      ) {
        setpubliseddate(
          new Date(data.manageNewsStories.publishdate).toString(),
        );
      }
      if (
        data.manageNewsStories.archivedate !== '' &&
        data.manageNewsStories.archivedate !== undefined
      ) {
        setarchiveddate(
          new Date(data.manageNewsStories.archivedate).toString(),
        );
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [newsValidation, setNewsValidation] = useState();

  const validateHandler = () => {
    let result = false;
    const error: any = {
      headline: '',
      abstract: '',
      richtext: '',
      privacy: '',
      customurl: '',
      trigger: false,
    };
    const errormessage = 'Please input required fields';
    if (!headline) {
      error.headline = errormessage;
      result = true;
    }
    if (!abstract) {
      error.abstract = errormessage;
      result = true;
    }
    if (!richtext) {
      error.richtext = errormessage;
      result = true;
    }
    if (!customurl) {
      error.customurl = errormessage;
      result = true;
    }
    if (privacy.length === 0) {
      error.privacy = errormessage;
      result = true;
    }
    error.trigger = true;
    setNewsValidation(error);
    return result;
  };

  return (
    <>
      <DialogConfimation
        dialogContentProps={dialogContentPublish}
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
        onConfirm={ConfirmHandler}
        text={null}
        spinner={false}
      />
      <DialogConfimation
        dialogContentProps={dialogContentDraft}
        hideDialog={hideDialogDraft}
        toggleHideDialog={toggleHideDialogDraft}
        onConfirm={ConfirmDraftHandler}
        text={null}
        spinner={false}
      />

      <NewsBannerModal
        isModalOpen={isModalOpenNewsBanner}
        hideModal={hideModalNewsBanner}
        imgProfile={imgProfile}
        continue={newBannerContinueHandler}
        position={newsposition}
        scale={newsscale}
      />

      <ThumbnailModal
        isModalOpen={isModalOpen}
        hideModal={hideModal}
        imgProfile={imgProfile}
        previous={onPreviousHandler}
        continue={thumbnailContinueHandler}
        position={thumbposition}
        scale={thumbscale}
      />

      <SmallThumbnailModal
        isModalOpen={isModalOpenST}
        hideModal={hideModalST}
        imgProfile={imgProfile}
        previous={onPreviousHandlerST}
        finish={onFinishHandler}
        position={smallposition}
        scale={smallscale}
        position1={small1position}
      />

      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 ' + classes.borderbot}>
          <div className="ms-Grid-col ms-lg8">
            <Breadcrumb
              items={items}
              maxDisplayedItems={3}
              ariaLabel="Breadcrumb with items rendered as buttons"
              overflowAriaLabel="More links"
              className={classes.BreadcrumbContainer}
            />
          </div>
          <div className={'ms-Grid-col  ms-lg4'}>
            <Stack horizontalAlign="end" horizontal>
              <Stack.Item disableShrink styles={nonShrinkingStackItemStyles}>
                <ActionButton allowDisabledFocus>
                  <FontIcon iconName="redeye" className={classes.iconSize} />
                  <span className={'padl10'}> </span> Preview
                </ActionButton>
              </Stack.Item>
              <Stack.Item disableShrink styles={nonShrinkingStackItemStyles}>
                <ActionButton allowDisabledFocus>
                  <FontIcon iconName="delete" className={classes.iconSize} />{' '}
                  <span className={'padl10'}> </span> Delete
                </ActionButton>
              </Stack.Item>
            </Stack>
          </div>
        </div>
      </div>
      <div className="ms-Grid-row ">
        <div className="ms-Grid-col ms-lg12 container">
          <div
            className={
              'ms-Grid-col ms-lg9 customScroll ' + classes.containerheight
            }>
            <div className="ms-Grid-row">
              <div className={'ms-Grid-row ' + classes.customBgColor}>
                <div
                  className={
                    'ms-Grid-col ms-lg12 ' +
                    classes.custImageSize +
                    ' ' +
                    imgClass
                  }>
                  <div className={'avatarEdit ' + classes.imagecontainer}>
                    <AvatarEditor
                      image={imgAvatar}
                      scale={Number(newsscale)}
                      width={950}
                      height={350}
                      border={0}
                      position={newsposition}
                    />
                    <div className={classes.after} />
                  </div>
                </div>
                <div className="ms-Grid-col ms-lg12 editPhoto">
                  <div className="ms-Grid-row">
                    <DefaultButton
                      text="Edit Photo"
                      menuProps={menuProps}
                      iconProps={addIcon}
                      className={classes.customBtn}
                    />
                    {showCallout && (
                      <Callout setInitialFocus onDismiss={onHideCallout}>
                        <DefaultButton
                          onClick={onHideCallout}
                          text="Hello Popup"
                        />
                      </Callout>
                    )}

                    <input
                      type="file"
                      id="selectImage"
                      onChange={onFileChange}
                      className={classes.customBtnupload}
                    />
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
            </div>
            <EditNews
              onChangeRichText={onChangeRichText}
              onChangeAbstract={onChangeAbstract}
              onChangeHeadline={onChangeHeadline}
              headline={headline}
              abstract={abstract}
              categoryItem={categoryItem}
              content={ManageNewsStories?.content}
              errorMessage={newsValidation}
            />
          </div>
          <div className="ms-Grid-col ms-lg3">
            <RightLayoutNewsStory
              manageNewStories={ManageNewsStories}
              categoryItem={Number(ManageNewsStories?.category)}
              categoryData={categoryDataHandler}
              onSaveDraft={onSaveDraftHandler}
              onPublish={onPublishHandler}
              publishDate={publishDateHandler}
              archivedDate={archivedDateHandler}
              customizedurl={customizedurlHandler}
              featuredArticle={featuredArticleHandler}
              privacy={privacyHandler}
              errorMessage={newsValidation}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNewsStory;
