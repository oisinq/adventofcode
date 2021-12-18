input = File.read('input.txt').strip.split('')

def reactor(input)
  stack = [input.shift]
  input.each { |unit|
    if !stack.empty? and (stack.last.ord - unit.ord).abs == 32
      stack.pop
    else
      stack << unit
    end
  }
  stack
end

stack = reactor(input)

line = ""

stack.each do |s|
  line << s
end

puts line
puts stack.length

char = 'a'

list = []

while char != 'aa'
  new_stack = stack.reject {|x| x == char or x == char.upcase}
  new_stack = reactor(new_stack)
  puts "Char:#{char}, length: #{new_stack.length}"
  list << new_stack.length
  char.next!
end

puts list.min