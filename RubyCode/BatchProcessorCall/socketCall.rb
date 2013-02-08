require 'socket'

hostname = 'localhost' #make sure you change this to the correct ip address if necessay.  REMEMBER THAT YOU ARE WORKING WITH A VM AS WELL.
port = 55555

socket = TCPSocket.open(hostname, port)
#socket = TCPSocket.new(hostname, port)

#sleep 5
socket.puts('Go')

# i = 0

puts socket.recv(1024)
# while ( i < 100)
	# puts "now: " + i.to_s
	# socket.write("Go")
	# sleep 1
	# i += 1
# end


#socket.close

puts "got here"