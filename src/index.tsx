import * as React from "react";
import {renderToString} from 'react-dom/server';
import * as http from 'http';
import {ContributionGraph, generateWeeks, YearGraph} from "./kusagen";

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

// console.log('dropWhile', [...dropWhile([1, 2, 3, 4, 5, 6, 5, 4], e => e < 6)]);
// console.log('dropWhile', [...dropWhile(dates, e => e < new Date(2019, 4 -1, 21))]);
// console.log('countBy', countBy([1, 2, 3, 4, 5, 6, 7], e => (e % 2).toString()))
// console.log('datesToCount', datesToCount(dates));
// const as = [...generateDays(new Date(), dates)];
// console.log('generateDays:', as);
// console.log('getCalendarStartDate"', getCalendarStartDate(new Date()).getDate());
// console.log('generateWeeks:', [...generateWeeks(new Date(), dates)])


// const ws2 = [...generateWeeks(new Date(), dates)];
const a = <ContributionGraph today={new Date(2020, 4 -1, 24)} dates={dates} />;

// TODO: Remove server
//      (for debugging)
http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end("<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + renderToString(a));
}).listen(8080);
