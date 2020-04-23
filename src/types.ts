export type Day = {
  readonly date: Date,
  readonly color: string,
}

// NOTE: First element is Sunday
export type Week = [Day, Day, Day, Day, Day, Day, Day]
