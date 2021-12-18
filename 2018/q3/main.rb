require_relative 'cell'
cells = Hash.new(0)

File.open("input.txt", "r") do |f|
  f.each_line do |line|
    line = line.split
    id = line[0]
    id = id[1..-1].to_i
    co_ords = line[2]
    co_ords = co_ords[0..-2]
    co_ords = co_ords.split(',')
    co_ords[0] = co_ords[0].to_i
    co_ords[1] = co_ords[1].to_i
    size = line[3]
    size = size.split('x')
    size[0] = size[0].to_i
    size[1] = size[1].to_i

    (co_ords[0]..(co_ords[0]+size[0]-1)).each do |i|
      (co_ords[1]..(co_ords[1]+size[1]-1)).each do |j|
        cell = Cell.new(i, j, id.to_i)
        cells[cell] = cells[cell] + 1
      end
    end
  end
end

File.open("input.txt", "r") do |f|
  f.each_line do |line|
    line = line.split
    id = line[0]
    id = id[1..-1].to_i
    co_ords = line[2]
    co_ords = co_ords[0..-2]
    co_ords = co_ords.split(',')
    co_ords[0] = co_ords[0].to_i
    co_ords[1] = co_ords[1].to_i
    size = line[3]
    size = size.split('x')
    size[0] = size[0].to_i
    size[1] = size[1].to_i
    broken = false

    (co_ords[0]..(co_ords[0]+size[0]-1)).each do |i|
      (co_ords[1]..(co_ords[1]+size[1]-1)).each do |j|
        if !broken
          cell = Cell.new(i, j, id.to_i)
          if cells[cell] > 1
            broken = true
          end
        end
      end
    end

    if !broken
      puts "Unbroken grid: #{id}"
    end
  end
end

counter = 0

cells.each_value do |value|
  if value > 1
    counter += 1
  end
end
puts counter 