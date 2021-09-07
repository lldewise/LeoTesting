import { initStore } from '../../store';
// import pic1 from '../../../assets/images/news/news1.png'
// import pic2 from '../../../assets/images/news/news2.png'
// import pic3 from '../../../assets/images/news/news3.png'
import { CheckExist } from '../../../util/compareData';
import { adminNewsStoriesInitialState } from '../../storeInitialStates/adminAndTeacher/news';
import { AdminNewsStoriesState } from '../../../types/store/adminAndTeacher/news';

const initialState: AdminNewsStoriesState = adminNewsStoriesInitialState;

const configureStore = () => {
  const actions = {
    GETNEWSSTORIESLIST: (curState: AdminNewsStoriesState, data: any) => {
      const updatedData = [...curState.adminNewsStories];
      try {
        data.forEach((elem: any) => {
          const a = elem[1][1];
          const newData = a['news/data'];
          const image = a['news/data'].image;
          const meta = a._meta;
          const txt_time = meta !== undefined ? a._meta['tx-time'] : new Date();
          let imgPath = image.imgurl;
          const id = a.id !== undefined ? a.id : a['crux.db/id'];
          if (imgPath !== undefined && imgPath !== '') {
            imgPath =
              'https://stornewsapi.blob.core.windows.net/images/' + imgPath;
          } else {
            imgPath = null;
          }

          const item = {
            featured:
              Boolean(newData.featured) === true &&
              newData.featured.toString() === 'True'
                ? true
                : false,
            img: imgPath,
            title: a['news/title'],
            desc: newData.description,
            category: a['news/category'],
            id: id,
            createddate: txt_time,
            publishdate: newData.publisheddate,
            archivedate: newData.archiveddate,
            customurl: newData.customurl,
            author: a['id/author'],
            statusid: 2,
            status: a['news/status'],
            content: newData.content,
            bannerscale: image.banner[2],
            featuredscale: image.featured[2],
            thumb1scale: image['thumb-1'][2],
            thumb2scale: image['thumb-2'][2],
            bannerx: image.banner[0][0],
            bannery: image.banner[0][1],
            featuredx: image.featured[0][0],
            featuredy: image.featured[0][1],
            thumb1x: image['thumb-1'][0][0],
            thumb1y: image['thumb-1'][0][1],
            thumb2x: image['thumb-2'][0][0],
            thumb2y: image['thumb-2'][0][1],
            privacy: newData.privacy,
          };
          const index = CheckExist(id, updatedData);
          if (index <= -1) {
            updatedData.push(item);
          } else {
            updatedData[index] = item;
          }
        });
      } catch (ex) {}
      return { adminNewsStories: updatedData };
    },
    UPDATEMANAGESTORIES: (curState: AdminNewsStoriesState, data: any) => {
      return { ManageNewsStories: data };
    },
  };

  initStore(actions, initialState);
};
export default configureStore;
