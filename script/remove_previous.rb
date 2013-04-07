output_directory ="/media/sf_Main/property_site/other_files/Amenities/output_results/**/*.csv"

Dir.glob(output_directory) do |file| 
	File.delete(file)	
end

#remove previous records
PropertiesAmenity.delete_all

