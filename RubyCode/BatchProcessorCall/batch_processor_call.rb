begin
	#none of these work:
	#system("cd C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target")
	#system("cd C:/Users\John\Programming\Git\OpenTripPlanner\opentripplanner-analyst\target")
	#system("java -Xmx3000m -jar opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar")
	#system("java -Xmx3000m -jar C:\Users\John\Programming\Git\OpenTripPlanner\opentripplanner-analyst\target\opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar")
	#system("java -Xmx3000m -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar")
	
	#works system('java -Xms516m -Xmx1024m -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar')	

	#this doesn't work
	#system('java -Xms516m -Xmx2048m -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar')	
	
	#system("java", "-Xmx3000m ", "-jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar")
	#system("java -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar", "-Xmx3000m")
	#system("java -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar")
	#system('call C:/Users/John/Google_Drive/Folders_from_Skydrive/DIT/Year_4/Final_year_project/Property_site/source_code/Main/property_site/RubyCode/BatchProcessorCall/batch_processor_call.bat')
	#exec('C:/Users/John/Google_Drive/Folders_from_Skydrive/DIT/Year_4/Final_year_project/Property_site/source_code/Main/property_site/RubyCode/BatchProcessorCall/batch_processor_call.bat')
	#`C:/Users/John/Google_Drive/Folders_from_Skydrive/DIT/Year_4/Final_year_project/Property_site/source_code/Main/property_site/RubyCode/BatchProcessorCall/batch_processor_call.bat`
	#system('echo successfully_called_batchProcessor')
	#system('java -cp C:\Users\John\Programming\Java\Package_example\Source\Stand_alone_example\ HelloWorld')
	
	#call 64 bit java---------------------------------------------
	
	#`C:\Program Files\Java\jdk1.7.0_10\bin\java.exe -Xms516m -Xmx2048m -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar`
	#system("\"%JAVA_HOME%\"\bin\java.exe -Xms516m -Xmx2048m -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar")
	#system('"%JAVA_HOME%/bin/java.exe" -Xms516m -Xmx3000m -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar')
	
	#system("C:/%q(Program Files)/Java/jdk1.7.0_10/bin/java.exe -Xms516m -Xmx2048m -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar")
	
	#r = system("C:/Program Files/Java/jdk1.7.0_10/bin/java.exe -Xms516m -Xmx2048m -jar C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/opentripplanner-analyst-0.9.2-SNAPSHOT-shaded.jar")
	#puts r.to_s
	
	#call 64 bit java---------------------------------------------
	
	
	#this doesn't work if the bat file reserves a heap higher than 1 g
	#system('call C:/Users/John/Google_Drive/Folders_from_Skydrive/DIT/Year_4/Final_year_project/Property_site/source_code/Main/property_site/RubyCode/BatchProcessorCall/batch_processor_call.bat')
		
	#this works
	#system('java -cp C:\Users\John\Programming\Java\Package_example\Source\Stand_alone_example\ HelloWorld')
	
	
	#this doesn't work
	#system('java -Xms516m -Xmx2048m -cp C:\Users\John\Programming\Java\Package_example\Source\Stand_alone_example\ HelloWorld')
	
	#doesn't work
	#system("%q(cd C:/Program Files/Java/)")
	#system('cd C:/%q(Program Files)/Java/')
	
	#doesn't work
	#string = "C:/ProgramFiles/Java"
	#system("cd",string)
	
	#doesn't work
	#string = "C:/Program\\sFiles/Java"
	#system("cd",string)
	
	#doesn't work
	#string = " C:/Program\sFiles/Java"
	#system("cd",string)
	
	#system('call "%JAVA_HOME%\bin\java.exe"')
	
	#system('echo successfully_called_batchProcessor1')
	#puts string
	
	#system('cd C:/Users/John/Google_Drive/Folders_from_Skydrive/DIT/Year_4/Final_year_project/Property_site/source_code/Main/property_site/RubyCode/BatchProcessorCall/')
	
	#system('"%JAVA_HOME%/bin/java.exe" -Xms516m -Xmx3000m  -cp C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/Classes org.opentripplanner.analyst.batch.ExternalInvoke')
	
	system('"%JAVA_HOME%/bin/java.exe" -Xms516m -Xmx3000m  -cp C:/Users/John/Programming/Git/OpenTripPlanner/opentripplanner-analyst/target/classes org.opentripplanner.analyst.batch.ExternalInvoke')
end	