class CreateDublinOsmPoints < ActiveRecord::Migration
  def change
    create_table :dublin_osm_points do |t|

      t.timestamps
    end
  end
end
