require 'test_helper'

class Api::V1::IdeasControllerTest < ActionController::TestCase
  test "#index returns an array of ideas" do
    get :index, format: :json

    assert_kind_of Hash, json_response
  end

  test "#index returns correct number of ideas" do
    get :index, format: :json

    assert_equal Idea.count, json_response['ideas'].count
  end

  test "#index contains ideas that have the correct properties" do
    get :index, format: :json

    json_response['ideas'].each do |idea|
      assert idea['title']
      assert idea['body']
      assert idea['quality']
    end
  end

  test "#" do

  end
end
