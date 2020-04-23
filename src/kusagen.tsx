import * as React from "react";
import {Day, Week} from "./types";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

function DayGraph(props: {day: Day, y: number}) {
  return <rect
    className="day"
    width={12}
    height={12}
    x={16}
    y={props.y}
    fill={props.day.color}
    data-count={15}
    data-date={`${props.day.date.year}-${props.day.date.month}-${props.day.date.date}`}
  />
}

function WeekGraph(props: {week: Week, x: number}) {
  return (
    <g transform={`translate(${props.x}, 0)`}>
      {
        props.week.map((y, i) => <DayGraph key={i} y={i * 15} day={props.week[i]}/>)
      }
    </g>
  )
}

export function YearGraph(props: {weeks: readonly Week[]}) {
  return (
    <svg width={828} height={128} className="js-calendar-graph-svg">
      <g
        transform="translate(10, 20)"
      >
        {
          props.weeks.map((week, i) => <WeekGraph key={i} week={week} x={i * 16}/>)
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
        month: date.getMonth()+1,
        date: date.getDate(),
      },
      count,
    };
    date = new Date(+date +  86400 * 1000);
  }
}

export function* generateWeeks(today: Date, dates: readonly Date[]) {
  let maxCount = 0;
  const days = [];
  const dayIter = generateDays(today, dates);
  for (const day of dayIter) {
    if (day.count > maxCount) maxCount = day.count;
    days.push(day);
  }

  let daysInWeek: Day[] = [];
  for (const day of days) {
    const intensity = countToIntensity(day.count, maxCount);
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
  if (daysInWeek.length !== 0) {
    yield daysInWeek;
  }
}

export function ContributionGraph(props: {today: Date, dates: readonly Date[]}) {
  const weeks = [...generateWeeks(props.today, props.dates)];
  return <YearGraph weeks={weeks}/>
}
