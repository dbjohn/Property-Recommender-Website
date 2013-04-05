class AddMoreDetailsToProperties < ActiveRecord::Migration
  def self.up
    add_column :properties, :daft_id, :string
	add_column :properties, :description, :text
    add_column :properties, :house_alarm, :boolean
	add_column :properties, :central_heating, :boolean
	add_column :properties, :cable_television, :boolean
    add_column :properties, :number_of_bathrooms, :int	
	remove_column :properties, :address #should have removed this in previous migration but forgot.
  end
  
  def self.down
	remove_column :properties, :daft_id		
	remove_column :properties, :description	
	remove_column :properties, :central_heating
	remove_column :properties, :cable_television	
	remove_column :properties, :house_alarm
	remove_column :properties, :number_of_bathrooms
	add_column :properties, :address, :string	
  end
end
