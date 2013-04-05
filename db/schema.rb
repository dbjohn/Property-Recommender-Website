# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130401211327) do

# Could not dump table "dublin_osm_line" because of following StandardError
#   Unknown type 'geometry' for column 'way'

# Could not dump table "dublin_osm_point" because of following StandardError
#   Unknown type 'geometry' for column 'way'

# Could not dump table "dublin_osm_polygon" because of following StandardError
#   Unknown type 'geometry' for column 'way'

# Could not dump table "dublin_osm_roads" because of following StandardError
#   Unknown type 'geometry' for column 'way'

  create_table "geometry_columns", :id => false, :force => true do |t|
    t.string  "f_table_catalog",   :limit => 256, :null => false
    t.string  "f_table_schema",    :limit => 256, :null => false
    t.string  "f_table_name",      :limit => 256, :null => false
    t.string  "f_geometry_column", :limit => 256, :null => false
    t.integer "coord_dimension",                  :null => false
    t.integer "srid",                             :null => false
    t.string  "type",              :limit => 30,  :null => false
  end

  create_table "properties", :force => true do |t|
    t.decimal  "price"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.decimal  "longitude"
    t.decimal  "latitude"
    t.float    "amenity_score"
    t.string   "address_line1"
    t.string   "address_line2"
    t.string   "address_line3"
    t.string   "address_line4"
    t.integer  "number_of_bedrooms"
    t.string   "property_type"
    t.date     "move_in_date"
    t.string   "lease_type"
    t.boolean  "parking"
    t.boolean  "washing_machine"
    t.boolean  "dryer"
    t.boolean  "microwave"
    t.boolean  "dishwasher"
    t.boolean  "internet"
    t.string   "daft_id"
    t.text     "description"
    t.boolean  "house_alarm"
    t.boolean  "central_heating"
    t.boolean  "cable_television"
    t.integer  "number_of_bathrooms"
  end

  create_table "properties_amenities", :id => false, :force => true do |t|
    t.integer  "property_id"
    t.integer  "dublin_osm_point_id"
    t.string   "amenity_type"
    t.float    "to_travel_time"
    t.float    "from_travel_time"
    t.float    "amenity_score"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.string   "transport_mode"
  end

  create_table "spatial_ref_sys", :id => false, :force => true do |t|
    t.integer "srid",                      :null => false
    t.string  "auth_name", :limit => 256
    t.integer "auth_srid"
    t.string  "srtext",    :limit => 2048
    t.string  "proj4text", :limit => 2048
  end

end
