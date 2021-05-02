class HomeController < ApplicationController
  def index
  end

  def dice
    dice_count = params[:dice]&.length || 0
    dice_count += 1
    @dices = (1..dice_count).map{|i| rand(1..6) }
  end
end