class InsertData < ActiveRecord::Migration
  def up
    Property.new(:address => "test", :price => 10000, :longitude => -6.2658, :latitude => 53.3376).save
	Property.new(:address => "test1", :price => 20000, :longitude => -5.2658, :latitude => 53.6576).save
	Property.new(:address => "test2", :price => 30000, :longitude => -6.2656, :latitude => 53.4536).save
	Property.new(:address => "test3", :price => 40000, :longitude => -6.2645, :latitude => 53.3456).save
  end
  
  def down
    Property.delete_all()
  end
end
