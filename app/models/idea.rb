class Idea < ActiveRecord::Base
  scope :all_ideas, -> { order(created_at: :desc) }
  enum quality: %w(swill plausible genius)
end
