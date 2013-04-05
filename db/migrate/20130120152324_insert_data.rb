class InsertData < ActiveRecord::Migration
#could have used rake db seed instead. However this suffices.

  def up
    Property.new(:address => "test", :price => 10000, :longitude => -6.2658, :latitude => 53.3376).save
	Property.new(:address => "test1", :price => 20000, :longitude => -6.27792, :latitude => 53.32775).save
	Property.new(:address => "test2", :price => 30000, :longitude => -6.25189, :latitude => 53.29323).save
	Property.new(:address => "test3", :price => 40000, :longitude => -6.31817, :latitude => 53.32208).save
  end
  
  def down
    Property.delete_all()
  end
end
