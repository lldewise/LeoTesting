import React from 'react';
import FluentUIAnnouncement from './announcement/announcement';
import FocusZoneDisabledExample from './focuszone/disabledfocuszone/disabledfocuszone';
import FocusZoneHorizontalMenuExample from './focuszone/horizontalmenufocuszone/horizontalmenufocuszone';
import FocusZoneListExample from './focuszone/nestingfocuszone/nestingfocuszone';
import FocusZonePhotosExample from './focuszone/nonuniformfocuszone/nonuniformfocuszone';
import FocusZoneTabbableExample from './focuszone/tabbablefocuszone/tabbablefocuszone';
import ImageCenterExample from './imagefit/imagefitcenter/imagefitcenter';
import ImageCenterContainExample from './imagefit/imagefitcentercontain/imagefitcentercontain';
import ImageCenterCoverExample from './imagefit/imagefitcentercover/imagefitcentercover';
import ImageContainExample from './imagefit/imagefitcontain/imagefitcontain';
import ImageCoverExample from './imagefit/imagefitcover/imagefitcover';
import ImageMaximizeFrameExample from './imagefit/imagefitmaximizing/imagefitmaximizing';
import ImageNoneExample from './imagefit/imagefitnone/imagefitnone';
import ImageDefaultExample from './imagefit/imagefitnotspecified/imagefitnotspecified';
import LayerBasicExample from './layer/basiclayeredcontent/basiclayeredcontent';
import LayerCustomizedExample from './layer/customizerdefaultlayerbehavior/customizerdefaultlayerbehavior';
import LayerHostedExample from './layer/layerhostcontrolprojection/layerhostcontrolprojection';
import LayerNestedLayersExample from './layer/nestedlayerexample/nestedlayerexample';
import MarqueeSelectionBasicExample from './marqueeselection/basicselectionexample';
import OverlayDarkExample from './overlay/overlaydark/overlaydark';
import OverlayLightExample from './overlay/overlaylight/overlaylight';
import ResizeGroupOverflowSetExample from './resizegroup/resizegroupcommands/resizegroupcommands';
import FlexBoxResizeGroupExample from './resizegroup/rezisetwogroup/rezisetwogroup';
import ResizeGroupVerticalOverflowSetExample from './resizegroup/verticalresizegroupcommands/verticalresizegroupcommands';
import SeparatorBasicExample from './seperator/basicseperator/basicseperator';
import SeparatorThemingExample from './seperator/basicthemedseperator/basicthemedseperator';
import SeparatorIconExample from './seperator/seperatorwithicon/seperatorwithicon';
import VerticalStackBasicExample from './stack/basicstack/basicstack';
import VerticalStackReversedExample from './stack/reversedbasicverticalstack/reversedbasicverticalstack';
import VerticalStackSpacingExample from './stack/verticalstackgapandpadding/verticalstackgapandpadding';
import VerticalStackGrowExample from './stack/verticalstackgrowingitems/verticalstackgrowingitems';
import VerticalStackShrinkExample from './stack/verticalstackshrinkingitems/verticalstackshrinkingitems';
import VerticalStackWrapExample from './stack/verticalstackwrapping/verticalstackwrapping';
import TextBlockExample from './text/textblock/textblock';
import TextRampExample from './text/textramp/textramp';
import TextWrapExample from './text/textwrap/textwrap';
import FluentUIFocusTrapZone from './focustrapzone/focustrapzone';
import FluentUIIcons from './icons/icons';

const FluentUIUtilities = () => {
  return (
    <div>
      <FluentUIAnnouncement />
      <FluentUIFocusTrapZone />
      <FluentUIIcons />
      <FocusZonePhotosExample />
      <FocusZoneListExample />
      <FocusZoneDisabledExample />
      <FocusZoneTabbableExample />
      <FocusZoneHorizontalMenuExample />
      <ImageDefaultExample />
      <ImageNoneExample />
      <ImageCenterExample />
      <ImageContainExample />
      <ImageCoverExample />
      <ImageCenterContainExample />
      <ImageCenterCoverExample />
      <ImageMaximizeFrameExample />
      {/* <KeytipsButtonExample/> */}
      <LayerBasicExample />
      <LayerHostedExample />
      <LayerCustomizedExample />
      <LayerNestedLayersExample />
      <MarqueeSelectionBasicExample />
      <OverlayLightExample />
      <OverlayDarkExample />
      <ResizeGroupOverflowSetExample />
      <ResizeGroupVerticalOverflowSetExample />
      <FlexBoxResizeGroupExample />
      <SeparatorBasicExample />
      <SeparatorThemingExample />
      <SeparatorIconExample />
      <VerticalStackBasicExample />
      <VerticalStackReversedExample />
      <VerticalStackSpacingExample />
      <VerticalStackGrowExample />
      <VerticalStackShrinkExample />
      <VerticalStackWrapExample />
      <TextRampExample />
      <TextWrapExample />
      <TextBlockExample />
    </div>
  );
};

export default FluentUIUtilities;
