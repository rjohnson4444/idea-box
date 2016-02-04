class Idea < ActiveRecord::Base
  scope :all_ideas, -> { order(created_at: :desc) }
  enum quality: %w(Swill Plausible Genius)
end
