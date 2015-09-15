class SessionsController < ApplicationController
  protect_from_forgery

  def new
  end

  def create
    @user = User.find_by(username: params[:session][:username])
    if @user
      session[:user_id] = @user.id
      redirect_to user_images_path(@user)
    else
      @message = "incorrect e-mail or password"
      render 'new'
    end
  end

  def destroy
    @user = User.find(session[:user_id])
    session[:user_id] = nil
    redirect_to login_path
  end
end
