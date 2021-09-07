export const newsData = (dispatch, data) => {
  const entityData = data.filter(
    a => a[0] === 'entity/data' && a[1][1] !== null,
  );

  const filterData = entityData.filter(a => a[1][0].includes('news'));

  if (filterData.length > 0) {
    const newsList = filterData.filter(a => a[1][1]['news/status'] !== 'draft');
    dispatch('GETNEWSSTORIESLIST', newsList);
    const draft = filterData.filter(a => a[1][1]['news/status'] === 'draft');
    dispatch('GETNEWSDRAFTLIST', draft);

    const regular = filterData.filter(
      a =>
        a[1][1]['news/status'] === 'published' &&
        a[1][1]['news/data'].featured === 'False',
    );
    dispatch('GETPUBLISHEDREGULARNEWSLIST', regular);

    const featured = filterData.filter(
      a =>
        a[1][1]['news/status'] === 'published' &&
        a[1][1]['news/data'].featured === 'True',
    );
    dispatch('GETPUBLISHEDFEATUREDNEWSLIST', featured);
  }
};

export const newsDelete = (dispatch, data) => {
  dispatch('DELETENEWSDRAFT', data);
};
