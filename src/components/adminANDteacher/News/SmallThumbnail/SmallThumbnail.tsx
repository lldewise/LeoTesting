import React, { Fragment } from 'react';
import classes from './SmallThumbnailModal.module.scss';
import AvatarEditor from 'react-avatar-editor';
import AvatarEditor1 from 'react-avatar-editor';
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

type SmallThumbnailModalProps = {
  isModalOpen: any;
  hideModal: any;
  imgProfile: any;
  scale: any;
  position: any;
  position1: any;
  previous: any;
  finish: any;
};

type SmallThumbnailModalState = {
  img: any;
  scale: any;
  allowZoomOut: any;
  selectedFile: any;
  position: any;
  position1: any;
};

class SmallThumbnailModal extends React.Component<
  SmallThumbnailModalProps,
  SmallThumbnailModalState
> {
  constructor(props: SmallThumbnailModalProps) {
    super(props);
    this.state = {
      img: null,
      scale: this.props.scale,
      allowZoomOut: false,
      selectedFile: null,
      position: this.props.position,
      position1: this.props.position1,
    };
  }

  handleSelectedFile = (item: any) => {
    this.setState({ selectedFile: item });
  };

  private editor: any;
  onClickSave = () => {
    if (this.editor) {
      const img = this.editor.getImageScaledToCanvas().toDataURL();
      this.setState({
        img: img,
      });
    }
  };
  handleScale = (value: any) => {
    this.setState({ scale: value });
  };
  setEditorRef = (editor: any) => (this.editor = editor);

  handlePositionChange = (position: any) => {
    this.setState({ position: position });
  };

  handlePositionChange1 = (position: any) => {
    this.setState({ position1: position });
  };

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
                {intl(LabelNames.smallThumbnail)}
              </div>
            </div>
            <div className="ms-Grid-row ">
              <div className={'ms-Grid-col ms-lg12 ' + classes.titledesc}>
                {intl(LabelNames.smallThumbnailDescription)}
              </div>
            </div>
            <br />
            <br />
            <br />

            <div className="ms-Grid-row ">
              <div className="ms-Grid-col ms-lg12 ">
                <div className={classes.container}>
                  <div className={' padR20'}>
                    <div className={classes.landscapeBGImage}>
                      <AvatarEditor1
                        ref={this.setEditorRef}
                        scale={this.state.scale}
                        image={this.props.imgProfile}
                        width={277}
                        height={170}
                        border={5}
                        position={this.state.position}
                        onPositionChange={this.handlePositionChange}
                      />
                    </div>
                  </div>
                  <div className={'padR20 ' + classes.squareBGImage}>
                    <AvatarEditor
                      ref={this.setEditorRef}
                      scale={this.state.scale}
                      image={this.props.imgProfile}
                      width={121}
                      height={121}
                      border={5}
                      position={this.state.position1}
                      onPositionChange={this.handlePositionChange1}
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
                  text={intl(LabelNames.finish)}
                  onClick={() =>
                    this.props.finish(
                      this.state.scale,
                      this.state.position,
                      this.state.scale,
                      this.state.position1,
                    )
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

export default SmallThumbnailModal;
