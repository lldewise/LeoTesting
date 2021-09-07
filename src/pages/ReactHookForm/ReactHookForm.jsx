import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Controller, useForm } from 'react-hook-form';
import logger from 'loglevel';

export default function ReactHookForm() {
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = data => {
    logger.log(data);
  };
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const validateHandler = async value => {
    await sleep(1000);
    if (value === 'eric') {
      return true;
    }

    return false;
  };
  function getErrorMessage(name) {
    return errors[name]?.message;
  }

  return (
    <div className="ms-Grid-row ">
      <div className="ms-Grid-col ms-lg12 container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg4">
              {/* <input name="example" defaultValue="test" ref={register} /> */}
              <Controller
                as={TextField}
                control={control}
                label="Name"
                autoComplete="name"
                autoFocus
                defaultValue="Lebron James"
                name="name"
              />
            </div>
          </div>
          <br />
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg4">
              <Controller
                as={TextField}
                control={control}
                label="Username"
                autoComplete="username"
                errorMessage={getErrorMessage('username')}
                autoFocus
                minLength={3}
                maxLength={32}
                defaultValue=""
                name="username"
                rules={{
                  required: 'Please enter your username',
                  minLength: {
                    value: 3,
                    message: 'Please enter your username',
                  },
                  maxLength: { value: 32, message: 'Username is too long' },
                }}
              />
            </div>
          </div>

          <br />
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg4">
              <Controller
                as={TextField}
                control={control}
                label="OTP"
                autoComplete="otp"
                errorMessage={getErrorMessage('otp')}
                autoFocus
                minLength={3}
                maxLength={32}
                defaultValue=""
                name="otp"
                rules={{
                  required: {
                    value: true,
                    message: 'Required',
                  },
                  validate: validateHandler,
                }}
              />
              {errors.otp && <p>Required</p>}
            </div>
          </div>

          <br />
          <div className="ms-Grid-row ">
            <div className="ms-Grid-col ms-lg4">
              <input type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
