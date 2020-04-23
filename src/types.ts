export type Day = {
  readonly date: {
    readonly year: number,
    // NOTE: January is 1
    readonly month: number,
    readonly day: number,
  },
  readonly color: string,
}

// NOTE: First element is Sunday
export type Week = [Day, Day, Day, Day, Day, Day, Day]
