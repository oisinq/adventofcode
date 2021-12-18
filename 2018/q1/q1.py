with open("input.txt", "r") as f:
    values = []
    for line in f:
        values.append(int(line.strip()))

# part1 answer
print(sum(values))

# part2 answer
frequencies = set()

i = 0
sum = 0
sum += values[i]

while sum not in frequencies:
    frequencies.add(sum)
    if i == len(values) - 1:
        i = 0
    else:
        i += 1
    sum += values[i]

print(sum)