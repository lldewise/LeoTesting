import React from 'react';
import AnnouncedBulkOperationsExample from './announced/announcedbulk';
import AnnouncedLazyLoadingExample from './announced/annoucedlazy';
import AnnouncedQuickActionsExample from './announced/announcedaction';
import AnnouncedSearchResultsExample from './announced/annoucedserchresult';

const FluentUIAnnouncement = () => {
  return (
    <div>
      <AnnouncedBulkOperationsExample />
      <AnnouncedLazyLoadingExample />
      <AnnouncedQuickActionsExample />
      <AnnouncedSearchResultsExample />
    </div>
  );
};

export default FluentUIAnnouncement;
