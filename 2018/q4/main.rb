require_relative 'guard'

data = []
guards = {}

File.open("input.txt", "r") do |f|
  f.each_line do |line|
    data << line
  end
end

data.sort!
current_id = -1

data.each do |line|
  time_parse = line.match(/(?<year>[\d]{4})-(?<month>[\d]{2})-(?<date>[\d]{2}) (?<hour>[\d]{2}):(?<minute>[\d]{2})/)
  time = Time.new(time_parse[:year],time_parse[:month],time_parse[:date],time_parse[:hour],time_parse[:minute])

  if line.include?("Guard")
    guard_parse = line.match(/#(\d*)/)
    current_id = guard_parse[1]
    unless guards.key?(current_id)
      guards[current_id] = Guard.new(guard_parse[1])
    end
  else
    guards[current_id].add_time(time)
  end
end

#guard = guards.values.max
guard = guards.values.max_by { |g| g.most_frequent_sleepy_minute }

puts "Max: #{guard.total_time / 60} minutes. ID: #{guard.id}"
puts guard.sleepiest_minute
puts "#{guard.sleepiest_minute * guard.id.to_i}"