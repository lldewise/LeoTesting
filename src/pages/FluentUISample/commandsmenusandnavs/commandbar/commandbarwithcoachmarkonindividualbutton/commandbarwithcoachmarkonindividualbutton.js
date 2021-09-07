import * as React from 'react';
import {
  CommandBar,
  ICommandBarItemProps,
} from 'office-ui-fabric-react/lib/CommandBar';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Coachmark } from 'office-ui-fabric-react/lib/Coachmark';
import {
  IComponentAsProps,
  IComponentAs,
} from 'office-ui-fabric-react/lib/Utilities';
import { TeachingBubbleContent } from 'office-ui-fabric-react/lib/TeachingBubble';
import {
  CommandBarButton,
  IButtonProps,
} from 'office-ui-fabric-react/lib/Button';
import logger from 'loglevel';

/** Command bar button with a coachmark and teaching bubble */
const CoachmarkCommandBarButton = props => {
  const targetButton = React.useRef(null);
  const { defaultRender, isCoachmarkVisible, onDismiss, ...buttonProps } =
    props;
  const ButtonComponent = defaultRender || CommandBarButton;

  return (
    <>
      <div ref={targetButton}>
        <ButtonComponent {...buttonProps} />
      </div>
      {isCoachmarkVisible && (
        <Coachmark
          target={targetButton.current}
          positioningContainerProps={{
            directionalHint: DirectionalHint.bottomCenter,
          }}
          ariaAlertText="A Coachmark has appeared"
          ariaDescribedBy="coachmark-desc1"
          ariaLabelledBy="coachmark-label1"
          ariaLabelledByText="Coachmark notification">
          <TeachingBubbleContent
            headline="Example Title"
            hasCloseButton={true}
            closeButtonAriaLabel="Close"
            onDismiss={onDismiss}
            ariaDescribedBy="example-description1"
            ariaLabelledBy="example-label1">
            Welcome to the land of Coachmarks!
          </TeachingBubbleContent>
        </Coachmark>
      )}
    </>
  );
};

const overflowButtonProps = {
  ariaLabel: 'More commands',
};

/** Command bar which renders the Share button with a coachmark */

const IndividualCommandBarButtonAsExample = props => {
  const { onDismissCoachmark, isCoachmarkVisible } = props;
  const items = React.useMemo(() => {
    const CoachmarkButtonWrapper = p => {
      return (
        <CoachmarkCommandBarButton
          {...p}
          isCoachmarkVisible={isCoachmarkVisible}
          onDismiss={onDismissCoachmark}
        />
      );
    };

    return [
      {
        key: 'newItem',
        text: 'New',
        iconProps: { iconName: 'Add' },
        onClick: () => logger.log('New'),
      },
      {
        key: 'upload',
        text: 'Upload',
        iconProps: { iconName: 'Upload' },
        onClick: () => logger.log('Upload'),
      },
      {
        key: 'share',
        text: 'Share',
        iconProps: { iconName: 'Share' },
        // The Share button will have a coachmark
        commandBarButtonAs: CoachmarkButtonWrapper,
        onClick: () => logger.log('Share'),
      },
      {
        key: 'download',
        text: 'Download',
        iconProps: { iconName: 'Download' },
        onClick: () => logger.log('Download'),
      },
    ];
  }, [onDismissCoachmark, isCoachmarkVisible]);

  return (
    <CommandBar
      overflowButtonProps={overflowButtonProps}
      items={items}
      ariaLabel="Use left and right arrow keys to navigate between commands"
    />
  );
};

export const IndividualCommandBarButtonAsExampleWrapper = () => {
  const [isCoachmarkVisible, setIsCoachmarkVisible] = React.useState(true);

  const onDismissCoachmark = React.useCallback(
    () => setIsCoachmarkVisible(false),
    [],
  );

  return (
    <div>
      IndividualCommandBarButtonAsExampleWrapper
      <IndividualCommandBarButtonAsExample
        onDismissCoachmark={onDismissCoachmark}
        isCoachmarkVisible={isCoachmarkVisible}
      />
    </div>
  );
};

export default IndividualCommandBarButtonAsExampleWrapper;
