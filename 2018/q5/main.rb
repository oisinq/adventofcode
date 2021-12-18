line = ""

File.open("input.txt", "r") do |f|
  f.each_line do |l|
    line = l
  end
end

noMoreMoves = false

until noMoreMoves
  noMoreMoves = true
  line.each_char.with_index do |c, i|
    if i != line.length-1 && noMoreMoves
      if (line[i].ord - line[i+1].ord).abs == 32
        line.slice!(i)
        line.slice!(i)
        noMoreMoves = false
        next
      end
    end
  end
end

puts line
puts line.length