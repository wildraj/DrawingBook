class ImagesController < ApplicationController
  def new
  end

  def create
    image_params = params.require(:image).permit(:title, :data)
    user = User.find(params[:user_id])

    image_params[:data] = Base64.decode64(image_params[:data].sub('data:image/png;base64,', ''))

    # upload to Amazon S3
    # store url in images table

    image = user.images.new(image_params)
    if image.save
      render json: {id: image.id, title: image.title}
    else
      render json: {error: image.errors.full_messages.join(', ')}, status: 400
    end
  end

  def index
    @images = Image.all
    @user = User.find(params[:user_id])
    respond_to do |format|
      format.html
      format.png{send_data @images.data, type: "image/png", disposition: 'inline'}

    end
  end

  def show
    @image = Image.find(params[:id])
    respond_to do |format|
      format.html
      format.png{send_data @image.data, type: "image/png", disposition: 'inline'}
    end
  end

  def edit
    @image = Image.find(params[:id])
    respond_to do |format|
      format.html
      format.png{send_data @image.data, type: "image/png", disposition: 'inline'}
    end
  end

  def update
    image_params = params.require(:image).permit(:data)

    title = params[:title] if params[:title]
    image = Image.find(params[:id])
    data = Base64.decode64(image_params[:data].sub('data:image/png;base64,', ''))
    if request.xhr?
      image.title = title if title
      image.data = data
      if image.save!
        render :json => {:id => image.id, :title => image.title}
      end
    end
  end

  def destroy
    image = Image.find(params[:id])
    image.delete
    redirect_to images_path
  end
end
