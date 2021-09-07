import {
  AdminNewsState,
  AdminNewsDraftState,
  AdminNewsStoriesState,
} from '../../../types/store/adminAndTeacher/news';

export const adminNewsInitialState: AdminNewsState = {
  adminRegularNews: [],
  adminFeaturedNews: [],
};

export const adminNewsDraftInitialState: AdminNewsDraftState = {
  adminNewsDrafts: [
    // {
    //   featured:true,
    //   img: pic1,
    //   title: "Lorem Ipsum",
    //   desc:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //   category: "School News",
    //   id: 1,
    //   createddate: new Date(),
    //   publishdate: new Date(),
    //   archivedate: null,
    //   author: "James Orlando",
    //   status:"To be publish",
    //   statusid:1,
    // },
  ],
};

export const adminNewsStoriesInitialState: AdminNewsStoriesState = {
  adminNewsStories: [
    // {
    //   featured:true,
    //   img: pic1,
    //   title: "Sports College1",
    //   desc:  "For dig der vil kombinere sport og uddannelse!1",
    //   category: "School News",
    //   content:null,
    //   id: 1,
    //   createddate: new Date(),
    //   publishdate: new Date(),
    //   archivedate: null,
    //   author: "James Orlando",
    //   status:"To be publish",
    //   statusid:1,
    //   bannerscale:1
    // },
  ],
  manageNewsStories: [],
};
