begin
  file = File.open("./temp.xml", "w")
  file.write("your sdstext") 
rescue IOError => e
  #some error occur, dir not writable etc.
ensure
  file.close unless file == nil
end
	