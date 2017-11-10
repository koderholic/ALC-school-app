This Project is an Andela Learning Community project on the intermediate website developer application, this project is built on nodejs server levearaging on the functionalities that express provides.
It's a basic school inforation system, it collects, stores, organize and manage basic student details.
There are no input validation on the server side, input validations are done on the client side, while XSS cleaning and input serializing is done here on the server side.
The nodejs server project structure is a basic struction, having seperate folders for the different functionalities.
There are no test script written for this project, all test were done with postman.
After clonning this project, run npm install to install all project dependencies and also run the dbSeeder to seed startup datas into your database.
Run : node models/dbSeeder mongodb://your_dabase_url

Note : The school information system assumes that all students in the system resides in lagos