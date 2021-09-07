import React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { useId } from '@uifabric/react-hooks';

const FluentUILabel = () => {
  const textFieldId = useId('anInput');
  return (
    <div>
      <div className="fluenttitle divpadt10">Label</div>
      <div className="divpadt10">
        <Label>I'm a Label</Label>
        <Label disabled>I'm a disabled Label</Label>
        <Label required>I'm a required Label</Label>
        <Label htmlFor={textFieldId}>A Label for An Input</Label>
        <TextField id={textFieldId} />
      </div>
    </div>
  );
};

export default FluentUILabel;
