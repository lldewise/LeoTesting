import React, { Fragment } from 'react';
import classes from './CommentsItem.module.scss';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

type CommentsItemProps = {
  persona: any;
  initial: any;
  status: any;
  comments: any;
};
const CommentsItem: React.FC<CommentsItemProps> = React.memo(props => {
  const examplePersona = {
    imageUrl: props.persona,
    imageInitials: props.initial,
  };
  return (
    <>
      <div className="ms-Grid-row">
        <div className={'ms-Grid-col ms-lg12 ' + classes.container}>
          <div className={'ms-Grid-col ms-lg1 ' + classes.persona}>
            <Persona
              {...examplePersona}
              size={PersonaSize.size32}
              presence={props.status}
              hidePersonaDetails={true}
            />
          </div>

          <div className={'ms-Grid-col ms-lg11 ' + classes.inputContainer}>
            {props.comments}
          </div>
        </div>
      </div>
    </>
  );
});

export default CommentsItem;
