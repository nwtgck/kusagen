import * as React from "react";
import {renderToString} from 'react-dom/server';
import * as http from 'http';
import {Day, Week, YearMonthDate} from "./types";

// TODO: Hard code

process.env.TZ = 'Asia/Tokyo';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

function GraphDay(props: {day: Day, y: number}) {
  return <rect
    className="day"
    width={12}
    height={12}
    x={16}
    y={props.y}
    fill={props.day.color}
    data-count={15}
    data-date={`${props.day.date.year}-${props.day.date.month}-${props.day.date.day}`}
  />
}

function GraphWeek(props: {week: Week, x: number}) {
  return (
    <g transform={`translate(${props.x}, 0)`}>
      {
        props.week.map((y, i) => <GraphDay key={i} y={i * 15} day={props.week[i]}/>)
      }
    </g>
  )
}


function* range({from, to, step}: {from: number, to: number, step: number}) {
  for(let i = from; i <= to; i += step) {
    yield i;
  }
}

const dummyDay = {
  date: {
    year: 2019,
    month: 4,
    day: 21,
  },
  color: '#7bc96f',
};
const weeks: Week[] = [...range({from: 0, to: 832, step: 16})]
  .map((x) => [dummyDay, dummyDay, dummyDay, dummyDay, dummyDay, dummyDay, dummyDay]) ;

function GraphYear(props: {weeks: readonly Week[]}) {
  return (
    <svg width={828} height={128} className="js-calendar-graph-svg">
      <g
        transform="translate(10, 20)"
      >
        {
          props.weeks.map((week, i) => <GraphWeek key={i} week={week} x={i * 16}/>)
        }
        {/* TODO: Hard code */}
        <text x={16} y={-9} className="month">
          Apr
        </text>
        <text x={46} y={-9} className="month">
          May
        </text>
        <text x={106} y={-9} className="month">
          Jun
        </text>
        <text x={181} y={-9} className="month">
          Jul
        </text>
        <text x={241} y={-9} className="month">
          Aug
        </text>
        <text x={301} y={-9} className="month">
          Sep
        </text>
        <text x={376} y={-9} className="month">
          Oct
        </text>
        <text x={436} y={-9} className="month">
          Nov
        </text>
        <text x={496} y={-9} className="month">
          Dec
        </text>
        <text x={571} y={-9} className="month">
          Jan
        </text>
        <text x={631} y={-9} className="month">
          Feb
        </text>
        <text x={691} y={-9} className="month">
          Mar
        </text>
        <text x={766} y={-9} className="month">
          Apr
        </text>
        <text
          textAnchor="start"
          className="wday"
          dx={-10}
          dy={8}
          style={{ display: "none" }}
        >
          Sun
        </text>
        <text textAnchor="start" className="wday" dx={-10} dy={25}>
          Mon
        </text>
        <text
          textAnchor="start"
          className="wday"
          dx={-10}
          dy={32}
          style={{ display: "none" }}
        >
          Tue
        </text>
        <text textAnchor="start" className="wday" dx={-10} dy={56}>
          Wed
        </text>
        <text
          textAnchor="start"
          className="wday"
          dx={-10}
          dy={57}
          style={{ display: "none" }}
        >
          Thu
        </text>
        <text textAnchor="start" className="wday" dx={-10} dy={85}>
          Fri
        </text>
        <text
          textAnchor="start"
          className="wday"
          dx={-10}
          dy={81}
          style={{ display: "none" }}
        >
          Sat
        </text>
      </g>
    </svg>
  )
}

// (base: https://github.com/sallar/github-contributions-chart/blob/f3698a8f8718abfaa99cb546750ce42f2515a220/src/utils/api/fetch.js#L5-L11)
const colorMap = {
  4: "#196127",
  3: "#239a3b",
  2: "#7bc96f",
  1: "#c6e48b",
  0: "#ebedf0",
};

function countToIntensity(count: number, max: number): "0" | "1" | "2" | "3" | "4" {
  const r = count / max;
  if (r === 0) {
    return "0";
  } else if (r < 0.245) {
    return "1";
  } else if (r < 0.48){
    return "2";
  } else if (r < 0.78) {
    return "3";
  } else {
    return "4";
  }
}

const data = [[{"count":15, "date":{"year":2019, "month":4, "day":22}}, {"count":12, "date":{"year":2019, "month":4, "day":23}}, {"count":16, "date":{"year":2019, "month":4, "day":24}}, {"count":23, "date":{"year":2019, "month":4, "day":25}}, {"count":14, "date":{"year":2019, "month":4, "day":26}}, {"count":18, "date":{"year":2019, "month":4, "day":27}}, {"count":8, "date":{"year":2019, "month":4, "day":28}}], [{"count":21, "date":{"year":2019, "month":4, "day":29}}, {"count":30, "date":{"year":2019, "month":4, "day":30}}, {"count":18, "date":{"year":2019, "month":5, "day":1}}, {"count":24, "date":{"year":2019, "month":5, "day":2}}, {"count":13, "date":{"year":2019, "month":5, "day":3}}, {"count":10, "date":{"year":2019, "month":5, "day":4}}, {"count":6, "date":{"year":2019, "month":5, "day":5}}], [{"count":18, "date":{"year":2019, "month":5, "day":6}}, {"count":6, "date":{"year":2019, "month":5, "day":7}}, {"count":15, "date":{"year":2019, "month":5, "day":8}}, {"count":19, "date":{"year":2019, "month":5, "day":9}}, {"count":10, "date":{"year":2019, "month":5, "day":10}}, {"count":14, "date":{"year":2019, "month":5, "day":11}}, {"count":15, "date":{"year":2019, "month":5, "day":12}}], [{"count":4, "date":{"year":2019, "month":5, "day":13}}, {"count":22, "date":{"year":2019, "month":5, "day":14}}, {"count":17, "date":{"year":2019, "month":5, "day":15}}, {"count":28, "date":{"year":2019, "month":5, "day":16}}, {"count":2, "date":{"year":2019, "month":5, "day":17}}, {"count":27, "date":{"year":2019, "month":5, "day":18}}, {"count":12, "date":{"year":2019, "month":5, "day":19}}], [{"count":14, "date":{"year":2019, "month":5, "day":20}}, {"count":19, "date":{"year":2019, "month":5, "day":21}}, {"count":13, "date":{"year":2019, "month":5, "day":22}}, {"count":20, "date":{"year":2019, "month":5, "day":23}}, {"count":37, "date":{"year":2019, "month":5, "day":24}}, {"count":10, "date":{"year":2019, "month":5, "day":25}}, {"count":29, "date":{"year":2019, "month":5, "day":26}}], [{"count":11, "date":{"year":2019, "month":5, "day":27}}, {"count":31, "date":{"year":2019, "month":5, "day":28}}, {"count":21, "date":{"year":2019, "month":5, "day":29}}, {"count":26, "date":{"year":2019, "month":5, "day":30}}, {"count":18, "date":{"year":2019, "month":5, "day":31}}, {"count":53, "date":{"year":2019, "month":6, "day":1}}, {"count":20, "date":{"year":2019, "month":6, "day":2}}], [{"count":31, "date":{"year":2019, "month":6, "day":3}}, {"count":31, "date":{"year":2019, "month":6, "day":4}}, {"count":14, "date":{"year":2019, "month":6, "day":5}}, {"count":31, "date":{"year":2019, "month":6, "day":6}}, {"count":22, "date":{"year":2019, "month":6, "day":7}}, {"count":13, "date":{"year":2019, "month":6, "day":8}}, {"count":20, "date":{"year":2019, "month":6, "day":9}}], [{"count":9, "date":{"year":2019, "month":6, "day":10}}, {"count":13, "date":{"year":2019, "month":6, "day":11}}, {"count":30, "date":{"year":2019, "month":6, "day":12}}, {"count":24, "date":{"year":2019, "month":6, "day":13}}, {"count":14, "date":{"year":2019, "month":6, "day":14}}, {"count":26, "date":{"year":2019, "month":6, "day":15}}, {"count":31, "date":{"year":2019, "month":6, "day":16}}], [{"count":16, "date":{"year":2019, "month":6, "day":17}}, {"count":31, "date":{"year":2019, "month":6, "day":18}}, {"count":11, "date":{"year":2019, "month":6, "day":19}}, {"count":4, "date":{"year":2019, "month":6, "day":20}}, {"count":23, "date":{"year":2019, "month":6, "day":21}}, {"count":8, "date":{"year":2019, "month":6, "day":22}}, {"count":22, "date":{"year":2019, "month":6, "day":23}}], [{"count":4, "date":{"year":2019, "month":6, "day":24}}, {"count":21, "date":{"year":2019, "month":6, "day":25}}, {"count":14, "date":{"year":2019, "month":6, "day":26}}, {"count":9, "date":{"year":2019, "month":6, "day":27}}, {"count":17, "date":{"year":2019, "month":6, "day":28}}, {"count":18, "date":{"year":2019, "month":6, "day":29}}, {"count":4, "date":{"year":2019, "month":6, "day":30}}], [{"count":11, "date":{"year":2019, "month":7, "day":1}}, {"count":16, "date":{"year":2019, "month":7, "day":2}}, {"count":14, "date":{"year":2019, "month":7, "day":3}}, {"count":13, "date":{"year":2019, "month":7, "day":4}}, {"count":23, "date":{"year":2019, "month":7, "day":5}}, {"count":11, "date":{"year":2019, "month":7, "day":6}}, {"count":31, "date":{"year":2019, "month":7, "day":7}}], [{"count":13, "date":{"year":2019, "month":7, "day":8}}, {"count":5, "date":{"year":2019, "month":7, "day":9}}, {"count":15, "date":{"year":2019, "month":7, "day":10}}, {"count":18, "date":{"year":2019, "month":7, "day":11}}, {"count":25, "date":{"year":2019, "month":7, "day":12}}, {"count":29, "date":{"year":2019, "month":7, "day":13}}, {"count":51, "date":{"year":2019, "month":7, "day":14}}], [{"count":35, "date":{"year":2019, "month":7, "day":15}}, {"count":13, "date":{"year":2019, "month":7, "day":16}}, {"count":44, "date":{"year":2019, "month":7, "day":17}}, {"count":18, "date":{"year":2019, "month":7, "day":18}}, {"count":7, "date":{"year":2019, "month":7, "day":19}}, {"count":28, "date":{"year":2019, "month":7, "day":20}}, {"count":21, "date":{"year":2019, "month":7, "day":21}}], [{"count":10, "date":{"year":2019, "month":7, "day":22}}, {"count":8, "date":{"year":2019, "month":7, "day":23}}, {"count":14, "date":{"year":2019, "month":7, "day":24}}, {"count":5, "date":{"year":2019, "month":7, "day":25}}, {"count":21, "date":{"year":2019, "month":7, "day":26}}, {"count":2, "date":{"year":2019, "month":7, "day":27}}, {"count":20, "date":{"year":2019, "month":7, "day":28}}], [{"count":11, "date":{"year":2019, "month":7, "day":29}}, {"count":15, "date":{"year":2019, "month":7, "day":30}}, {"count":8, "date":{"year":2019, "month":7, "day":31}}, {"count":33, "date":{"year":2019, "month":8, "day":1}}, {"count":10, "date":{"year":2019, "month":8, "day":2}}, {"count":9, "date":{"year":2019, "month":8, "day":3}}, {"count":14, "date":{"year":2019, "month":8, "day":4}}], [{"count":3, "date":{"year":2019, "month":8, "day":5}}, {"count":5, "date":{"year":2019, "month":8, "day":6}}, {"count":11, "date":{"year":2019, "month":8, "day":7}}, {"count":21, "date":{"year":2019, "month":8, "day":8}}, {"count":22, "date":{"year":2019, "month":8, "day":9}}, {"count":6, "date":{"year":2019, "month":8, "day":10}}, {"count":4, "date":{"year":2019, "month":8, "day":11}}], [{"count":4, "date":{"year":2019, "month":8, "day":12}}, {"count":4, "date":{"year":2019, "month":8, "day":13}}, {"count":2, "date":{"year":2019, "month":8, "day":14}}, {"count":4, "date":{"year":2019, "month":8, "day":15}}, {"count":4, "date":{"year":2019, "month":8, "day":16}}, {"count":18, "date":{"year":2019, "month":8, "day":17}}, {"count":16, "date":{"year":2019, "month":8, "day":18}}], [{"count":19, "date":{"year":2019, "month":8, "day":19}}, {"count":11, "date":{"year":2019, "month":8, "day":20}}, {"count":15, "date":{"year":2019, "month":8, "day":21}}, {"count":4, "date":{"year":2019, "month":8, "day":22}}, {"count":2, "date":{"year":2019, "month":8, "day":23}}, {"count":19, "date":{"year":2019, "month":8, "day":24}}, {"count":11, "date":{"year":2019, "month":8, "day":25}}], [{"count":9, "date":{"year":2019, "month":8, "day":26}}, {"count":28, "date":{"year":2019, "month":8, "day":27}}, {"count":7, "date":{"year":2019, "month":8, "day":28}}, {"count":19, "date":{"year":2019, "month":8, "day":29}}, {"count":6, "date":{"year":2019, "month":8, "day":30}}, {"count":21, "date":{"year":2019, "month":8, "day":31}}, {"count":9, "date":{"year":2019, "month":9, "day":1}}], [{"count":2, "date":{"year":2019, "month":9, "day":2}}, {"count":5, "date":{"year":2019, "month":9, "day":3}}, {"count":6, "date":{"year":2019, "month":9, "day":4}}, {"count":2, "date":{"year":2019, "month":9, "day":5}}, {"count":18, "date":{"year":2019, "month":9, "day":6}}, {"count":5, "date":{"year":2019, "month":9, "day":7}}, {"count":4, "date":{"year":2019, "month":9, "day":8}}], [{"count":4, "date":{"year":2019, "month":9, "day":9}}, {"count":2, "date":{"year":2019, "month":9, "day":10}}, {"count":7, "date":{"year":2019, "month":9, "day":11}}, {"count":10, "date":{"year":2019, "month":9, "day":12}}, {"count":8, "date":{"year":2019, "month":9, "day":13}}, {"count":9, "date":{"year":2019, "month":9, "day":14}}, {"count":13, "date":{"year":2019, "month":9, "day":15}}], [{"count":10, "date":{"year":2019, "month":9, "day":16}}, {"count":5, "date":{"year":2019, "month":9, "day":17}}, {"count":6, "date":{"year":2019, "month":9, "day":18}}, {"count":11, "date":{"year":2019, "month":9, "day":19}}, {"count":14, "date":{"year":2019, "month":9, "day":20}}, {"count":2, "date":{"year":2019, "month":9, "day":21}}, {"count":26, "date":{"year":2019, "month":9, "day":22}}], [{"count":16, "date":{"year":2019, "month":9, "day":23}}, {"count":13, "date":{"year":2019, "month":9, "day":24}}, {"count":14, "date":{"year":2019, "month":9, "day":25}}, {"count":5, "date":{"year":2019, "month":9, "day":26}}, {"count":8, "date":{"year":2019, "month":9, "day":27}}, {"count":5, "date":{"year":2019, "month":9, "day":28}}, {"count":10, "date":{"year":2019, "month":9, "day":29}}], [{"count":30, "date":{"year":2019, "month":9, "day":30}}, {"count":9, "date":{"year":2019, "month":10, "day":1}}, {"count":12, "date":{"year":2019, "month":10, "day":2}}, {"count":14, "date":{"year":2019, "month":10, "day":3}}, {"count":7, "date":{"year":2019, "month":10, "day":4}}, {"count":5, "date":{"year":2019, "month":10, "day":5}}, {"count":7, "date":{"year":2019, "month":10, "day":6}}], [{"count":10, "date":{"year":2019, "month":10, "day":7}}, {"count":10, "date":{"year":2019, "month":10, "day":8}}, {"count":10, "date":{"year":2019, "month":10, "day":9}}, {"count":9, "date":{"year":2019, "month":10, "day":10}}, {"count":7, "date":{"year":2019, "month":10, "day":11}}, {"count":8, "date":{"year":2019, "month":10, "day":12}}, {"count":8, "date":{"year":2019, "month":10, "day":13}}], [{"count":21, "date":{"year":2019, "month":10, "day":14}}, {"count":10, "date":{"year":2019, "month":10, "day":15}}, {"count":8, "date":{"year":2019, "month":10, "day":16}}, {"count":13, "date":{"year":2019, "month":10, "day":17}}, {"count":17, "date":{"year":2019, "month":10, "day":18}}, {"count":11, "date":{"year":2019, "month":10, "day":19}}, {"count":9, "date":{"year":2019, "month":10, "day":20}}], [{"count":5, "date":{"year":2019, "month":10, "day":21}}, {"count":8, "date":{"year":2019, "month":10, "day":22}}, {"count":16, "date":{"year":2019, "month":10, "day":23}}, {"count":8, "date":{"year":2019, "month":10, "day":24}}, {"count":4, "date":{"year":2019, "month":10, "day":25}}, {"count":7, "date":{"year":2019, "month":10, "day":26}}, {"count":4, "date":{"year":2019, "month":10, "day":27}}], [{"count":1, "date":{"year":2019, "month":10, "day":28}}, {"count":2, "date":{"year":2019, "month":10, "day":29}}, {"count":5, "date":{"year":2019, "month":10, "day":30}}, {"count":2, "date":{"year":2019, "month":10, "day":31}}, {"count":2, "date":{"year":2019, "month":11, "day":1}}, {"count":9, "date":{"year":2019, "month":11, "day":2}}, {"count":8, "date":{"year":2019, "month":11, "day":3}}], [{"count":2, "date":{"year":2019, "month":11, "day":4}}, {"count":15, "date":{"year":2019, "month":11, "day":5}}, {"count":7, "date":{"year":2019, "month":11, "day":6}}, {"count":24, "date":{"year":2019, "month":11, "day":7}}, {"count":7, "date":{"year":2019, "month":11, "day":8}}, {"count":15, "date":{"year":2019, "month":11, "day":9}}, {"count":7, "date":{"year":2019, "month":11, "day":10}}], [{"count":5, "date":{"year":2019, "month":11, "day":11}}, {"count":11, "date":{"year":2019, "month":11, "day":12}}, {"count":14, "date":{"year":2019, "month":11, "day":13}}, {"count":4, "date":{"year":2019, "month":11, "day":14}}, {"count":15, "date":{"year":2019, "month":11, "day":15}}, {"count":7, "date":{"year":2019, "month":11, "day":16}}, {"count":2, "date":{"year":2019, "month":11, "day":17}}], [{"count":13, "date":{"year":2019, "month":11, "day":18}}, {"count":6, "date":{"year":2019, "month":11, "day":19}}, {"count":7, "date":{"year":2019, "month":11, "day":20}}, {"count":3, "date":{"year":2019, "month":11, "day":21}}, {"count":6, "date":{"year":2019, "month":11, "day":22}}, {"count":1, "date":{"year":2019, "month":11, "day":23}}, {"count":18, "date":{"year":2019, "month":11, "day":24}}], [{"count":6, "date":{"year":2019, "month":11, "day":25}}, {"count":3, "date":{"year":2019, "month":11, "day":26}}, {"count":11, "date":{"year":2019, "month":11, "day":27}}, {"count":16, "date":{"year":2019, "month":11, "day":28}}, {"count":8, "date":{"year":2019, "month":11, "day":29}}, {"count":14, "date":{"year":2019, "month":11, "day":30}}, {"count":8, "date":{"year":2019, "month":12, "day":1}}], [{"count":3, "date":{"year":2019, "month":12, "day":2}}, {"count":7, "date":{"year":2019, "month":12, "day":3}}, {"count":18, "date":{"year":2019, "month":12, "day":4}}, {"count":7, "date":{"year":2019, "month":12, "day":5}}, {"count":9, "date":{"year":2019, "month":12, "day":6}}, {"count":6, "date":{"year":2019, "month":12, "day":7}}, {"count":8, "date":{"year":2019, "month":12, "day":8}}], [{"count":6, "date":{"year":2019, "month":12, "day":9}}, {"count":14, "date":{"year":2019, "month":12, "day":10}}, {"count":3, "date":{"year":2019, "month":12, "day":11}}, {"count":9, "date":{"year":2019, "month":12, "day":12}}, {"count":23, "date":{"year":2019, "month":12, "day":13}}, {"count":5, "date":{"year":2019, "month":12, "day":14}}, {"count":2, "date":{"year":2019, "month":12, "day":15}}], [{"count":13, "date":{"year":2019, "month":12, "day":16}}, {"count":10, "date":{"year":2019, "month":12, "day":17}}, {"count":19, "date":{"year":2019, "month":12, "day":18}}, {"count":16, "date":{"year":2019, "month":12, "day":19}}, {"count":16, "date":{"year":2019, "month":12, "day":20}}, {"count":15, "date":{"year":2019, "month":12, "day":21}}, {"count":14, "date":{"year":2019, "month":12, "day":22}}], [{"count":12, "date":{"year":2019, "month":12, "day":23}}, {"count":12, "date":{"year":2019, "month":12, "day":24}}, {"count":7, "date":{"year":2019, "month":12, "day":25}}, {"count":18, "date":{"year":2019, "month":12, "day":26}}, {"count":13, "date":{"year":2019, "month":12, "day":27}}, {"count":17, "date":{"year":2019, "month":12, "day":28}}, {"count":10, "date":{"year":2019, "month":12, "day":29}}], [{"count":9, "date":{"year":2019, "month":12, "day":30}}, {"count":10, "date":{"year":2019, "month":12, "day":31}}, {"count":7, "date":{"year":2020, "month":1, "day":1}}, {"count":10, "date":{"year":2020, "month":1, "day":2}}, {"count":4, "date":{"year":2020, "month":1, "day":3}}, {"count":15, "date":{"year":2020, "month":1, "day":4}}, {"count":3, "date":{"year":2020, "month":1, "day":5}}], [{"count":16, "date":{"year":2020, "month":1, "day":6}}, {"count":10, "date":{"year":2020, "month":1, "day":7}}, {"count":11, "date":{"year":2020, "month":1, "day":8}}, {"count":6, "date":{"year":2020, "month":1, "day":9}}, {"count":9, "date":{"year":2020, "month":1, "day":10}}, {"count":21, "date":{"year":2020, "month":1, "day":11}}, {"count":16, "date":{"year":2020, "month":1, "day":12}}], [{"count":20, "date":{"year":2020, "month":1, "day":13}}, {"count":10, "date":{"year":2020, "month":1, "day":14}}, {"count":15, "date":{"year":2020, "month":1, "day":15}}, {"count":11, "date":{"year":2020, "month":1, "day":16}}, {"count":4, "date":{"year":2020, "month":1, "day":17}}, {"count":13, "date":{"year":2020, "month":1, "day":18}}, {"count":18, "date":{"year":2020, "month":1, "day":19}}], [{"count":6, "date":{"year":2020, "month":1, "day":20}}, {"count":2, "date":{"year":2020, "month":1, "day":21}}, {"count":17, "date":{"year":2020, "month":1, "day":22}}, {"count":12, "date":{"year":2020, "month":1, "day":23}}, {"count":8, "date":{"year":2020, "month":1, "day":24}}, {"count":19, "date":{"year":2020, "month":1, "day":25}}, {"count":6, "date":{"year":2020, "month":1, "day":26}}], [{"count":6, "date":{"year":2020, "month":1, "day":27}}, {"count":7, "date":{"year":2020, "month":1, "day":28}}, {"count":7, "date":{"year":2020, "month":1, "day":29}}, {"count":15, "date":{"year":2020, "month":1, "day":30}}, {"count":10, "date":{"year":2020, "month":1, "day":31}}, {"count":10, "date":{"year":2020, "month":2, "day":1}}, {"count":33, "date":{"year":2020, "month":2, "day":2}}], [{"count":25, "date":{"year":2020, "month":2, "day":3}}, {"count":13, "date":{"year":2020, "month":2, "day":4}}, {"count":26, "date":{"year":2020, "month":2, "day":5}}, {"count":44, "date":{"year":2020, "month":2, "day":6}}, {"count":30, "date":{"year":2020, "month":2, "day":7}}, {"count":38, "date":{"year":2020, "month":2, "day":8}}, {"count":27, "date":{"year":2020, "month":2, "day":9}}], [{"count":44, "date":{"year":2020, "month":2, "day":10}}, {"count":27, "date":{"year":2020, "month":2, "day":11}}, {"count":17, "date":{"year":2020, "month":2, "day":12}}, {"count":29, "date":{"year":2020, "month":2, "day":13}}, {"count":21, "date":{"year":2020, "month":2, "day":14}}, {"count":5, "date":{"year":2020, "month":2, "day":15}}, {"count":3, "date":{"year":2020, "month":2, "day":16}}], [{"count":18, "date":{"year":2020, "month":2, "day":17}}, {"count":5, "date":{"year":2020, "month":2, "day":18}}, {"count":14, "date":{"year":2020, "month":2, "day":19}}, {"count":16, "date":{"year":2020, "month":2, "day":20}}, {"count":39, "date":{"year":2020, "month":2, "day":21}}, {"count":24, "date":{"year":2020, "month":2, "day":22}}, {"count":30, "date":{"year":2020, "month":2, "day":23}}], [{"count":17, "date":{"year":2020, "month":2, "day":24}}, {"count":20, "date":{"year":2020, "month":2, "day":25}}, {"count":14, "date":{"year":2020, "month":2, "day":26}}, {"count":33, "date":{"year":2020, "month":2, "day":27}}, {"count":21, "date":{"year":2020, "month":2, "day":28}}, {"count":30, "date":{"year":2020, "month":2, "day":29}}, {"count":35, "date":{"year":2020, "month":3, "day":1}}], [{"count":15, "date":{"year":2020, "month":3, "day":2}}, {"count":13, "date":{"year":2020, "month":3, "day":3}}, {"count":40, "date":{"year":2020, "month":3, "day":4}}, {"count":45, "date":{"year":2020, "month":3, "day":5}}, {"count":24, "date":{"year":2020, "month":3, "day":6}}, {"count":51, "date":{"year":2020, "month":3, "day":7}}, {"count":16, "date":{"year":2020, "month":3, "day":8}}], [{"count":31, "date":{"year":2020, "month":3, "day":9}}, {"count":42, "date":{"year":2020, "month":3, "day":10}}, {"count":39, "date":{"year":2020, "month":3, "day":11}}, {"count":15, "date":{"year":2020, "month":3, "day":12}}, {"count":38, "date":{"year":2020, "month":3, "day":13}}, {"count":17, "date":{"year":2020, "month":3, "day":14}}, {"count":31, "date":{"year":2020, "month":3, "day":15}}], [{"count":7, "date":{"year":2020, "month":3, "day":16}}, {"count":2, "date":{"year":2020, "month":3, "day":17}}, {"count":14, "date":{"year":2020, "month":3, "day":18}}, {"count":14, "date":{"year":2020, "month":3, "day":19}}, {"count":16, "date":{"year":2020, "month":3, "day":20}}, {"count":2, "date":{"year":2020, "month":3, "day":21}}, {"count":14, "date":{"year":2020, "month":3, "day":22}}], [{"count":10, "date":{"year":2020, "month":3, "day":23}}, {"count":24, "date":{"year":2020, "month":3, "day":24}}, {"count":6, "date":{"year":2020, "month":3, "day":25}}, {"count":10, "date":{"year":2020, "month":3, "day":26}}, {"count":5, "date":{"year":2020, "month":3, "day":27}}, {"count":2, "date":{"year":2020, "month":3, "day":28}}, {"count":4, "date":{"year":2020, "month":3, "day":29}}], [{"count":26, "date":{"year":2020, "month":3, "day":30}}, {"count":22, "date":{"year":2020, "month":3, "day":31}}, {"count":15, "date":{"year":2020, "month":4, "day":1}}, {"count":10, "date":{"year":2020, "month":4, "day":2}}, {"count":21, "date":{"year":2020, "month":4, "day":3}}, {"count":21, "date":{"year":2020, "month":4, "day":4}}, {"count":1, "date":{"year":2020, "month":4, "day":5}}], [{"count":7, "date":{"year":2020, "month":4, "day":6}}, {"count":7, "date":{"year":2020, "month":4, "day":7}}, {"count":23, "date":{"year":2020, "month":4, "day":8}}, {"count":16, "date":{"year":2020, "month":4, "day":9}}, {"count":12, "date":{"year":2020, "month":4, "day":10}}, {"count":9, "date":{"year":2020, "month":4, "day":11}}, {"count":18, "date":{"year":2020, "month":4, "day":12}}], [{"count":5, "date":{"year":2020, "month":4, "day":13}}, {"count":9, "date":{"year":2020, "month":4, "day":14}}, {"count":10, "date":{"year":2020, "month":4, "day":15}}, {"count":9, "date":{"year":2020, "month":4, "day":16}}, {"count":10, "date":{"year":2020, "month":4, "day":17}}, {"count":4, "date":{"year":2020, "month":4, "day":18}}, {"count":7, "date":{"year":2020, "month":4, "day":19}}], [{"count":3, "date":{"year":2020, "month":4, "day":20}}, {"count":5, "date":{"year":2020, "month":4, "day":21}}, {"count":14, "date":{"year":2020, "month":4, "day":22}}, {"count":7, "date":{"year":2020, "month":4, "day":23}}, {"count":8, "date":{"year":2020, "month":4, "day":24}}]];

function createWeek(): Week[] {
  // TODO: Hard code
  const max = 53;

  const weeks: Week[] = data.map((e1) => {
    const days = e1.map((e) => {
      const intensity = countToIntensity(e.count, max);
      const color = colorMap[intensity]
      const day: Day = {
        date: e.date,
        color,
      };
      return day;
    });

    if (days.length !== 7) {
      // TODO: Hard code
      days.push(
        {color: 'white', "date":{"year":2019, "month":4, "day":22}},
        {color: 'white', "date":{"year":2019, "month":4, "day":22}},
      )
    }
    return days as Week;
  });
  return weeks
}

const ws = createWeek();

function getCalendarStartDate(today: Date): Date {
  const lastYearDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  // TODO: Smarter way
  let calendarStartDate: Date = lastYearDate;
  while(calendarStartDate.getDay() !== 0) {
    calendarStartDate = new Date(calendarStartDate.getTime() -  86400 * 1000);
  }
  return calendarStartDate
}

function* dropWhile<T>(array: readonly T[], p: (v: T) => boolean) {
  let shouldDrop = true;
  for(const e of array) {
    if (shouldDrop) {
      if(!p(e)) {
        shouldDrop = false;
        yield e;
      }
    } else {
      yield e
    }
  }
}

// (base: https://www.consolelog.io/group-by-in-javascript/)
function countBy<T>(array: readonly T[], prop: (v: T) => string) {
  return array.reduce((groups: {[key: string]: number}, item) => {
    const val = prop(item);
    groups[val] = groups[val] ?? 0;
    groups[val] += 1;
    return groups
  }, {})
}

function dateToString(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function datesToCount(dates: readonly Date[]) {
  return countBy(dates, dateToString);
}

function* generateDays(today: Date, dates: readonly Date[]) {
  let date = getCalendarStartDate(today);
  const counts = datesToCount([...dropWhile(dates, d => d < date)]);
  while (+date <= +today) {
    const key = dateToString(date);
    const count: number = (key in counts) ? counts[key]: 0;
    yield {
      date: {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      },
      count,
    };
    date = new Date(+date +  86400 * 1000);
  }
}

function* generateWeeks(today: Date, dates: readonly Date[]) {
  // TODO: Hard code
  const max = 22;
  const dayIter = generateDays(today, dates);
  let daysInWeek: Day[] = [];
  for (const day of dayIter) {
    const intensity = countToIntensity(day.count, max);
    daysInWeek.push({
      date: day.date,
      color: colorMap[intensity]
    });
    if (daysInWeek.length === 7) {
      yield daysInWeek;
      // Clear
      daysInWeek = [];
    }
  }
}

const dates = [
  new Date(2019, 4 -1, 19),
  new Date(2019, 4 -1, 20),
  new Date(2019, 4 -1, 20),
  new Date(2019, 4 -1, 20),
  new Date(2019, 4 -1, 21),
  new Date(2019, 4 -1, 23),
  new Date(2019, 4 -1, 23),
  new Date(2019, 4 -1, 23),
  new Date(2019, 4 -1, 24),
  new Date(2019, 4 -1, 24),
  new Date(2019, 4 -1, 25),
  new Date(2019, 4 -1, 25),
  new Date(2019, 4 -1, 26),
  new Date(2019, 4 -1, 26),
  new Date(2019, 4 -1, 26),
  new Date(2019, 4 -1, 26),
  new Date(2019, 4 -1, 26),
  new Date(2019, 4 -1, 27),
  new Date(2019, 4 -1, 27),
  new Date(2019, 4 -1, 27),
  new Date(2019, 4 -1, 27),
  new Date(2019, 4 -1, 27),
  new Date(2019, 4 -1, 28),
  new Date(2019, 4 -1, 28),
  new Date(2019, 4 -1, 28),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
  new Date(2020, 3 -1, 10),
];

console.log('dropWhile', [...dropWhile([1, 2, 3, 4, 5, 6, 5, 4], e => e < 6)]);
console.log('dropWhile', [...dropWhile(dates, e => e < new Date(2019, 4 -1, 21))]);
console.log('countBy', countBy([1, 2, 3, 4, 5, 6, 7], e => (e % 2).toString()))
console.log('datesToCount', datesToCount(dates));
const as = [...generateDays(new Date(), dates)];
// console.log('generateDays:', as);
console.log('getCalendarStartDate"', getCalendarStartDate(new Date()).getDate());
// console.log('generateWeeks:', [...generateWeeks(new Date(), dates)])


const ws2 = [...generateWeeks(new Date(), dates)];
const a = <GraphYear weeks={ws2}/>;

// TODO: Remove server
//      (for debugging)
http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end("<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + renderToString(a));
}).listen(8080);
