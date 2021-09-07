import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { createArray } from 'office-ui-fabric-react/lib/Utilities';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean, useSetInterval, useConst } from '@uifabric/react-hooks';

const PHOTO_COUNT = 40;

const stackTokens = { childrenGap: 10 };
const photoStackTokens = { childrenGap: '6 6' };

const defaultButtonStyles = { root: { width: 150 } };

const photoStackStyles = {
  inner: {
    padding: 0,
  },
};

const photoCellClass = mergeStyles({
  display: 'block',
  boxSizing: 'border-box',
  width: 100,
  height: 100,
});

const AnnouncedLazyLoadingExample = () => {
  const [total, setTotal] = React.useState(0);
  const [announcedMessage, setAnnouncedMessage] = React.useState(undefined);
  const [loading, { toggle: toggleLoading }] = useBoolean(false);
  const percentComplete = total / PHOTO_COUNT;

  const { setInterval, clearInterval } = useSetInterval();

  const photos = useConst(() => {
    const width = 100;
    const height = 100;
    return createArray(PHOTO_COUNT, () => ({
      url: `http://placehold.it/${width}x${height}`,
      width,
      height,
    }));
  });

  React.useEffect(() => {
    if (loading) {
      setTotal(0);

      const itemIntervalId = setInterval(() => {
        setTotal(t => {
          if (t < PHOTO_COUNT) {
            return t + 1;
          }
          clearInterval(itemIntervalId);
          clearInterval(announceIntervalId);
          toggleLoading();
          return t;
        });
      }, 500);

      const announceIntervalId = setInterval(() => {
        // Refering to total directly would cause the effect to dispose.
        // Instead pull the total value from the setter to apply to the announcement.
        setTotal(t => {
          setAnnouncedMessage(`${t} of ${PHOTO_COUNT} photos loaded`);
          return t;
        });
      }, 4000);

      return () => {
        clearInterval(itemIntervalId);
        clearInterval(announceIntervalId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearInterval, setInterval, loading]);

  return (
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-lg12 ">
        <div className="fluenttitle divpadt10">Announced - Lazy Loading</div>
        <div className="divpadt10">
          <Stack tokens={stackTokens}>
            <Text>
              Turn on Narrator and press the button to start loading photos. The
              number of photos loaded will be announced every four seconds.
            </Text>
            <DefaultButton
              text={loading ? 'Cancel' : 'Load photos'}
              onClick={toggleLoading}
              styles={defaultButtonStyles}
            />
            <ProgressIndicator
              label={!loading ? 'Paused' : 'Loading photos'}
              percentComplete={percentComplete}
            />
            <FocusZone>
              <Stack
                horizontal
                wrap
                tokens={photoStackTokens}
                styles={photoStackStyles}
                slots={{ inner: { component: 'ul' } }}>
                {photos.slice(0, total).map((photo, index) => (
                  <li
                    key={index}
                    className={photoCellClass}
                    aria-posinset={index + 1}
                    aria-setsize={PHOTO_COUNT}
                    aria-label="Photo"
                    data-is-focusable>
                    <Image
                      src={photo.url}
                      width={photo.width}
                      height={photo.height}
                    />
                  </li>
                ))}
              </Stack>
            </FocusZone>
          </Stack>
          {loading && <Announced message={announcedMessage} />}
        </div>
      </div>
    </div>
  );
};

export default AnnouncedLazyLoadingExample;
