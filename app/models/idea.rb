class Idea < ActiveRecord::Base
  validates :title, :body, presence: true

  scope :all_ideas, -> { order(created_at: :desc) }
  enum quality: %w(Swill Plausible Genius)

end
