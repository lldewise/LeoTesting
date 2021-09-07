import React, { useState } from 'react';
import {
  PrimaryButton,
  getTheme,
  mergeStyleSets,
  IconButton,
} from 'office-ui-fabric-react';
import classes from './MessageBanner.module.scss';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';

const MessageBanner: React.FC = () => {
  const [showing, setShowing] = useState<boolean>(true);

  const ChromeClose = { iconName: 'ChromeClose' };
  const disp = showing ? classes.hideBanner : classes.showBanner;
  const theme = getTheme();
  const contentStyles = mergeStyleSets({
    introBannerContainer: {
      background: `linear-gradient(45deg, ${theme.palette.themeSecondary}, ${theme.palette.themePrimary})`,
      borderRadius: '5px',
      color: '#fff',
    },
  });

  return (
    <div className={disp}>
      <div className={'ms-Grid-row ' + contentStyles.introBannerContainer}>
        <div className={'ms-Grid-col ms-lg12 ' + classes.introBannerContent}>
          <div className={'ms-Grid-col ms-lg3 ' + classes.introBoy} />

          <div className={'ms-Grid-col ms-lg7 ' + classes.introGreet}>
            <h4 className={classes.introHi}>Hej Mona!{'\n'}</h4>
            <p>
              {intl(LabelNames.welcomeToAtedu)}
              {intl(LabelNames.bannerMessages)}
            </p>
          </div>

          <div className={'ms-Grid-col ms-lg2 ' + classes.introBtns}>
            <IconButton
              iconProps={ChromeClose}
              className={classes.closeBtn}
              title="Close banner"
              onClick={() => setShowing(!showing)}
            />
            <div className="spacer" />
            <PrimaryButton
              className={'secondary-btn ' + classes.bannerBtn}
              text={intl(LabelNames.getStarted)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBanner;
