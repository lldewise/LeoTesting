import React, { Fragment } from 'react';
import classes from './NewsBannerModal.module.scss';
import AvatarEditor from 'react-avatar-editor';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import {
  mergeStyleSets,
  Modal,
  IconButton,
  getTheme,
  PrimaryButton,
} from 'office-ui-fabric-react';
import { LabelNames } from '../../../../util/constant';
import { intl } from '../../../../util/commonFunction';

type NewsBannerModalProps = {
  continue: any;
  isModalOpen: any;
  hideModal: any;
  imgProfile: any;
  scale: any;
  position: any;
};

type NewsBannerModalState = {
  img: any;
  scale: any;
  allowZoomOut: any;
  selectedFile: any;
  position: any;
};

class NewsBannerModal extends React.Component<
  NewsBannerModalProps,
  NewsBannerModalState
> {
  constructor(props: NewsBannerModalProps) {
    super(props);
    this.state = {
      img: null,
      scale: this.props.scale,
      allowZoomOut: false,
      selectedFile: null,
      position: this.props.position,
    };
  }

  handleScale = (value: any) => {
    this.setState({ scale: value });
    //eslint-disable-next-line
    var data = this.state.scale;
  };

  handlePositionChange = (position: any) => {
    this.setState({ position: position });
  };
  private editor: any;

  imageHandler = () => {
    let img: any;
    try {
      img = this.editor.getImageScaledToCanvas().toDataURL();
    } catch {}
    this.props.continue(this.state.scale, this.state.position, img);
  };

  setEditorRef = (editor: any) => (this.editor = editor);
  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isModalOpen}
          onDismiss={this.props.hideModal}
          containerClassName={contentStyles.container}>
          <div className={contentStyles.header}>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={this.props.hideModal}
            />
          </div>
          <div className={contentStyles.body}>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + classes.title}>
                News Banner
              </div>
            </div>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + classes.titledesc}>
                Displays on the top of your story in the story page.
              </div>
            </div>
            <br />
            <br />
            <br />

            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 ">
                <div className={classes.container}>
                  <div className="padR20">
                    <AvatarEditor
                      ref={this.setEditorRef}
                      scale={this.state.scale}
                      image={this.props.imgProfile}
                      position={this.state.position}
                      onPositionChange={this.handlePositionChange}
                      width={720}
                      height={244}
                      border={5}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />

            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 thumbnail'}>
                <Slider
                  min={0.1}
                  max={2}
                  step={0.01}
                  defaultValue={1}
                  showValue={false}
                  onChange={this.handleScale}
                />
              </div>
            </div>

            <br />
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 text-right ">
                <span className="padR5" />
                <PrimaryButton
                  text={intl(LabelNames.continue)}
                  onClick={this.imageHandler}
                  className="btnPrimary"
                />
              </div>
            </div>
          </div>
          <div />
        </Modal>
      </>
    );
  }
}

const cancelIcon = { iconName: 'Cancel' };
const theme = getTheme();
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
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '780px',
  },
  header: [
    {
      flex: '1 1 auto',
      fontSize: '20px',
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: '600',
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});

export default NewsBannerModal;
