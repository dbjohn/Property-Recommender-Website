class AddLongitudeLatitudeToProperties < ActiveRecord::Migration
  def change
    add_column :properties, :longitude, :decimal
    add_column :properties, :latitude, :decimal
  end
end
