import React from 'react';
import TeachingBubbleBasicExample from './teachingbubblebasic/teachingbubblebasic';
import TeachingBubbleWideExample from './teachingbubblewide/teachingbubblewide';
import TeachingBubbleCondensedExample from './teachingbubblecondensed/teachingbubblecondensed';
import TeachingBubbleIllustrationExample from './teachingbubbleillustration/teachingbubbleillustration';
import TeachingBubbleWideIllustrationExample from './teachingbubblewidewithillustration/teachingbubblewidewithillustration';
import TeachingBubbleSmallHeadlineExample from './teachingbubblewithsmallheadline/teachingbubblewithsmallheadline';
import TeachingBubbleMultiStepExample from './teachingbubblewithmultisteps/teachingbubblewithmultisteps';

const TeachingBubble = () => {
  return (
    <div className="ms-Grid-row">
      <TeachingBubbleBasicExample />
      <TeachingBubbleWideExample />
      <TeachingBubbleCondensedExample />
      <TeachingBubbleIllustrationExample />
      <TeachingBubbleWideIllustrationExample />
      <TeachingBubbleSmallHeadlineExample />
      <TeachingBubbleMultiStepExample />
    </div>
  );
};

export default TeachingBubble;
