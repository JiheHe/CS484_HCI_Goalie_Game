# CS484_HCI_Goalie_Game

# - How to Run Game -
We have some dependicies that are required to run the game. In this zip file, we have 
run.sh, pipefile, pipfile.lock, web, and runserver.py files that will help you run this game. In order 
to run the game, in a python compatible terminal, run (1) python3 -m venv flaskenv, (2) . flaskenv/bin/activate, 
(3) pip install flask, (4) python3 runserver.py 11223. Then on a browser, type http://localhost:11223. 
This will begin the interactive installation. As you will see on intropage screen, hover hand over the 
appropiate space until it fades away and the game screen appears. You will get 5 seconds before the game begins, 
please do not leave screen as it will activate a pause screen that will call for you to return to the screen 
and restart the game.


# - Description of Project -
This interactive installation is a soccer goalie simulator, in which you are challenged to 
block balls from entering your goal. The two tasks our group focused on was (1) getting the 
user to physically move their body to complete an objective, and (2) pushing the user to 
complete said objective in a given time limit. THe objective of blocking soccer points is 
achieved by the user moving their hands, chest, and face to the position of an incoming soccer 
ball, achieving the first task of physical movement. We added a time limit of 1 minutes for this 
game, as the installation tracks both blocked balls (under "Score") and missed balls 
(under "Conceded"). 


# - Constraints -
We have some constraints for this installation. We highly suggest having the most updated intergrative development environment that is suitable to run python commands in terminal. For certain machines, ensuring you are typing "python3 rather than just "python", is critical for the code to work. 

Some other constraints are:

(1) The height of the display - the display to camera height is set to be too high that when the user’s eyes are leveled with the screen, only half of the body can be seen. If the user wants to see the full body, he has to move far back, which is too far for valid sensor reading and visual indication. To compensate that, we made our game half-body movement only and limited the user interaction space to a smaller bounding box instead of the whole screen. We also made our interaction Z-axis independent so the user doesn’t have to consider depth differences and can pick the best visible range for them.

(2) The latency of the sensor reading: there is an about a one second delay between reading in the data and transmitting it through the server. So everything the user does will be behind by 1 second. Since our game is reaction based, we had to lower the difficulty and make the ball linger in the area longer to account for such latency.

(3) Spatial constraints: the display is at a corner, so the user gets more space the more back he moves, but then the sensor data gets less accurate. There are also printer and table around the mid range, which added challenge to the available space of user’s movement. To account for that, we added a ratio to user’s x axis movement so the reading is amplified, in that when the user moves to the edge of the sensor, the character moves to the edge of the game space. Regarding the y axis, we scaled down the movement ratio so the user can stay relatively stable Y-axis wise as vertical movements won’t matter much due to height difference too. We think the emphasis on horizontal movement provided safety and flexibility in such a limited space.


# - Collaboration Record -
We divided the work evenly based on  each person's expertise and previous experience. Annika Xu made contributed a lot of work on the actual gameplay and flow of the project, as she coded the movement of the user's body parts, the scoring functions, as well as the movement and speed of the soccer balls. Nick (Jihe) focused data parsing, as well as helping Annika with gameflow and merging everyone's work together. Naheem Watson and Ithesham Khan tackled the html and overall game design. Naheem created the main game page design, as well as the code the timer and level update. Both update and change color change as the game progresses. Ithesham created the eye-catching design for the intro and results html page. Ithesham and Naheem worked together to ensure that colors and themes were consisted over every screen. All 4 members met multiple times to run tests, merge different work together, and to get help when needed. Our consistent communication over text-message is what led to a successful installation, and we are excited to move forward to user testing!


Below is same information, but written individually.

Student Name and NetID: Annika Xu (xx238) 
Contribution: 


Student Name and NetID: Jihe He jh2972
Contribution: 


Student Name and NetID: Naheem Watson nrw27
Contribution: 


Student Name and NetID: Ihtesham Khan - ik352
Contribution: 