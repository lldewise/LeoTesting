import React from 'react';
import BasicInput from './basicinput/basicinput';
import GalleriesandPicker from './galleriesandpicker/galleriesandpicker';
import FluentUIItemList from './fluentuiitemlist/fluentuiitemlist';
// import Experimental from './experimental/experimental';

import Breadcrumb from './commandsmenusandnavs/breadcrumb/breadcrumb';
import Commandbar from './commandsmenusandnavs/commandbar/commandbar';
import Nav from './commandsmenusandnavs/nav/nav';
import Pivot from './commandsmenusandnavs/pivot/pivot';
import CoachmarkBasicExample from './notificationandengagement/coachmark/coachmark';
import MessageBarBasicExample from './notificationandengagement/messagebar/messagebar';
import TeachingBubble from './notificationandengagement/teachingbubble/teachingbubble';
import ProgressIndicator from './progress/progressindicator/progressindicator';
import Shimmer from './progress/shimmer/shimmer';
import Spinner from './progress/spinner/spinner';
import Callout from './surfaces/callout/callout';
import Dialog from './surfaces/dialog/dialog';
import Modal from './surfaces/modal/modal';
import Panel from './surfaces/panel/panel';
import ScrollablePane from './surfaces/scrollablepane/scrollablepane';
import Tooltip from './surfaces/tooltip/tooltip';
import ColorSwatches from './ColorSwatches/ColorSwatches';
import Typography from './Typography/Typography';
import './fluentuisample.scss';

const FluentUISample = () => {
  return (
    <div className="ms-Grid-row ">
      <div className=" fluenttitle hideFluentUIScroll fluentui">
        <Typography />
        <ColorSwatches />

        <BasicInput />

        <Breadcrumb />
        <Commandbar />
        {/* <Contextualmenu/> */}
        <Nav />
        {/* <OverflowSet/> */}

        <GalleriesandPicker />
        <Pivot />
        <FluentUIItemList />
        {/* <Experimental/> */}

        {/* Notification */}
        <CoachmarkBasicExample />
        <MessageBarBasicExample />
        <TeachingBubble />

        {/* Progress */}
        <ProgressIndicator />
        <Shimmer />
        <Spinner />

        {/* Surfaces */}
        <Callout />
        <Dialog />
        <Modal />
        <Panel />
        <ScrollablePane />
        <Tooltip />
        {/* <FluentUIUtilities /> */}
      </div>
    </div>
  );
};

export default FluentUISample;
