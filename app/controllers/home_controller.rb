class HomeController < ApplicationController
  def index
  end

  def dice
    message = params[:message] || '骰'
    if message.length == message.count('骰') && message.length <= 10
      return @dices = (1..message.length).map{|i| rand(1..6) }
    end
  end

  def dice666
    @dices = [6,6,6]
    render :dice
  end
end