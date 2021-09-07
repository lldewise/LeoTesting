import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { useBoolean } from '@uifabric/react-hooks';

const TeachingBubbleSmallHeadlineExample = () => {
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] =
    useBoolean(false);
  const examplePrimaryButtonProps = {
    children: 'Try it out',
    onClick: toggleTeachingBubbleVisible,
  };

  return (
    <div>
      <div className="fluenttitle divpadt10">
        TeachingBubble With small headline
      </div>
      <DefaultButton
        id="targetButton"
        onClick={toggleTeachingBubbleVisible}
        text={
          teachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble'
        }
      />

      {teachingBubbleVisible && (
        <TeachingBubble
          target="#targetButton"
          primaryButtonProps={examplePrimaryButtonProps}
          hasSmallHeadline={true}
          onDismiss={toggleTeachingBubbleVisible}
          headline="Discover what’s trending around you"
          closeButtonAriaLabel="Close">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
          nulla, ipsum? Molestiae quis aliquam magni harum non?
        </TeachingBubble>
      )}
    </div>
  );
};

export default TeachingBubbleSmallHeadlineExample;
