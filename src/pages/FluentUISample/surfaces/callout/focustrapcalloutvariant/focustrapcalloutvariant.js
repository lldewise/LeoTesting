import * as React from 'react';
import {
  DefaultButton,
  FocusTrapCallout,
  Stack,
  FocusZone,
  PrimaryButton,
  mergeStyleSets,
  FontWeights,
  Text,
} from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';

const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32,
  },
  callout: {
    maxWidth: 300,
  },
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    {
      margin: 0,
      fontWeight: FontWeights.regular,
      font: '15px',
    },
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px',
  },
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 24px 24px',
  },
  subtext: [
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
});

const CalloutFocusTrapExample = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const [isPrimaryCalloutVisible, { toggle: toggleIsPrimaryCalloutVisible }] =
    useBoolean(false);
  const [
    isSecondaryCalloutVisible,
    { toggle: toggleIsSecondaryCalloutVisible },
  ] = useBoolean(false);

  return (
    <>
      <div className="fluenttitle divpadt10">FocusTrapCallout Variant</div>
      <div className={styles.buttonArea}>
        <DefaultButton
          onClick={toggleIsCalloutVisible}
          text={
            isCalloutVisible ? 'Hide FocusTrapCallout' : 'Show FocusTrapCallout'
          }
        />
      </div>
      {isCalloutVisible ? (
        <div>
          <FocusTrapCallout
            role="alertdialog"
            className={styles.callout}
            gapSpace={0}
            target={`.${styles.buttonArea}`}
            onDismiss={toggleIsCalloutVisible}
            setInitialFocus>
            <div className={styles.header}>
              <Text className={styles.title}>Callout title here</Text>
            </div>
            <div className={styles.inner}>
              <div>
                <Text className={styles.subtext}>
                  Content is wrapped in a FocusTrapZone so that user cannot
                  accidently tab out of this callout.
                </Text>
              </div>
            </div>
            <FocusZone>
              <Stack className={styles.buttons} gap={8} horizontal>
                <PrimaryButton onClick={toggleIsCalloutVisible}>
                  Button 1
                </PrimaryButton>
                <DefaultButton onClick={toggleIsCalloutVisible}>
                  Button 2
                </DefaultButton>
              </Stack>
            </FocusZone>
          </FocusTrapCallout>
        </div>
      ) : null}

      <div className="fluenttitle divpadt10">
        Primary FocusTrapCallout Variant
      </div>
      <div className={styles.buttonArea}>
        <DefaultButton
          onClick={toggleIsPrimaryCalloutVisible}
          text={
            isPrimaryCalloutVisible
              ? 'Hide FocusTrapCallout'
              : 'Show FocusTrapCallout'
          }
        />
      </div>
      {isPrimaryCalloutVisible ? (
        <div>
          <FocusTrapCallout
            role="alertdialog"
            className={(styles.callout, 'primaryCallout')}
            gapSpace={0}
            target={`.${styles.buttonArea}`}
            onDismiss={toggleIsPrimaryCalloutVisible}
            setInitialFocus>
            <div className={styles.header}>
              <Text className={styles.title}>Callout title here</Text>
            </div>
            <div className={styles.inner}>
              <div>
                <Text className={styles.subtext}>
                  Content is wrapped in a FocusTrapZone so that user cannot
                  accidently tab out of this callout.
                </Text>
              </div>
            </div>
            <FocusZone>
              <Stack className={styles.buttons} gap={8} horizontal>
                <PrimaryButton onClick={toggleIsPrimaryCalloutVisible}>
                  Button 1
                </PrimaryButton>
                <DefaultButton onClick={toggleIsPrimaryCalloutVisible}>
                  Button 2
                </DefaultButton>
              </Stack>
            </FocusZone>
          </FocusTrapCallout>
        </div>
      ) : null}

      <div className="fluenttitle divpadt10">
        Secondary FocusTrapCallout Variant
      </div>
      <div className={styles.buttonArea}>
        <DefaultButton
          onClick={toggleIsSecondaryCalloutVisible}
          text={
            isSecondaryCalloutVisible
              ? 'Hide FocusTrapCallout'
              : 'Show FocusTrapCallout'
          }
        />
      </div>
      {isSecondaryCalloutVisible ? (
        <div>
          <FocusTrapCallout
            role="alertdialog"
            className={(styles.callout, 'secondaryCallout')}
            gapSpace={0}
            target={`.${styles.buttonArea}`}
            onDismiss={toggleIsSecondaryCalloutVisible}
            setInitialFocus>
            <div className={styles.header}>
              <Text className={styles.title}>Callout title here</Text>
            </div>
            <div className={styles.inner}>
              <div>
                <Text className={styles.subtext}>
                  Content is wrapped in a FocusTrapZone so that user cannot
                  accidently tab out of this callout.
                </Text>
              </div>
            </div>
            <FocusZone>
              <Stack className={styles.buttons} gap={8} horizontal>
                <PrimaryButton onClick={toggleIsSecondaryCalloutVisible}>
                  Button 1
                </PrimaryButton>
                <DefaultButton onClick={toggleIsSecondaryCalloutVisible}>
                  Button 2
                </DefaultButton>
              </Stack>
            </FocusZone>
          </FocusTrapCallout>
        </div>
      ) : null}
    </>
  );
};

export default CalloutFocusTrapExample;
