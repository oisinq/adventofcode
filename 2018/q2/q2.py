from collections import defaultdict

def part1():
    with open("input.txt", "r") as f:
        values = []
        for line in f:
            values.append(line.strip())

    twosCount, threesCount = 0, 0

    for box in values:
        foundTwo, foundThree = False, False
        letterdict = defaultdict(int)
        for letter in box:
            letterdict[letter] = letterdict[letter] + 1
        
        for k, result in letterdict.items():
            if result == 2 and not foundTwo:
                twosCount += 1
                foundTwo = True
            if result == 3 and not foundThree:
                threesCount += 1
                foundThree = True

    return threesCount*twosCount

def compare(first, second):
    match = False
    for first_letter, second_letter in zip(first, second):
        if first_letter != second_letter and match:
            return False
        if first_letter != second_letter:
            match = True
    return match
            


def part2():
    with open("input.txt", "r") as f:
        values = []
        for line in f:
            values.append(line.strip())
    
    for first_line in values:
        for second_line in values:
            if first_line != second_line and compare(first_line, second_line):
                str = ""
                for i in range(len(first_line)):
                    if first_line[i] == second_line[i]:
                        str += first_line[i]
                return str

print(part1())
print(''.join(part2()))