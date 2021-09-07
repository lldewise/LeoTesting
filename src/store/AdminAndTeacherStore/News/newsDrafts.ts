import { initStore } from '../../store';
//import pic1 from '../../../assets/images/news/newsDraft.PNG'
import { CheckExist } from '../../../util/compareData';
import { adminNewsDraftInitialState } from '../../storeInitialStates/adminAndTeacher/news';
import { AdminNewsDraftState } from '../../../types/store/adminAndTeacher/news';

const initialState: AdminNewsDraftState = adminNewsDraftInitialState;

const configureStore = () => {
  const actions = {
    GETNEWSDRAFTLIST: (curState: AdminNewsDraftState, data: any) => {
      const updatedData = [...curState.adminNewsDrafts];
      try {
        data.forEach((elem: any) => {
          const a = elem[1][1];
          const newData = a['news/data'];
          const image = a['news/data'].image;

          const meta = a._meta;
          const txt_time = meta !== undefined ? a._meta['tx-time'] : new Date();
          const imgPath = image.imgurl;
          const id = a.id !== undefined ? a.id : a['crux.db/id'];
          const item = {
            featured: Boolean(newData.featured) === true ? false : true,
            img: 'https://stornewsapi.blob.core.windows.net/images/' + imgPath,
            title: a['news/title'],
            desc: newData.description,
            category: a['news/category'],
            id: id,
            createddate: txt_time,
            publishdate: newData.publisheddate,
            archivedate: newData.archiveddate,
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

      return { adminNewsDrafts: updatedData };
    },

    DELETENEWSDRAFT: (curState: AdminNewsDraftState, data: any) => {
      const updatedData = [...curState.adminNewsDrafts];
      try {
        const id = data[0][1];
        const index = CheckExist(id, updatedData);
        updatedData.splice(index, 1);
      } catch {}
      return { adminNewsDrafts: updatedData };
    },
  };

  initStore(actions, initialState);
};
export default configureStore;
