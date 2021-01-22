import React,{ FunctionComponent, useState, useEffect } from 'react';
import './countdown-svg.styles.css';

const zerofill = (num: number) => ((num < 10 && num >= 0) ? `0${num}` : num);

interface ICountdownSVGProps {
    until: Date;
}

interface ISvgCircle {
    className: any;
    max: number;
    done: number;
    strokeWidth: number;
    radius: number;
    stroke: string;
}

const SvgCircle: FunctionComponent<ISvgCircle> = (props) => {
    const [ className, setClassName] = useState(props.className);
    const [done, setDone] = useState<number>(0);
    const [max, setMax] = useState<number>(24);
    const [radius, setRadius] = useState<number>(72);
    const [stroke, setStroke] = useState<string>('#e91e63');
    const [strokeWidth, setStrokeWidth] = useState<number>(8);
    let size: number = (radius + strokeWidth) * 2;
    let length: number = Math.ceil(2 * radius * Math.PI);
    let remainingLength: number = length - (Math.ceil(2 * radius * Math.PI) * (done / max));

    useEffect(()=>{
        const { strokeWidth, radius, done, max } = props;
        // re-calculate width and stroke
        size = (radius + strokeWidth) * 2;
        length = Math.ceil(2 * radius * Math.PI);
        remainingLength = length - (Math.ceil(2 * radius * Math.PI) * (done / max));
        // set state properties
        setDone(done);
        setMax(max);
        setRadius(radius);
        setStroke(stroke);
        setStrokeWidth(strokeWidth);

    },[props]);
    return (
        <svg 
            className={className}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
        >
        <g>
            <circle 
                className="circle"
                r={radius}
                cx={radius + strokeWidth} 
                cy={radius + strokeWidth} 
                stroke={stroke}
                strokeDasharray={length}
                strokeDashoffset={remainingLength}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                fill="none" 
            />
        <circle 
          className="circle--bg"
          r={radius} 
          cx={radius + strokeWidth}
          cy={radius + strokeWidth} 
          stroke="rgba(0, 0, 0, .1)"
          strokeLinecap="round"
          strokeWidth={strokeWidth} 
          fill="none" 
        />
      </g>
    </svg>
  )
};

/**
 * PAJ - Equivalent to Clock.jsx from Tech-Quest
 * @param props 
 */
const CountdownSVG: FunctionComponent<ICountdownSVGProps> = (props) => {
    // states
    const [days, setDays] = useState(365);
    const [hours, setHours] = useState(24);
    const [minutes, setMinutes] = useState(60);
    const [seconds, setSeconds] = useState(60);
    const [intervalRef, setIntervalRef] = useState(null);
    const [isTimerOver, setTimerOver] = useState(false);
    const [content, setContent] = useState<JSX.Element>(<React.Fragment>Loading...</React.Fragment>);

    const startTimer = (until: Date) => {
        return setInterval(() => getTimeUntil(until), 1000);
    };

    const getTimeUntil = (until: Date)=>{
        // console.log('Timer is: ', until);
        const time = until.getTime() - new Date().getTime();
        const seconds = Math.floor(time / 1000 % 60);
        const minutes = Math.floor(time / 1000 / 60 % 60);
        const hours = Math.floor(time / (1000 * 60 * 60) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        // update-states
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        if (time < 0) {
            setTimerOver(true);
        } else {
            setTimerOver(false);
        }
    };

    //side-effects
    useEffect(()=>{
        const { until } = props;
        // startTimer
        const timeInterval =startTimer(until);
        return ()=> {
            clearInterval(timeInterval);
        }
    },[props]);

    useEffect(()=>{
        if(isTimerOver) {
            setContent (
               <React.Fragment>Timer Completed !!</React.Fragment> 
            );
        } else {
            setContent (
                <React.Fragment>
                    <div className="clock__display">
                        <SvgCircle className="clock__circle" max={365} done={days} radius={72} stroke={'#e91e63'}
                            strokeWidth={8} />
                        <div className="clock__text clock__text--days">
                            <span className="clock__amount">{zerofill(days)}</span>
                            <span className="clock__unit">days</span>
                        </div>
                    </div>
                    <div className="clock__display">
                        <SvgCircle className="clock__circle" max={24} done={hours} radius={72} stroke={'#e91e63'}
                            strokeWidth={8} />
                        <div className="clock__text clock__text--hours">
                            <span className="clock__amount">{zerofill(hours)}</span>
                            <span className="clock__unit">hours</span>
                        </div>
                    </div>
                    <div className="clock__display">
                        <SvgCircle className="clock__circle" max={60} done={minutes} radius={72} stroke={'#e91e63'}
                            strokeWidth={8} />
                        <div className="clock__text clock__text--minutes">
                            <span className="clock__amount">{zerofill(minutes)}</span>
                            <span className="clock__unit">minutes</span>
                        </div>
                    </div>
                    <div className="clock__display">
                        <SvgCircle className="clock__circle" max={60} done={seconds} radius={72} stroke={'#e91e63'}
                            strokeWidth={8} />
                        <div className="clock__text clock__text--seconds">
                            <span className="clock__amount">{zerofill(seconds)}</span>
                            <span className="clock__unit">seconds</span>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    },[isTimerOver, days, hours, minutes, seconds]);

    return (
      <div className="clock">
        {content}
      </div>
    );
};

export default CountdownSVG;