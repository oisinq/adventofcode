type Range = {
  start: number;
  end: number;
};

type Rule = {
  name: string;
  ranges: Range[];
};

type Ticket = {
  values: number[];
};

const parseRules = (rulesInput: string): Rule[] => {
  const rules: Rule[] = [];

  for (const rule of rulesInput.split("\n")) {
    const regex = /^([\w ]*): ([\d]*-[\d]*) or ([\d]*-[\d]*)$/;
    const [, name, firstRangeStr, secondRangeStr] = regex.exec(rule);

    const firstRange = {
      start: Number(firstRangeStr.split("-")[0]),
      end: Number(firstRangeStr.split("-")[1]),
    };

    const secondRange = {
      start: Number(secondRangeStr.split("-")[0]),
      end: Number(secondRangeStr.split("-")[1]),
    };

    rules.push({ name, ranges: [firstRange, secondRange] });
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

var fs = require("fs");

const read = fs.readFileSync(`./q16/input.txt`);
const [
  rulesInput,
  myTicketInput,
  nearbyTicketsInput,
]: string[] = read.toString().split("\n\n");

const rules: Rule[] = parseRules(rulesInput);
const nearbyTickets: Ticket[] = parseTickets(nearbyTicketsInput);

const validValues: Set<number> = new Set();

for (const rule of rules) {
  for (const range of rule.ranges) {
    for (const value of [...Array(range.end - range.start + 1).keys()].map(
      (key) => key + range.start
    )) {
      validValues.add(value);
    }
  }
}

const invalidValues: number[] = [];

for (const ticket of nearbyTickets) {
  for (const value of ticket.values) {
    if (!validValues.has(value)) invalidValues.push(value);
  }
}

console.log(
  "Part 1:",
  invalidValues.reduce((sum, value) => sum + value, 0)
);

export {};
