class Idea < ActiveRecord::Base
  scope :all_ideas, -> { order(created_at: :desc) }
end
