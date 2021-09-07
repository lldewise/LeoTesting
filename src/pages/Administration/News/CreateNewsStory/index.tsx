import React, { Fragment, useState } from 'react';
import classes from './CreateNewsStory.module.scss';
import { LabelNames } from '../../../../util/constant';
import { intl } from '../../../../util/commonFunction';
import RightLayoutNewsStory from '../../../../components/layout/RightLayoutNewsStory/RightLayoutNewsStory';
import { useBoolean } from '@uifabric/react-hooks';
import CategoryModal from '../../../../components/adminANDteacher/News/CategoryModal/CategoryModal';
import NewsBannerModal from '../../../../components/adminANDteacher/News/NewsBannerModal/NewsBannerModal';
import ThumbnailModal from '../../../../components/adminANDteacher/News/ThumbnailModal/ThumbnailModal';
//import Breadcrumb from './../../../FluentUISample/commandsmenusandnavs/breadcrumb/breadcrumb';
import { ActionButton, Stack, IStackStyles } from '@fluentui/react';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import CreateNews from '../../../../components/adminANDteacher/News/CreateNews/CreateNews';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import apiPost from '../../../../services/apiPost';
import apiGet from '../../../../services/apiGet';
import DialogConfimation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import SmallThumbnailModal from './../../../../components/adminANDteacher/News/SmallThumbnail/SmallThumbnail';
import { useStore } from '../../../../store/store';
import { useHistory } from 'react-router-dom';
import logger from 'loglevel';
import { useAuthentication } from '../../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';

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

interface ICategoryMenu {
  id: number;
  classname: any;
  icon: string;
  title: string;
  description: string;
  active: boolean;
}

const CategoryMenu: ICategoryMenu[] = [
  {
    id: 1,
    classname: classes.boxActive,
    icon: 'Bank',
    title: intl(LabelNames.schoolnews),
    description: intl(LabelNames.categoryshoolnewdesc),
    active: true,
  },
  {
    id: 2,
    classname: classes.box,
    icon: 'SpecialEvent',
    title: intl(LabelNames.events),
    description: intl(LabelNames.categoryeventsdesc),
    active: false,
  },
  {
    id: 3,
    classname: classes.box,
    icon: 'Megaphone',
    title: intl(LabelNames.miscellaneous),
    description: intl(LabelNames.categorymiscellaneousdesc),
    active: false,
  },
];

const code = 'harvard';

const CreateNewsStory: React.FC = () => {
  const { principal } = useAuthentication();
  const [data] = useStore();
  const [imgProfile, setimgProfile] = useState<any | undefined>();
  const [bgImage, setBgImage] = useState(null);
  const [bgNewsImage, setNewsBgImage] = useState(null);
  const [categoryItem, setCategoryItem] = useState<number | null>();
  const [headline, setHeadline] = useState();
  const [abstract, setAbstract] = useState();
  const [richtext, setRichtext] = useState();
  const [featured, setFeatured] = useState(false);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [hideDialogDraft, { toggle: toggleHideDialogDraft }] = useBoolean(true);
  const [imgClass, setImageClass] = useState(classes.customBgImage);
  const [newsscale, setNewsScale] = useState(1);
  const [newsposition, setNewsPosition] = useState({ x: 0, y: 0 });

  const [thumbscale, setThumbScale] = useState(1);
  const [thumbposition, setThumbPosition] = useState({ x: 0, y: 0 });

  const [smallscale, setSmallScale] = useState(1);
  const [smallposition, setSmallPosition] = useState({ x: 0, y: 0 });

  const [small1scale, setSmall1Scale] = useState(1);
  const [small1position, setSmall1Position] = useState({ x: 0, y: 0 });
  const [publisheddate, setpubliseddate] = useState(null);
  const [archiveddate, setarchiveddate] = useState('');
  const [privacy, setPrivacy] = useState([
    {
      key: 'Everybody',
      name: 'Everybody',
    },
  ]);
  const [customurl, setcustomurl] = useState('');

  const history = useHistory();
  const [isModalOpenCat, { setTrue: showModalCat, setFalse: hideModalCat }] =
    useBoolean(true);
  const showModalCatHandler = () => {
    showModalCat();
  };

  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] =
    useBoolean(false);
  const showModalHandler = () => {
    showModal();
  };
  const showModalHandlerST = () => {
    showModalST();
  };

  const [isModalOpenST, { setTrue: showModalST, setFalse: hideModalST }] =
    useBoolean(false);
  const [
    isModalOpenNewsBanner,
    { setTrue: showModalNewsBanner, setFalse: hideModalNewsBanner },
  ] = useBoolean(false);
  const showModalNewsBannerHandler = () => {
    showModalNewsBanner();
  };

  const nonShrinkingStackItemStyles: IStackStyles = {
    root: {
      alignItems: 'right',
      display: 'flex',
      justifyContent: 'right',
      overflow: 'hidden',
    },
  };

  const items = [
    { text: 'News', key: 'News' },
    { text: 'Create New Story', key: 'NewStory' },
  ];

  const onFileChange = (event: any) => {
    setImageClass('');

    setimgProfile(event.target.files[0]);
    showModalNewsBanner();
  };

  const upload = () => {
    document.getElementById('selectImage')!.click();
  };

  const onPreviousHandler = () => {
    showModalNewsBanner();
    hideModal();
  };
  const onPreviousHandlerST = () => {
    showModal();
    hideModalST();
  };
  const categoryContinueHandler = (item: any) => {
    setCategoryItem(item.id);
    hideModalCat();
  };

  const onChangeRichText = (data: any) => {
    const item = data.srcElement.innerHTML;
    setRichtext(item);
  };

  const onChangeAbstract = (data: any) => {
    setAbstract(data);
  };

  const onChangeHeadline = (data: any) => {
    setHeadline(data);
  };

  const onSubmitHandler = (status: string) => {
    saveData(status);
  };

  const uploadImage = (formData: any, id: string, status: string) => {
    apiPost
      .post('/api/school/' + code + '/news/blob/' + id, formData, {
        headers: {
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(() => {
        gotoManageList(status, id);
      });
  };

  const callNewById = (id: string) => {
    apiGet.get(
      '/api/school/' +
        encodeURIComponent(data.userProfile.school) +
        '/news/' +
        id +
        '?clientId=' +
        data.userExternalUnique,
    );
  };

  const gotoManageList = (status: string, id: string) => {
    if (status === 'published') {
      toggleHideDialog();
    } else {
      toggleHideDialogDraft();
    }
    callNewById(id);
    history.push('list');
  };

  const saveData = (status: string) => {
    const newPrivacy: any[] = [];
    privacy.forEach(item => {
      newPrivacy.push(item.key);
    });
    let imageName: string = '';

    if (imgProfile !== undefined) {
      imageName = imgProfile.name;
    }

    const pdate = publisheddate !== null ? publisheddate : new Date();
    const NewsStoryData = {
      id: null,
      targetId: data.userProfile.school,
      authorId: data.userProfile.id,
      newsStatus: status,
      newsTitle: headline,
      newsCategory: categoryItem?.toString(),
      picture: imageName,
      publisheddate: pdate,
      archiveddate: archiveddate,
      customurl: customurl,
      privacy: newPrivacy,
      data: {
        description: abstract,
        content: richtext,
        featured: featured,
        imgBannerUrl: '',
        imgFeatureThumbUrl: '',
        imgSmallThumbUrl: '',
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
      .post('/api/school/' + code + '/news', NewsStoryData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-Id': uuidv4(),
          Authorization: `Bearer ${principal?.accessToken}`,
        },
      })
      .then(response => {
        if (imgProfile !== undefined) {
          const formData = new FormData();
          formData.append('image', imgProfile, imgProfile.name);
          uploadImage(formData, response.data, status);
        } else {
          gotoManageList(status, response.data);
        }
        // handle success
      })
      .catch(error => {
        // handle error
        logger.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  const ConfirmHandler = () => {
    onSubmitHandler('published');
  };
  const onPublishHandler = () => {
    if (!validateHandler()) {
      toggleHideDialog();
    }
  };

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
    if (!richtext) {
      error.richtext = errormessage;
      result = true;
    }

    error.trigger = true;
    setNewsValidation(error);
    return result;
  };

  const ConfirmDraftHandler = () => {
    onSubmitHandler('draft');
  };
  const onSaveDraftHandler = () => {
    toggleHideDialogDraft();
  };
  const categoryDataHandler = (data: any) => {};
  const publishDateHandler = (data: any) => {
    setpubliseddate(data.toString());
  };
  const archivedDateHandler = (data: any) => {
    setarchiveddate(data.toString());
  };
  const customizedurlHandler = (data: any) => {
    setcustomurl(data);
  };
  const featuredArticleHandler = (ev: any, data: any) => {
    setFeatured(data);
  };
  const privacyHandler = (data: any) => {
    setPrivacy(data);
  };

  const onFinishHandler = (
    scale: any,
    position: any,
    scale1: any,
    position1: any,
  ) => {
    setBgImage(bgNewsImage);
    setSmallScale(scale);
    setSmallPosition(position);

    setSmall1Scale(scale1);
    setSmall1Position(position1);

    hideModalST();
  };

  const newBannerContinueHandler = (scale: any, position: any, img: any) => {
    setNewsBgImage(img);
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
        hideModal={hideModalST}
        imgProfile={imgProfile}
        previous={onPreviousHandlerST}
        finish={onFinishHandler}
        position={smallposition}
        scale={smallscale}
        position1={small1position}
        isModalOpen={isModalOpenST}
      />

      <CategoryModal
        showModal={showModalCatHandler}
        isModalOpen={isModalOpenCat}
        hideModal={hideModalCat}
        continue={categoryContinueHandler}
        title={LabelNames.categorymodaltitle}
        subtitle={LabelNames.categorymodaltitle1}
        menu={CategoryMenu}
      />
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 ' + classes.borderbot}>
          <div className="ms-Grid-col ms-lg7">
            <Breadcrumb
              items={items}
              maxDisplayedItems={3}
              ariaLabel="Breadcrumb with items rendered as buttons"
              overflowAriaLabel="More links"
              className={classes.BreadcrumbContainer}
            />
          </div>
          <div className={'ms-Grid-col  ms-lg5  newsToolbar'}>
            <Stack horizontalAlign="end" horizontal>
              <Stack.Item disableShrink styles={nonShrinkingStackItemStyles}>
                <ActionButton
                  iconProps={{ iconName: 'redeye' }}
                  className={classes.bgcolor}>
                  Preview
                </ActionButton>
              </Stack.Item>
              <Stack.Item disableShrink styles={nonShrinkingStackItemStyles}>
                <ActionButton
                  iconProps={{ iconName: 'delete' }}
                  className={classes.bgcolor}>
                  Delete
                </ActionButton>
              </Stack.Item>
            </Stack>
          </div>
        </div>
      </div>
      <div className={'ms-Grid-row '}>
        <div className="ms-Grid-col ms-lg12 ">
          <div
            className={
              'ms-Grid-col ms-lg9  customScroll ' + classes.containerheight
            }>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-row ' + classes.customBgColor}>
                <div
                  className={
                    'ms-Grid-col ms-lg12 ' +
                    classes.custImageSize +
                    ' ' +
                    imgClass
                  }
                  style={
                    bgImage
                      ? {
                          backgroundImage: 'url(' + bgImage + ')',
                        }
                      : {}
                  }>
                  <div className="ms-Grid-col ms-lg12">
                    <div className="ms-Grid-row">
                      <Button
                        className={classes.customBtn}
                        onClick={upload}
                        buttonType={ButtonType.primary}>
                        <i
                          className={
                            'ms-Icon ms-Icon--Camera ' + classes.iconStyle
                          }
                          aria-hidden="true"
                        />
                        <span>Upload Photo</span>
                      </Button>
                      <input
                        type="file"
                        id="selectImage"
                        onChange={onFileChange}
                        className={classes.customBtnupload}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <br />
            </div>
            <CreateNews
              onChangeRichText={onChangeRichText}
              onChangeAbstract={onChangeAbstract}
              onChangeHeadline={onChangeHeadline}
              errorMessage={newsValidation}
            />
            <br />
          </div>
          <div className="ms-Grid-col ms-lg3">
            <RightLayoutNewsStory
              manageNewStories={null}
              categoryItem={categoryItem}
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

export default CreateNewsStory;
