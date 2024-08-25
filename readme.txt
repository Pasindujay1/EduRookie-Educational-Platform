EduRookie-an-educational-platform

EduRookie, an educational platform designed exclusively for web-based access, catering to learners, course instructors, and administrators. EduRookie will offer a comprehensive selection of courses across various disciplines, allowing users to browse, enroll, access course materials, and track progress seamlessly through a user-friendly web interface. This report outlines the architectural design, implementation details, and key functionalities of EduRookie's web-based educational platform.
EduRookie focuses on providing an intuitive and accessible web interface where learners can explore courses, enroll in multiple offerings simultaneously, and monitor their learning journey. Course instructors will have tools to manage course content, including lecture notes, videos, and quizzes, while administrators oversee course approval, payment integration, and financial transactions related to enrollments.
RESTful web services are used in the system architecture to build a microservices approach. Given that each microservice is focused on a particular set of functionalities, modularity, scalability, and effective resource use are guaranteed. The EduRookie platform can be developed, deployed, and managed more quickly thanks to the deployment of microservices, which is organized with Kubernetes and controlled with Docker containers.
To maintain a secure environment, EduRookie employs robust authentication mechanisms within the web interface. Users are authenticated based on their roles (learner, instructor, administrator) using secure protocols to safeguard user data and system integrity.

Steps to Deploy the application

1. Clone the repository to a new folder using the below github link.
	git@github.com:IT21286278/DS-Assignment-2-Educational-Platform-for-Online-Learning.git

2. Open an integrated terminal from the root dirctory.

3. Run the below command in the terminal to run all the servics simultaneously using docker
	docker-compose up

4. Once all the servics are up and running, tag docker images one by one and push it to the docker hub.

	4.1 Log into docker using below command and enter username and password
		docker login
	4.2 Then tag the image first using the below command
		docker tag <<Image_name>> <<Docker_hub Profile_name>>/<<Image_name>>
	4.3 Then Push the docker image to Docker hub
		docker push <<Docker_hub Profile_name>>/<<Image_name>>

5. Then deploy the servics in kurbenetes
	5.1 First, check the mincube status using the below command
		minikube status
	5.2 Then run the below command seperately in service directories to create deployment
		kubectl apply -f deployment.yml
        
6. Finally the application can be accessed by using the below link.
	http://localhost:3000/
