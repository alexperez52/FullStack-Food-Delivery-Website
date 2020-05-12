
This website allows 3 main functionalities. You can be a Restaurant Owner, a Customer, or a Driver.
For the back-end, I used Springboot Java and postgreSQL data base while using Java Persitence API to update my database and keep it persistent so that all of the data is there even after you turn off the server. 
For the front-end I used React javascript with HTML and CSS. I used a few React libraries to implement some features such as Axios which allows to send http requests to my back end. Using this i could get data, post data, edit data and delete data. I also used the React Router library to create all of the routes on my website. The router allows access to different URLs so that the user could navigate through the website to only existing links. This library also allows dynamic routing which was useful for implementing dynamic urls based on registered restaurants by using their unique ID.

React was essential in helping me develop the front end since it has good compatible libraries and also due to the fact that it allows you to create components and re-use. This helped with displaying multiple menu items or restaurants etc as well as re-using the login and register page in certain parts of the website. 

The Front-end handles all of the buttons and forms to fill out and send data, it would send and retrieve data using the axios library which communicated to my back end in order to perform database changes with the data. The endpoints were hosted through the port 8080 and the front end was hosted with the port 3000.

Restaurant Owner: 
- 
Is able to register and login as well as create a restaurant or modify his restaurant (one restaurant per account). He can also edit his user information such as username first name etc as well as his personal Address. Once his restaurant is created, he can create, edit and delete menu items that other users can all see when they visit his restaurant. An owner is also able to view analytics page where it shows all of the invoices that correspond to his restaurant. He can view who ordered from his restaurant and how much money he has earned from selling food.

Customer:
-
Is able to register and login and view all the restaurants avaialable as well as editing their user information and address. Customers are able to add items to their cart and place orders. They can also see the status of their order, wether its on its way or complete and delivered to their door steps. Their payment details are saved. Then the customer could also leave a review for the restaurant that he just ordered from. 

Driver:
-
Is able to view all existing orders and can accept and complete them which would update the order's status. The driver also makes 10% cut from the order total and it's added to his analytics. He could also edit his profile, such as username, or anything of the sort including address.

UPDATES FOR THE FUTURE:
-
I do plan on working on this project more. There was still a lot of stuff that I wanted to tweak or implement but I did not have enough time for it since I took 17 credits this semester.
A few of these updates include
-A working "Log in with facebook or google"
-Driver profile ratings
-Better analytics for the owner and driver
-Better design for the restaurant catalog page\
-Functional category tags and search restaurants by category or even food items
-A better restaurant page design
-Allow for uploading images instead of using URLs

Tech Updates:
-
I plan on learning Redux for global state mamagement instead of using contexts. 

Final Thoughts:
-
Overall this project was really challenging. There was so much to learn and for me the hardest part was being able to identify what i needed to learn. It was my first ever web related project but it has opened my eyes to the possibilities of web. I am really inspired to make my personal website now that i know how to program web applications. I am greatful to Professor Chen and Professor Li for always assigning challenging projects because this is truly how you learn to push yourself and learn something that you otherwise wouldn't. My experience at suffolk community college was amazing and i would recommend the CSE courses there to anyone that asks. 
