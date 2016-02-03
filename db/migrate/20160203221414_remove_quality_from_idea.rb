class RemoveQualityFromIdea < ActiveRecord::Migration
  def change
    remove_column :ideas, :quality, :string
  end
end
