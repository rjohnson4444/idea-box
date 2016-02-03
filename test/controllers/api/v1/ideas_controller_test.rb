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

  test "#create adds a new idea to the database" do
    idea =  { title: "New Idea", body: "New Idea body" }

    assert_difference 'Idea.count', 1 do
      post :create, idea: idea, format: :json
    end
  end

  test "#create returns a new idea with correct properties" do
    idea =  { title: "New Idea", body: "New Idea body", quality: 'genius' }

    post :create, idea: idea, format: :json

    assert idea[:title], json_response['title']
    assert idea[:body], json_response['body']
    assert idea[:quality], json_response['quality']
  end

  test "#update replaces properties of current idea" do
    skip
    prev_idea = Idea.first
    idea      = { title: "Update Idea", body: "Update Idea body", quality: 'genius' }

    get :index, format: :json

    assert_equal prev_idea.title, json_response['ideas'].last['title']
    assert_equal prev_idea.body, json_response['ideas'].last['body']
    assert_equal prev_idea.quality, json_response['ideas'].last['quality']

    put :update, id: prev_idea.id, idea: idea, format: :json

    assert_equal prev_idea.title, json_response
  end

  test "#destroy deletes an idea" do
    assert_difference 'Idea.count', -1 do
      delete :destroy, id: Idea.first, format: :json
    end
  end
end
