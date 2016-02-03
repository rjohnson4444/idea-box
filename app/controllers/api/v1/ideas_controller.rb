class Api::V1::IdeasController < ApplicationController
  respond_to :json, :xml

  def index
    respond_with Idea.all_ideas, serializer: nil
  end

  def create
    idea = Idea.new(idea_params)
    if idea.save
      respond_with idea, location: api_v1_ideas_path(idea)
    else
      render json: item.errors, status: 422
    end
  end

  def update
    respond_with Idea.update(params[:id], idea_params)
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  private
    def idea_params
      params.require(:idea).permit(:title, :body, :quality)
    end
end
