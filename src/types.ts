export type YearMonthDate = {
  readonly year: number,
  // NOTE: January is 1
  readonly month: number,
  readonly day: number,
}

export type Day = {
  readonly date: YearMonthDate,
  readonly color: string,
}

// NOTE: First element is Sunday
export type Week = readonly Day[]
