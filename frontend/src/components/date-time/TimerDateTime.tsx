import 'date-fns';
import React, { FunctionComponent, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MomentUtils from "@date-io/moment";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker
} from "material-ui-pickers";


interface ITimerDateTimeProps {
  date: Date;
  onChange: (date: Date) => void;
}

  
const useStyles = makeStyles((theme: Theme) =>
    createStyles(
      {
        centerDiv: {
          // border: '1px solid red',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        datePicker : {
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          '&:first-child':{
            paddingTop: 13
          }
        },
        //Media Queries - IPhone 6,7,8,X,XR Galaxy S
        // [theme.breakpoints.between(360,414)]: {
        // },
        [theme.breakpoints.up('md')]: {
          centerDiv: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }
        },
      }
    )
);

export const TimerDateTime: FunctionComponent<ITimerDateTimeProps> = (props) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(new Date());
  const classes = useStyles();
  const { date, onChange } = props;

  const handleDateChange = (date: any) => {
    // console.log('Data is: ', date);  
    onChange(date);
  };

  // componentDidMount
  useEffect(()=>{
    setSelectedDate(date);
  },[date]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid item xs={12} md={12} className={classes.centerDiv}>
        <Grid item xs={12} md={4} className={classes.datePicker}>
            <DatePicker
              keyboard
              placeholder="MM/DD/YYYY"
              format={"MM/DD/YYYY"}
              // handle clearing outside => pass plain array if you are not controlling value outside
              mask={value =>
                value
                  ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                  : []
              }
              value={selectedDate}
              onChange={handleDateChange}
              label="Choose Date"
              disableOpenOnEnter
              animateYearScrolling={false}
              autoOk={true}
              clearable
              />
        </Grid>
        <Grid item xs={12} md={4} className={classes.datePicker}>
            <TimePicker
                keyboard
                margin="normal"
                id="time-picker"
                label="Choose Time"
                value={selectedDate}
                onChange={handleDateChange}
                autoOk={true}
                clearable
                />
        </Grid>
        </Grid>
    </MuiPickersUtilsProvider>
  );
};