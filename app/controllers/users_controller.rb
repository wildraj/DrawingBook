class UsersController < ApplicationController
  def create
    user = User.new(
      username: params[:session][:username],
      password: params[:session][:password]
    )
    if user.save!
      redirect_to root_path
    else
      render 'new'
    end
  end

  def new
  end

  def show
  end
end
