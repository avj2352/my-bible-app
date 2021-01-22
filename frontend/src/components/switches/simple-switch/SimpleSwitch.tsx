import React, { FunctionComponent, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const PurpleSwitch = withStyles( theme => {
  return {
    switchBase: {
        color: theme.palette.secondary.main,
        '&$checked': {
          color: theme.palette.secondary.dark,
        },
        '&$checked + $track': {
          backgroundColor: theme.palette.secondary.light,
        },
      },
      checked: {},
      track: {},
  };
})(Switch);


export interface ISimpleSwitch {
    type: boolean;
    onSwitch: (state: boolean) => void;
};


export const SimpleSwitch: FunctionComponent<ISimpleSwitch> = (props): JSX.Element => {
  const { type, onSwitch } = props;

  const [state, setState] = useState ({
    checkedA: type,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //side-effects
  useEffect(()=>{
      onSwitch(state.checkedA);
  },[state.checkedA, onSwitch]);

  return (
    <FormGroup>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Since</Grid>
          <Grid item>
            <PurpleSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />
          </Grid>
          <Grid item>Until</Grid>
        </Grid>
    </FormGroup>
  );
};