require_relative '../q6/cell'
require_relative 'grid'

def part1

  cells = []

  id = 0
  File.open("input.txt", "r") do |f|
    f.each_line do |line|
      line = line.split
      x = line[0].to_i
      y = line[1].to_i

      cell = Celle.new(x, y, id)
      cells << cell
      id += 1
    end
  end
  leftmost_cell = cells.min_by {|cell| cell.x}
  upmost_cell = cells.min_by {|cell| cell.y}
  rightmost_cell = cells.max_by {|cell| cell.x}
  downmost_cell = cells.max_by {|cell| cell.y}

  grid = Grid.new(rightmost_cell.x, downmost_cell.y)

  cells.each do |cell|
    grid.add(cell)
  end

  hash = grid.calculate

  cells.each do |cell|
    if leftmost_cell.x == cell.x || rightmost_cell.x == cell.x || upmost_cell.y == cell.y || downmost_cell.y == cell.y
      hash.delete(cell)
    end
  end

  puts hash.max_by{|k,v| v}
end

def part2
  cells = []

  id = 0
  File.open("input.txt", "r") do |f|
    f.each_line do |line|
      line = line.split
      x = line[0].to_i
      y = line[1].to_i

      cell = Celle.new(x, y, id)
      cells << cell
      id += 1
    end
  end

  rightmost_cell = cells.max_by {|cell| cell.x}
  downmost_cell = cells.max_by {|cell| cell.y}

  grid = Grid.new(rightmost_cell.x, downmost_cell.y)

  cells.each do |cell|
    grid.add(cell)
  end

  puts grid.best_area(10000)
end
#part1
part2