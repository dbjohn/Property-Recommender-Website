#Change of strategy with address fields.
#Due to the inconsistent nature of address fields on daft.ie
#addresses fields will just be distinguished by number - addressline1, addressline2 etc.
class ModifyAddressFields < ActiveRecord::Migration
  def self.up
	rename_column :properties, :town_or_city, :address_line4
	remove_column :properties, :county		
  end 
  
  def self.down
	rename_column :properties, :address_line4, :town_or_city
	add_column :properties, :county, :string
  end 
  
end
