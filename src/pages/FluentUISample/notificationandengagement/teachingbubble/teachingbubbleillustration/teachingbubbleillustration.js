import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { useBoolean } from '@uifabric/react-hooks';

const exampleImageProps = {
  src: 'http://placehold.it/364x180',
  alt: 'Example placeholder image',
};

const examplePrimaryButtonProps = {
  children: 'Try it out',
};

const TeachingBubbleIllustrationExample = () => {
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
      <div className="fluenttitle divpadt10">TeachingBubble Illustrition</div>
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
          illustrationImage={exampleImageProps}
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

export default TeachingBubbleIllustrationExample;
