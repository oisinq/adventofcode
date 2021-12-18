require_relative 'instruction'
require 'set'

def part1
  instructions = []
  valid_steps = Set.new

  File.open("input.txt", "r") do |f|
    f.each_line do |line|
      parse = line.match(/Step (?<pre>[A-Z]) must be finished before step (?<post>[A-Z]) can begin./)
      instruction = Instruction.new(parse[:pre], parse[:post])
      instructions << instruction
      valid_steps << parse[:pre]
      valid_steps << parse[:post]
    end
  end

  puts valid_steps

  order = []

  until valid_steps.empty?
    letter = find_letter(instructions, valid_steps)
    order << letter
    to_delete = instructions.select {|inst| inst.pre == letter}
    to_delete.each do |inst|
      instructions.delete(inst)
    end
    valid_steps.delete(letter)
  end
  puts order
end

def find_letter(instructions, valid_steps)
  ('A'..'Z').each do |letter|
    if instructions.none?{ |instruction| instruction.post == letter } && valid_steps.include?(letter)
      # && (instructions.any?{ |instruction| instruction.pre == letter }  ||  instructions.any?{ |instruction| instruction.post == letter })
      return letter
    end
  end
end

part1