class AddAmenityScoreToProperties < ActiveRecord::Migration
  def change
    add_column :properties, :amenity_score, :float
  end
end
