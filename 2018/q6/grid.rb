require_relative '../q6/cell'

class Grid

  def initialize(x_size, y_size)
    @grid = Array.new(x_size+1) {Array.new(y_size+1)}
    (x_size+1).times do |x|
      (y_size+1).times do |y|
        @grid[x][y] = Celle.new(x, y, -1)
      end
    end
    @sites = []
    @counter = Hash.new(0)
  end

  def add(cell)
    @grid[cell.x][cell.y] = cell
    @sites << cell
  end

  def calculate
    @grid.each_index do |x|
      @grid[0].each_index do |y|
        closest_cell = find_closest(@grid[x][y])
        if x == 0 || y == 0 || x == @grid.length-1 || y == @grid[0].length-1
          @counter[closest_cell] = -Float::INFINITY
        end
        # if closest_cell.nil?
        #   print ".,"
        # else
        #   print "#{closest_cell.id},"
        # end
        @counter[closest_cell] += 1
      end
    # puts " "
    end
   @counter
  end

  def best_area(limit)
    total_area = 0
    @grid.each_index do |x|
      @grid[0].each_index do |y|
        distance = 0
        @sites.each do |site|
          distance += manhattan(site, @grid[x][y])
        end
        if distance < limit
          total_area += 1
        end
      end
    end
    total_area
  end

  def find_closest(cell)
    @sites.each do |site|
      site.set_distance(manhattan(site, cell))
    end
    @sites.sort!
    if @sites[0] == @sites[1]
      return nil
    end
    @sites[0]
  end

  def manhattan(cell1, cell2)
    (cell1.x-cell2.x).abs + (cell1.y-cell2.y).abs
  end
end