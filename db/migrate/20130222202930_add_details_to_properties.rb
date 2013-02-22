class AddDetailsToProperties < ActiveRecord::Migration
  def change
    add_column :properties, :address_line1, :string
    add_column :properties, :address_line2, :string
    add_column :properties, :address_line3, :string
    add_column :properties, :town_or_city, :string
    add_column :properties, :county, :string
    add_column :properties, :number_of_bedrooms, :int
    add_column :properties, :accommodation_type, :string
    add_column :properties, :move_in_date, :date
    add_column :properties, :lease_type, :string
    add_column :properties, :parking, :boolean
    add_column :properties, :washing_machine, :boolean
    add_column :properties, :dryer, :boolean
    add_column :properties, :microwave, :boolean
    add_column :properties, :dishwasher, :boolean
    add_column :properties, :internet, :boolean
  end
end
