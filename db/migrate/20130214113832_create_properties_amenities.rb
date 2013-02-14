class CreatePropertiesAmenities < ActiveRecord::Migration
  def change
    create_table :properties_amenities,  :id => false do |t|
      t.references :property
	  t.references :dublin_osm_point
	  
	  t.string :amenity_type
      t.float :to_travel_time
      t.float :from_travel_time
      t.float :amenity_score

      t.timestamps
    end
  end
end
