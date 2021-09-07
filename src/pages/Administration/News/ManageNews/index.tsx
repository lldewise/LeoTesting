import React, { Fragment, useState, useEffect, useRef } from 'react';
import classes from './ManageNews.module.scss';
import NewsStories from '../../../../components/adminANDteacher/News/ManageNews/NewsStories/NewsStories';
import { useStore } from '../../../../store/store';
import { useBoolean } from '@uifabric/react-hooks';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { FontIcon, IColumn } from 'office-ui-fabric-react';
import { UPDATEMANAGESTORIES } from '../../../../store/AdminAndTeacherStore/News/newsAction';
import { useHistory } from 'react-router-dom';
import apiGet from '../../../../services/apiGet';
import apiPost from '../../../../services/apiPost';
import moment from 'moment';
import DialogConfimation from '../../../../components/userInterface/DialogConfirmation/DialogConfirmation';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import logger from 'loglevel';
import { useAuthentication } from '../../../../util/context/authentication';
import { v4 as uuidv4 } from 'uuid';
import { INews } from '../../../../model/news';

const dialogContentPublish = {
  type: DialogType.normal,
  title: 'Confirmation',
  closeButtonAriaLabel: 'Cancel',
  subText: 'Are you sure you want to publish this stories?',
};

const dialogContentArchived = {
  type: DialogType.normal,
  title: 'Confirmation',
  closeButtonAriaLabel: 'Cancel',
  subText: 'Are you sure you want to archive this stories?',
};

const dialogDraftDelete = {
  type: DialogType.normal,
  title: 'Confirmation',
  closeButtonAriaLabel: 'Close',
  subText: 'Delete this record?',
};

const dialogContentRePublish = {
  type: DialogType.normal,
  title: 'Confirmation',
  closeButtonAriaLabel: 'Cancel',
  subText: 'Are you sure you want to re-publish this stories?',
};

interface IMargin {
  marginTop: string;
  marginLeft: string;
}

const ManageNews: React.FC = () => {
  const { principal } = useAuthentication();
  const [data, dispatch] = useStore();
  const [storieslist, setItemList] = useState<INews[] | []>(
    data.adminNewsStories,
  );
  const [storiesdraftlist, setDraftItemList] = useState<INews[] | []>(
    data.adminNewsDrafts,
  );
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const [menucss, setMenucss] = useState<IMargin | null>();
  const [calloutdiv, setCalloutdiv] = useState<JSX.Element | null>();
  const [hideDialogArchived, { toggle: toggleHideDialogArchived }] =
    useBoolean(true);
  const [hideDialogPublish, { toggle: toggleHideDialogPublish }] =
    useBoolean(true);
  const [hideDialogRePublish, { toggle: toggleHideDialogRePublish }] =
    useBoolean(true);
  const [hideDraftDialog, { toggle: toggleHideDraftDialog }] = useBoolean(true);
  const [draftItem, setDraftItem] = useState<any | null>();

  const selectedNews = useRef<INews | null>(null);
  const history = useHistory();
  let status: string = '';
  let newsCategory: string = '';

  useEffect(() => {
    dispatch('UPDATE_NAVIGATION', 51);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDraftItemList(data.adminNewsDrafts);
  }, [data.adminNewsDrafts]);

  useEffect(() => {
    setItemList(data.adminNewsStories);
  }, [data.adminNewsStories]);

  const republishHandleClick = (id: string) => {
    toggleHideDialogRePublish();
    const updatedData = storieslist.filter((a: any) => a.id === id);
    selectedNews.current = updatedData[0];
    //setRePublishData(updatedData);
  };

  const archivedHandleClick = (id: string) => {
    toggleHideDialogArchived();
    const updatedData = storieslist.filter((a: any) => a.id === id);
    selectedNews.current = updatedData[0];
  };

  const publishHandleClick = (id: string) => {
    toggleHideDialogPublish();
    const updatedData = storieslist.filter((a: any) => a.id === id);
    selectedNews.current = updatedData[0];
  };

  const ConfirmArchivedHandler = () => {
    saveData('archived', selectedNews.current);
  };

  const ConfirmPublishHandler = () => {
    saveData('published', selectedNews.current);
  };

  const ConfirmRePublishHandler = () => {
    toggleHideDialogRePublish();
    dispatch(UPDATEMANAGESTORIES, selectedNews.current);
    history.push('editnewsstory');
  };

  const setFeaturedNewsStory = (itemList: INews[]) => {
    const newData: any = [];
    itemList.forEach(a => {
      const filename = a.img.split(/[\\/]/).pop();
      const list = {
        id: a.id,
        targetId: data.userProfile.school,
        authorId: 'user/jeff.turing',
        newsTitle: a.title,
        newsCategory: a.category.toString(),
        newsStatus: a.status,
        data: {
          description: a.desc,
          content: a.content,
          featured: a.featured,
          imgBannerUrl: filename,
          image: [
            {
              banner: [
                {
                  scale: a.bannerscale.toString(),
                  position: [
                    {
                      positionx: a.bannerx.toString(),
                      positiony: a.bannery.toString(),
                    },
                  ],
                },
              ],
              featured: [
                {
                  scale: a.featuredscale.toString(),
                  position: [
                    {
                      positionx: a.bannerx.toString(),
                      positiony: a.bannery.toString(),
                    },
                  ],
                },
              ],
              thumb1: [
                {
                  scale: a.thumb1scale.toString(),
                  position: [
                    {
                      positionx: a.bannerx.toString(),
                      positiony: a.bannery.toString(),
                    },
                  ],
                },
              ],
              thumb2: [
                {
                  scale: a.thumb2scale.toString(),
                  position: [
                    {
                      positionx: a.bannerx.toString(),
                      positiony: a.bannery.toString(),
                    },
                  ],
                },
              ],
            },
          ],
        },
      };
      newData.push(list);
    });

    const p = {
      entity: encodeURIComponent(data.userProfile.school),
    };

    apiPost
      .post(
        '/api/school/' + data.userProfile.school + '/news/featured',
        newData,
        {
          params: p,
          headers: {
            'Content-Type': 'application/json',
            'X-Correlation-Id': uuidv4(),
            Authorization: `Bearer ${principal?.accessToken}`,
          },
        },
      )
      .then(res => {});
  };

  const saveData = (status: any, options: INews | null) => {
    let newData: INews | null = options;
    let archivedDate =
      status === 'archived' ? new Date() : newData?.archivedate;
    const NewsStoryData = {
      id: newData?.id,
      targetId: data.userProfile.school,
      authorId: data.userProfile.id,
      newsStatus: status,
      newsTitle: newData?.title,
      newsCategory: newData?.category.toString(),
      picture: newData?.id,
      publisheddate: newData?.publishdate,
      archiveddate: archivedDate,
      customurl: newData?.customurl,
      privacy: newData?.privacy,
      data: {
        description: newData?.desc,
        content: newData?.content,
        featured: newData?.featured,
        image: [
          {
            banner: [
              {
                scale: newData?.bannerscale.toString(),
                position: [
                  {
                    positionx: newData?.bannerx.toString(),
                    positiony: newData?.bannery.toString(),
                  },
                ],
              },
            ],
            featured: [
              {
                scale: newData?.featuredscale.toString(),
                position: [
                  {
                    positionx: newData?.bannerx.toString(),
                    positiony: newData?.bannery.toString(),
                  },
                ],
              },
            ],
            thumb1: [
              {
                scale: newData?.thumb1scale.toString(),
                position: [
                  {
                    positionx: newData?.bannerx.toString(),
                    positiony: newData?.bannery.toString(),
                  },
                ],
              },
            ],
            thumb2: [
              {
                scale: newData?.thumb2scale.toString(),
                position: [
                  {
                    positionx: newData?.bannerx.toString(),
                    positiony: newData?.bannery.toString(),
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
        if (status === 'published') {
          toggleHideDialogPublish();
        } else if (status === 'archived') {
          toggleHideDialogArchived();
        }
        // handle success
      })
      .catch(error => {
        // handle error
      });
  };

  // News Stories
  const calloutHandler = (data: any, item: any) => {
    setMenucss({
      marginTop: data.clientY + 'px',
      marginLeft: data.clientX - 95 + 'px',
    });

    if (item.status === 'tobepublish') {
      setCalloutdiv(
        <div>
          <div
            className={classes.calloutbtn}
            onClick={() => publishHandleClick(item.id)}>
            Publish
          </div>
          <div
            className={classes.calloutbtn}
            onClick={() => archivedHandleClick(item.id)}>
            Archived
          </div>
        </div>,
      );
    }
    if (item.status === 'published') {
      setCalloutdiv(
        <div>
          <div
            className={classes.calloutbtn}
            onClick={() => archivedHandleClick(item.id)}>
            Archived
          </div>
        </div>,
      );
    }
    if (item.status === 'archived') {
      setCalloutdiv(
        <div>
          <div
            className={classes.calloutbtn}
            onClick={() => republishHandleClick(item.id)}>
            Re-publish
          </div>
        </div>,
      );
    }
    toggleIsCalloutVisible();
  };

  const onSearchHandler = (ev: any, text: any) => {
    const updateData = [...data.adminNewsStories];
    const newdata = updateData.filter(
      i =>
        i.title.toLowerCase().indexOf(text) > -1 ||
        i.desc.toLowerCase().indexOf(text) > -1,
    );
    const onSearch = text ? newdata : updateData;
    setItemList(onSearch);
  };

  const _onColumnClick = (ev: any, column: IColumn) => {
    const newColumns: IColumn[] = _columns.slice();
    const currColumn: IColumn = newColumns.filter(
      currCol => column.key === currCol.key,
    )[0];
    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      storieslist,
      currColumn.fieldName!,
      currColumn.isSortedDescending,
    );
    setItemList(newItems);
  };

  const featuredHandler = (item: INews) => {
    const updateData = [...data.adminNewsStories];
    const toUpdate: INews[] = [];
    const newlist: INews[] = [];
    updateData.forEach((i: INews) => {
      if (i.featured === true) {
        i.featured = false;
        toUpdate.push(i);
      }
      if (i.id === item.id) {
        i.featured = true;
        toUpdate.push(i);
      }
      newlist.push(i);
    });

    const draft = [...data.adminNewsDrafts];
    draft.forEach(i => {
      newlist.push(i);
    });

    setItemList(updateData);
    setFeaturedNewsStory(toUpdate);
  };
  const _columns: IColumn[] = [
    {
      key: '0',
      name: 'Featured',
      fieldName: '',
      minWidth: 20,
      maxWidth: 60,
      onRender: item => {
        let wrapper: any = '';
        if (item.featured) {
          wrapper = (
            <FontIcon
              iconName="FavoriteStarFill"
              className={classes.favStyleCheck}
            />
          );
        } else {
          wrapper = (
            <FontIcon
              onClick={() => {
                featuredHandler(item);
              }}
              iconName="FavoriteStar"
              className={classes.favStyle}
            />
          );
        }
        return wrapper;
      },
    },
    {
      key: '1',
      name: '',
      fieldName: '',
      minWidth: 20,
      maxWidth: 50,
      onRender: item => {
        return (
          <div>
            <img
              src={item.img}
              alt={item.img}
              className={classes.img}
              onClick={() => {
                _onItemInvoked(item);
              }}
            />
          </div>
        );
      },
    },
    {
      key: '2',
      name: 'Story',
      fieldName: '',
      minWidth: 20,
      maxWidth: 300,
      onColumnClick: _onColumnClick,

      onRender: item => {
        return (
          <div
            className={classes.itemContent}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            <div className={classes.itemContentTitle}>{item.title}</div>
            <div> {item.desc}</div>
          </div>
        );
      },
    },
    {
      key: '3',
      name: 'Category',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClick,
      onRender: item => {
        if (item.category === '1') {
          newsCategory = 'School News';
        } else if (item.category === '2') {
          newsCategory = 'Events';
        } else if (item.category === '3') {
          newsCategory = 'Miscellaneous';
        }
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {newsCategory}
          </div>
        );
      },
    },
    {
      key: '4',
      name: 'Created Date',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClick,
      onRender: item => {
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {moment(item.createddate).format('MMM DD, YYYY')}
          </div>
        );
      },
    },
    {
      key: '5',
      name: 'Publish Date',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClick,
      onRender: item => {
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {moment(item.publishdate).format('MMM DD, YYYY')}
          </div>
        );
      },
    },
    {
      key: '6',
      name: 'Archive Date',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClick,
      onRender: item => {
        let archivedDate = null;
        archivedDate = item.archivedate;

        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {checkValue(archivedDate)}
          </div>
        );
      },
    },
    {
      key: '7',
      name: 'Author',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClick,
      onRender: item => {
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {item.author}
          </div>
        );
      },
    },
    {
      key: '8',
      name: 'Status',
      fieldName: '',
      minWidth: 20,
      maxWidth: 70,
      onRender: (item: INews) => {
        var status: any = '';
        if (item.status === 'tobepublish') {
          status = (
            <label className={classes.statusToBePublished}>To be publish</label>
          );
        } else if (item.status === 'published') {
          status = <label className={classes.statusPublished}>Published</label>;
        } else if (item.status === 'archived') {
          status = <label className={classes.statusArchived}>Archived</label>;
        }
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {status}
          </div>
        );
      },
    },
    {
      key: '9',
      name: '',
      fieldName: '',
      minWidth: 20,
      maxWidth: 20,
      onRender: item => {
        return (
          <div
            className={classes.itemSingle}
            onClick={data => {
              calloutHandler(data, item);
            }}>
            <FontIcon className={classes.fontIcon} iconName="MoreVertical" />
          </div>
        );
      },
    },
  ];
  const checkValue = (value: any) => {
    return value ? moment(value).format('MMM DD, YYYY') : '_';
  };

  /// News Stories

  /// News Draft

  const onSearchHandlerDrafts = (ev: any, text: any) => {
    const updateData = [...data.adminNewsDrafts];
    const onSearch = text
      ? updateData.filter(i => i.title.toLowerCase().indexOf(text) > -1)
      : updateData;
    setDraftItemList(onSearch);
  };
  const _onColumnClickDrafts = (ev: any, column: IColumn) => {
    const newColumns: IColumn[] = _columns.slice();
    const currColumn: IColumn = newColumns.filter(
      currCol => column.key === currCol.key,
    )[0];
    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      storiesdraftlist,
      currColumn.fieldName!,
      currColumn.isSortedDescending,
    );
    setDraftItemList(newItems);
  };

  const draftDeleteHandler = (item: any) => {
    setDraftItem(item);
    toggleHideDraftDialog();
  };

  const _columnsNewsDraft = [
    {
      key: '0',
      name: '',
      fieldName: '',
      minWidth: 60,
      maxWidth: 60,
      onRender: (item: INews) => {
        return (
          <div onClick={() => draftDeleteHandler(item)}>
            <i
              className={'ms-Icon ms-Icon--Delete ' + classes.delstyle}
              aria-hidden="true"
            />
          </div>
        );
      },
    },
    {
      key: '1',
      name: '',
      fieldName: '',
      minWidth: 50,
      maxWidth: 50,
      onRender: (item: INews) => {
        return (
          <div>
            <img
              src={item.img}
              alt={item.img}
              className={classes.img}
              onClick={() => {
                _onItemInvoked(item);
              }}
            />
          </div>
        );
      },
    },
    {
      key: '2',
      name: 'Story',
      fieldName: '',
      minWidth: 160,
      maxWidth: 300,
      onColumnClick: _onColumnClickDrafts,
      onRender: (item: INews) => {
        return (
          <div
            className={classes.itemContent}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            <div className={classes.itemContentTitle}>{item.title}</div>
            <div> {item.desc}</div>
          </div>
        );
      },
    },
    {
      key: '3',
      name: 'Category',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClickDrafts,
      onRender: (item: INews) => {
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {item.category}
          </div>
        );
      },
    },
    {
      key: '4',
      name: 'Created on',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClickDrafts,
      onRender: (item: INews) => {
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {moment(item.createddate).format('MMM DD, YYYY')}
          </div>
        );
      },
    },
    {
      key: '5',
      name: 'Last Modified on',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClickDrafts,
      onRender: (item: INews) => {
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {moment(item.publishdate).format('MMM DD, YYYY')}
          </div>
        );
      },
    },
    {
      key: '6',
      name: 'Published On',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClickDrafts,
      onRender: (item: INews) => {
        return (
          <div className={classes.itemSingle}>
            {checkValue(item.publishdate)}
          </div>
        );
      },
    },
    {
      key: '7',
      name: 'Archive on',
      fieldName: '',
      minWidth: 20,
      maxWidth: 100,
      onColumnClick: _onColumnClickDrafts,
      onRender: (item: INews) => {
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {checkValue(item.archivedate)}
          </div>
        );
      },
    },
    {
      key: '8',
      name: 'Author',
      fieldName: '',
      minWidth: 20,
      maxWidth: 70,
      onRender: (item: INews) => {
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {item.author}
          </div>
        );
      },
    },
    {
      key: '9',
      name: 'Status',
      fieldName: '',
      minWidth: 20,
      maxWidth: 70,
      onRender: (item: INews) => {
        const stat = 'Draft';
        return (
          <div
            className={classes.itemSingle}
            onClick={() => {
              _onItemInvoked(item);
            }}>
            {stat}
          </div>
        );
      },
    },
  ];

  const _onItemInvoked = (item: INews) => {
    dispatch(UPDATEMANAGESTORIES, item);
    history.push('editnewsstory');
  };

  /// News Draft

  const ConfirmDraftHandler = () => {
    apiGet
      .get(
        '/api/school/' +
          data.userProfile.school +
          '/news/' +
          draftItem.id.split('/')[1],
      )
      .then(response => {
        apiPost
          .delete(
            '/api/school/' +
              data.userProfile.school +
              '/news/' +
              draftItem.id.split('/')[1],
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Correlation-Id': uuidv4(),
                Authorization: `Bearer ${principal?.accessToken}`,
              },
            },
          )
          .then(response => {
            // handle success
          })
          .catch(error => {
            // handle error
            logger.log(error);
          })
          .then(() => {
            toggleHideDraftDialog();
            // always executed
          });
      });
  };

  // eslint-disable-next-line
  const nonShrinkingStackItemStyles = {
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
    { text: 'Manage News', key: 'ManageNews' },
  ];

  const gotoCreateNewsStory = () => {
    history.push('./create');
  };

  return (
    <>
      <DialogConfimation
        dialogContentProps={dialogDraftDelete}
        hideDialog={hideDraftDialog}
        toggleHideDialog={toggleHideDraftDialog}
        onConfirm={ConfirmDraftHandler}
        text={null}
        spinner={false}
      />
      <div className={'ms-Grid-row ' + classes.dashboard}>
        <div className="ms-Grid-col ms-lg12 container">
          <div className={'ms-Grid-col ms-lg12 ' + classes.borderbot}>
            <div className="ms-Grid-col ms-lg10">
              <Breadcrumb
                items={items}
                maxDisplayedItems={3}
                ariaLabel="Breadcrumb with items rendered as buttons"
                overflowAriaLabel="More links"
                className={classes.BreadcrumbContainer}
              />
            </div>
            <div
              className={'ms-Grid-col  ms-lg2 ' + classes.createNewStoryDiv}
              onClick={gotoCreateNewsStory}>
              <i
                className={'ms-Icon ms-Icon--CircleAddition ' + classes.icon}
                aria-hidden="true"
              />
              <label className={classes.createNewStory}>Create New Story</label>
            </div>
          </div>

          <div className="fullContainer customScroll">
            <Pivot
              aria-label="Basic Pivot Example"
              className={classes.newsList}>
              <PivotItem headerText="News Stories">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-lg12  ">
                    <div className={'ms-Grid-col ms-lg3 ' + classes.searchbox}>
                      <SearchBox
                        placeholder="Search"
                        onChange={(ev, value) => {
                          onSearchHandler(ev, value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-lg12">
                    <NewsStories
                      itemlist={storieslist}
                      isCalloutVisible={isCalloutVisible}
                      menucss={menucss}
                      calloutdiv={calloutdiv}
                      toggleIsCalloutVisible={toggleIsCalloutVisible}
                      _columns={_columns}
                      //_onItemInvoked={_onItemInvoked}
                    />
                  </div>
                </div>
                <DialogConfimation
                  dialogContentProps={dialogContentArchived}
                  hideDialog={hideDialogArchived}
                  toggleHideDialog={toggleHideDialogArchived}
                  onConfirm={ConfirmArchivedHandler}
                  text={null}
                  spinner={false}
                />
                <DialogConfimation
                  dialogContentProps={dialogContentPublish}
                  hideDialog={hideDialogPublish}
                  toggleHideDialog={toggleHideDialogPublish}
                  onConfirm={ConfirmPublishHandler}
                  text={null}
                  spinner={false}
                />
                <DialogConfimation
                  dialogContentProps={dialogContentRePublish}
                  hideDialog={hideDialogRePublish}
                  toggleHideDialog={toggleHideDialogRePublish}
                  onConfirm={ConfirmRePublishHandler}
                  text="Ok"
                  spinner={false}
                />
              </PivotItem>
              <PivotItem headerText="Draft">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-lg12  ">
                    <div className={'ms-Grid-col ms-lg3 ' + classes.searchbox}>
                      <SearchBox
                        placeholder="Search"
                        onChange={(ev, value) =>
                          onSearchHandlerDrafts(ev, value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-lg12">
                    <NewsStories
                      itemlist={storiesdraftlist}
                      isCalloutVisible={isCalloutVisible}
                      menucss={menucss}
                      calloutdiv={calloutdiv}
                      toggleIsCalloutVisible={toggleIsCalloutVisible}
                      _columns={_columnsNewsDraft}
                    />
                  </div>
                </div>
              </PivotItem>
            </Pivot>
          </div>
        </div>
      </div>
    </>
  );
};

function _copyAndSort<T>(
  items: T[],
  columnKey: string,
  isSortedDescending?: boolean,
): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
    );
}

export default ManageNews;
