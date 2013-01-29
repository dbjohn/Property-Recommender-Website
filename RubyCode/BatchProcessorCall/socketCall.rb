require 'socket'

hostname = 'localhost'
port = 55555

socket = TCPSocket.open(hostname, port)

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