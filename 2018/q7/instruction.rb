class Instruction
  include Comparable

  attr_reader :pre, :post
  def initialize(pre, post)
    @pre = pre
    @post = post
  end

  def to_s
    "Pre: #{@pre}. Post: #{@post}"
  end
end