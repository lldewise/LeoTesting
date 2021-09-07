import { initStore } from '../../store';
import { CheckExist } from '../../../util/compareData';
import pic2 from '../../../assets/images/news/news2.png';
import { adminNewsInitialState } from '../../storeInitialStates/adminAndTeacher/news';
import { AdminNewsState } from '../../../types/store/adminAndTeacher/news';

const initialState: AdminNewsState = adminNewsInitialState;

const configureStore = () => {
  const actions = {
    GETPUBLISHEDREGULARNEWSLIST: (curState: AdminNewsState, data: any) => {
      const updatedData = [...curState.adminRegularNews];
      try {
        data.forEach((elem: any) => {
          const a = elem[1][1];
          const newData = a['news/data'];
          const meta = a._meta;
          const txt_time = meta !== undefined ? a._meta['tx-time'] : new Date();
          const image = a['news/data'].image;
          const imgPath = image.imgurl;
          const id = a.id !== undefined ? a.id : a['crux.db/id'];

          const item = {
            name: 'Kristen Moller',
            initial: 'KM',
            featured: newData.featured,
            img: 'https://stornewsapi.blob.core.windows.net/images/' + imgPath,
            title: a['news/title'],
            category: a['news/category'],
            icon: 'Bank',
            persona: pic2,
            desc: newData.description,
            id: id,
            createddate: txt_time,
            publishdate: txt_time,
            archivedate: txt_time,
            author: 'Wade Migrino',
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
            publisheddate: newData.publisheddate,
            archiveddate: newData.archiveddate,
            privacy: newData.privacy,
          };
          const index = CheckExist(id, updatedData);
          if (index <= -1) {
            updatedData.push(item);
          } else {
            updatedData[index] = item;
          }
        });
      } catch {}
      return { adminRegularNews: updatedData };
    },
    GETPUBLISHEDFEATUREDNEWSLIST: (curState: AdminNewsState, data: any) => {
      const updatedData = [...curState.adminFeaturedNews];
      try {
        data.forEach((elem: any) => {
          const a = elem[1][1];
          const newData = a['news/data'];
          const meta = a._meta;
          const txt_time = meta !== undefined ? a._meta['tx-time'] : new Date();
          const image = a['news/data'].image;
          const imgPath = image.imgurl;
          const id = a.id !== undefined ? a.id : a['crux.db/id'];

          const item = {
            name: 'Kristen Moller',
            initial: 'KM',
            featured: newData.featured,
            img: 'https://stornewsapi.blob.core.windows.net/images/' + imgPath,
            title: a['news/title'],
            icon: 'Bank',
            persona: pic2,
            desc: newData.description,
            category: a['news/category'],
            id: id,
            createddate: txt_time,
            publisheddate: newData.publisheddate,
            archiveddate: newData.archiveddate,
            author: 'Wade Migrino',
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
      } catch {}
      return { adminFeaturedNews: updatedData };
    },
  };
  initStore(actions, initialState);
};

export default configureStore;
