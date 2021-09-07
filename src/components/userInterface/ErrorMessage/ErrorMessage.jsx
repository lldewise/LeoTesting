import React, { useEffect, useState } from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  IconButton,
} from 'office-ui-fabric-react';

const cancelIcon = { iconName: 'Cancel' };

export const ErrorMessage = props => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    props.openModal,
  );
  const [errorMessage, setErrorMessage] = useState(props.errorMessage);

  const titleId = useId('title');

  useEffect(() => {
    if (props.openModal) {
      showModal();
      setErrorMessage(props.errorMessage);
    } else {
      hideModal();
    }
  }, [props.apiPostError]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        containerClassName={contentStyles.container}>
        <div className={contentStyles.header}>
          <span id={titleId}>Ooops!</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={hideModal}
          />
        </div>
        <div className={contentStyles.body}>
          <p>{errorMessage}!</p>
          <p>Please contact your administrator!</p>
        </div>
      </Modal>
    </div>
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: '4px solid red',
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.bold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: [
    theme.fonts.large,
    {
      flex: '4 4 auto',
      padding: '0 24px 24px 24px',
      overflowY: 'hidden',
      selectors: {
        p: { margin: '14px 0' },
        'p:first-child': { marginTop: 0 },
        'p:last-child': { marginBottom: 0 },
      },
    },
  ],
  fontWeight: FontWeights.semibold,
});

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

export default ErrorMessage;
