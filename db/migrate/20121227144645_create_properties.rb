class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.string :address
      t.decimal :price

      t.timestamps
    end
  end
end
