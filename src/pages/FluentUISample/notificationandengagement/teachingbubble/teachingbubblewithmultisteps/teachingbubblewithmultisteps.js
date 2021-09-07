import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { useBoolean } from '@uifabric/react-hooks';

const examplePrimaryButtonProps = {
  children: 'Next',
};

const TeachingBubbleMultiStepExample = () => {
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] =
    useBoolean(false);

  const exampleSecondaryButtonProps = React.useMemo(
    () => ({
      children: 'Previous',
      onClick: toggleTeachingBubbleVisible,
    }),
    [toggleTeachingBubbleVisible],
  );

  return (
    <div>
      <div className="fluenttitle divpadt10">
        TeachingBubble with multi-steps
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
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleTeachingBubbleVisible}
          footerContent="2 of 3"
          headline="Discover what’s trending around you">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
          nulla, ipsum? Molestiae quis aliquam magni harum non?
        </TeachingBubble>
      )}
    </div>
  );
};

export default TeachingBubbleMultiStepExample;
