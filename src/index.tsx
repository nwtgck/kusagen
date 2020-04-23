import * as React from "react";
import {renderToString} from 'react-dom/server';
import * as http from 'http';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

type Day = {
  readonly date: Date,
  readonly color: string,
}

// NOTE: First element is Sunday
type Week = [Day, Day, Day, Day, Day, Day, Day]

function GraphDay(props: {day: Day, y: number}) {
  return <rect
    className="day"
    width={12}
    height={12}
    x={16}
    y={props.y}
    fill="#7bc96f"
    data-count={15}
    data-date="2019-04-21"
  />
}

function GraphWeek(props: {x: number}) {
  return (
    <g transform={`translate(${props.x}, 0)`}>
      {
        [...range({from: 0, to: 90, step: 15})]
          // TODO: any
          .map(y => <GraphDay y={y} day={null as any}/>)
      }
    </g>
  )
}

function* range({from, to, step}: {from: number, to: number, step: number}) {
  for(let i = from; i <= to; i += step) {
    yield i;
  }
}


const a = (
  <svg width={828} height={128} className="js-calendar-graph-svg">
    <g
      transform="translate(10, 20)"
    >
      {
        [...range({from: 0, to: 832, step: 16})]
          .map((x) => <GraphWeek key={x} x={x}/>)
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
);


// TODO: Remove server
//      (for debugging)
http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end("<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + renderToString(a));
}).listen(8080);
