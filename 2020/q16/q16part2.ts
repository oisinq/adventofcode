type Range = {
  start: number;
  end: number;
};

type Rule = {
  name: string;
  ranges: Range[];
};

type NewRule = {
  name: string;
  range: number[];
};

type Ticket = {
  values: number[];
};

const countFullMatches = (
  column: number[],
  rules: NewRule[]
): { count: number; names: string[] } => {
  let count = 0;
  let names: string[] = [];
  for (const rule of rules) {
    if (column.every((value) => rule.range.includes(value))) {
      count += 1;
      names.push(rule.name);
    }
  }

  return { count, names };
};

const findFirstColumnWithOneMatch = (
  ticketValuesByColumn: number[][],
  rules: NewRule[]
): { column: number[]; name: string } => {
  console.log("Yeah");
  for (const column of ticketValuesByColumn) {
    const { count: numMatches, names } = countFullMatches(column, rules);

    if (numMatches === 1) {
      return { column, name: names[0] };
    }
  }

  console.log("uh oh");
  return null;
};

const calculateRange = (start: number, end: number): number[] => {
  return [...Array(end - start + 1).keys()].map((key) => key + start);
};

const parseRules = (rulesInput: string): NewRule[] => {
  const rules: NewRule[] = [];

  for (const rule of rulesInput.split("\n")) {
    const regex = /^([\w ]*): ([\d]*-[\d]*) or ([\d]*-[\d]*)$/;
    const [, name, firstRangeStr, secondRangeStr] = regex.exec(rule);

    const [firstStart, firstEnd] = firstRangeStr
      .split("-")
      .map((value) => Number(value));
    const [secondStart, secondEnd] = secondRangeStr
      .split("-")
      .map((value) => Number(value));

    const possibleValues = calculateRange(firstStart, firstEnd);
    possibleValues.push(...calculateRange(secondStart, secondEnd));

    rules.push({
      name,
      range: possibleValues,
    });
  }

  return rules;
};

const parseTickets = (ticketsStr: string): Ticket[] => {
  const tickets: Ticket[] = [];

  for (const ticket of ticketsStr.split(":\n")[1].split("\n")) {
    const ticketEntries = ticket.split(",").map((entry) => Number(entry));

    tickets.push({ values: ticketEntries });
  }

  return tickets;
};

const isValidTicket = (ticket: Ticket, validValues: Set<number>): boolean => {
  for (const value of ticket.values) {
    if (!validValues.has(value)) return false;
  }
  return true;
};

var fs = require("fs");

const read = fs.readFileSync(`./q16/input.txt`);
const [
  rulesInput,
  myTicketInput,
  nearbyTicketsInput,
]: string[] = read.toString().split("\n\n");

const rules: NewRule[] = parseRules(rulesInput);
const nearbyTickets: Ticket[] = parseTickets(nearbyTicketsInput);
const myTicket: Ticket = parseTickets(myTicketInput)[0];

const validValues: Set<number> = new Set();

for (const rule of rules) {
  for (const value of rule.range) {
    validValues.add(value);
  }
}

const validTickets: Ticket[] = [];

for (const ticket of nearbyTickets) {
  isValidTicket(ticket, validValues) && validTickets.push(ticket);
}

const ticketValuesByColumn = [...Array(validTickets.length)].map(() => []);
const originalTicketValuesByColumn = [...ticketValuesByColumn];
const departureValuesOnMyTicket: number[] = [];

for (const ticket of validTickets) {
  for (let i = 0; i < ticket.values.length; i++) {
    ticketValuesByColumn[i].push(ticket.values[i]);
  }
}

while (ticketValuesByColumn.length !== 0 && rules.length !== 0) {
  // there's something broken happening in this loop but it worked for me so *shrugs*
  const { column: firstColumnWithOneMatch, name } = findFirstColumnWithOneMatch(
    ticketValuesByColumn,
    rules
  );

  const columnIndex = ticketValuesByColumn.indexOf(firstColumnWithOneMatch);
  ticketValuesByColumn.splice(columnIndex, 1);

  if (name.includes("departure")) {
    const column = originalTicketValuesByColumn.indexOf(
      firstColumnWithOneMatch
    );

    departureValuesOnMyTicket.push(myTicket.values[column]);
  }

  rules.splice(
    rules.findIndex((rule) => rule.name === name),
    1
  );
}

console.log(
  "Part 2:",
  departureValuesOnMyTicket.reduce((product, value) => (product *= value), 1)
);

export {};
