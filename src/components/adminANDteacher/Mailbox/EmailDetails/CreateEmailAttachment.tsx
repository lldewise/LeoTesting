import React, { Fragment, useRef } from "react";
import { Stack, Link, CommandBarButton } from "office-ui-fabric-react";
import styles from "./EmailDetails.module.scss";
import { ActionButton, Icon } from "@fluentui/react";
import { truncateLongName } from "../../../../util/commonFunction";
import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';

type CreateEmailAttachmentProps = {
  item: any
  removeAttachment:any
};

export const CreateEmailAttachment: React.FC<CreateEmailAttachmentProps> = props => {
  const selectedFile = useRef();
  const donwloadMenuProps = {
    items: [
      {
        key: "remove",
        text: "Remove Attachment",
      },
    ],
    onItemClick: (e:any, value:any) => {
      clickFilterHandler(value);
    },
  };

  const clickFilterHandler = (value:any) => {
    props.removeAttachment(value, props.item);
  };

  return (
    <Fragment>
      <Link key={props.item.key}>
        {props.item.contentType.slice(0, 5) == "image" ? (
          <div className={styles.imgAttach}>
            <Stack horizontal horizontalAlign="center">
              <img
                src={`data:${props.item.contentType};base64,${props.item.contentBytes}`}
                alt={props.item.key}
                width={150}
                height={90}
              />
              <div className={styles.imgName}>
                <ActionButton
                  text={truncateLongName(props.item.name, 15)}
                  menuProps={donwloadMenuProps}
                  split={true}
                  className={"btnPlain btnPrimary " + styles.btnDownloadCustom}
                />
              </div>
            </Stack>
          </div>
        ) : (
          <div className={styles.appDiv}>
            <div className={"ms-Grid-row " + styles.appAttach}>
              <Stack horizontal horizontalAlign="center">
                <Icon {...getFileTypeIconProps({ extension: props.item.name.split(".")[1], size: 32, imageFileType: 'png' })}  className={styles.appFileIcon}/>
                <div className={styles.appName}>
                  <ActionButton
                    text={truncateLongName(props.item.name, 15)}
                    menuProps={donwloadMenuProps}
                    split={true}
                    className={
                      "btnPlain btnPrimary " + styles.appBtnDownloadCustom
                    }
                  />
                </div>
              </Stack>
            </div>
          </div>
        )}
      </Link>
    </Fragment>
  );
};
