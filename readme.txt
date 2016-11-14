=========================
PyTut Online Python Tutor
=========================

This is the readme for the PyTut E-learning platform prototype developed by Ross Kohler and Carla Kirk-Cohen as part of UCT's Computer Science honours course.

============
Installation
============
Installation of this website is not necessary as it is hosted at this address.

To run this website in your local machine, complete the following set of instructions:
1. Clone this project or Download that ZIP file
2. Make sure you have bower, gulp and npm installed globally
3. On the command prompt run the following commands

cd project-directory
bower install
npm install
gulp serve
Navigate to http://localhost:9000/ in your browser to view the website

=================
Breakdown of Work
=================
This project was developed using the Angular Ani Dashboard theme. Some of the files that come with this theme have remained unchanged,
others have been edited and others have been added to customize the template. This section provides a guideline that indicates what work
was done by each team member and where the majority of this work was coded. This is in no way a comprehensive list of the files edited/added
by each user, but rather a guideline to finding the bulk of the work completed. 

Ross Kohler: automated marker, interactive chat, google analytics and login facility
- app/scripts/controllers/interpreter.js
- app/scripts/controllers/login.js
- app/scripts/services/service.js
- app/views/interpreter.html

Carla Kirk-Cohen: interactive code, visual debugger and ability to saving work/resume where left off
- app/scripts/controllers/interpreter.js
- app/scripts/controllers/tasks.js
- app/scripts/services/service.js
- app/scripts/controllers/login.js
- app/views/interpreter.html
