import React, { Fragment } from 'react';
import classes from './Comments.module.scss';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { intl } from '../../../util/commonFunction';
import { LabelNames } from '../../../util/constant';

type CommentsProps = {
  item: any;
  user: any;
};

const Comments: React.FC<CommentsProps> = React.memo(props => {
  const examplePersona = {
    imageUrl: props.user.imageUrl,
    imageInitials: props.user.imageInitials,
  };

  return (
    <>
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 ' + classes.container}>
          <div className={'ms-Grid-col ms-lg1 ' + classes.persona}>
            <Persona
              {...examplePersona}
              size={PersonaSize.size32}
              presence={props.item.status}
              hidePersonaDetails={true}
            />
          </div>

          <div
            className={
              'ms-Grid-col ms-lg11 PlaceHolderGray ' + classes.inputContainer
            }>
            <TextField placeholder={intl(LabelNames.writeComment)} />
          </div>
        </div>
      </div>
    </>
  );
});
export default Comments;
