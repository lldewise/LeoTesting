import React, { Fragment } from 'react';
import classes from './ThumbnailModal.module.scss';
import AvatarEditor from 'react-avatar-editor';
import diskimg from '../../../../assets/images/disk.png';
import diskimghalf from '../../../../assets/images/diskhalf.png';
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

type ThumbnailModalProps = {
  continue: any;
  isModalOpen: any;
  hideModal: any;
  imgProfile: any;
  scale: any;
  position: any;
  previous: any;
};

type ThumbnailModalState = {
  img: any;
  scale: any;
  allowZoomOut: any;
  selectedFile: any;
  position: any;
};

class ThumbnailModal extends React.Component<
  ThumbnailModalProps,
  ThumbnailModalState
> {
  constructor(props: ThumbnailModalProps) {
    super(props);
    this.state = {
      img: null,
      scale: this.props.scale,
      allowZoomOut: false,
      selectedFile: null,
      position: this.props.position,
    };
  }

  handleSelectedFile = (item: any) => {
    this.setState({ selectedFile: item });
  };

  onClickSave = () => {
    if (this.editor) {
      const img = this.editor.getImageScaledToCanvas().toDataURL();
      this.setState({
        img: img,
      });
    }
  };

  handlePositionChange = (position: any) => {
    this.setState({ position: position });
  };

  handleScale = (value: any) => {
    this.setState({ scale: value });
  };

  private editor: any;
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
                {intl(LabelNames.featuredthumbnail)}
              </div>
            </div>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + classes.titledesc}>
                {intl(LabelNames.displaywhenyourstory)}
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
                      width={466}
                      height={244}
                      border={5}
                      position={this.state.position}
                      onPositionChange={this.handlePositionChange}
                    />
                  </div>
                  <div>
                    <img
                      src={diskimg}
                      alt={diskimg}
                      className={classes.image}
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
              <div className="ms-Grid-col ms-lg12 ">
                <div className={classes.container}>
                  <div>
                    <img
                      src={diskimghalf}
                      alt={diskimghalf}
                      className={classes.imagehalf}
                    />
                  </div>
                  <div>
                    <img
                      src={diskimghalf}
                      alt={diskimghalf}
                      className={classes.imagehalf}
                    />
                  </div>
                  <div>
                    <img
                      src={diskimghalf}
                      alt={diskimghalf}
                      className={classes.imagehalf}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 text-right ">
                <PrimaryButton
                  text={intl(LabelNames.previous)}
                  onClick={this.props.previous}
                  className="btnPrimary"
                />
                <span className="padR5" />
                <PrimaryButton
                  className="btnPrimary"
                  text={intl(LabelNames.continue)}
                  onClick={() =>
                    this.props.continue(this.state.scale, this.state.position)
                  }
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

export default ThumbnailModal;
