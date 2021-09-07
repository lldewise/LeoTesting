import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { useBoolean } from '@uifabric/react-hooks';

const examplePrimaryButtonProps = {
  children: 'Try it out',
};

const exampleImageProps = {
  src: 'http://placehold.it/154x220',
  alt: 'Example placeholder image',
};

const CalloutProps = { directionalHint: DirectionalHint.bottomCenter };

const TeachingBubbleWideIllustrationExample = () => {
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] =
    useBoolean(false);
  const exampleSecondaryButtonProps = React.useMemo(
    () => ({
      children: 'Maybe later',
      onClick: toggleTeachingBubbleVisible,
    }),
    [toggleTeachingBubbleVisible],
  );

  return (
    <div>
      <div className="fluenttitle divpadt10">
        TeachingBubble Wide with Illustrition
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
          illustrationImage={exampleImageProps}
          calloutProps={CalloutProps}
          isWide={true}
          hasSmallHeadline={true}
          hasCloseButton={true}
          closeButtonAriaLabel="Close"
          target="#targetButton"
          primaryButtonProps={examplePrimaryButtonProps}
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleTeachingBubbleVisible}
          headline="Discover what’s trending around you">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
          nulla, ipsum? Molestiae quis aliquam magni harum non?
        </TeachingBubble>
      )}
    </div>
  );
};

export default TeachingBubbleWideIllustrationExample;
