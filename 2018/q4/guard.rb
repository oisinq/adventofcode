class Guard
  include Comparable

  attr_reader :id

  def initialize(id)
    @id = id
    @times = []
  end

  def add_time(time)
    @times << time
  end

  def total_time
    total = 0
    @times.each_with_index do |time, i|
      if i % 2 == 1
        total += @times[i] - @times[i-1]
      end
    end
    total
  end

  def sleepiest_minute
    @list = []
    @times.each_with_index do |time, i|
      if i % 2 == 1
        time = @times[i-1]
        while @times[i].min - time.min != 0
          @list << time.min
          time = time + 60
        end
        @list << @times[i].min
      end
    end
    if @list.length == 0
      return 0
    end
    @list.max_by { |i| @list.count(i) }
  end

  def most_frequent_sleepy_minute
    @list = []
    @times.each_with_index do |time, i|
      if i % 2 == 1
        time = @times[i-1]
        while @times[i].min - time.min != 0
          @list << time.min
          time = time + 60
        end
        @list << @times[i].min
      end
    end
    if @list.length == 0
      return 0
    end
    ye = @list.max_by { |i| @list.count(i) }
    @list.count(ye)
  end

  def <=>(other)
    total_time <=> other.total_time
  end
end