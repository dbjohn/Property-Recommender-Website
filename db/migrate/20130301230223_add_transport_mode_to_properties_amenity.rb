class AddTransportModeToPropertiesAmenity < ActiveRecord::Migration
  def change
    add_column :properties_amenities, :transport_mode, :string
  end
end
