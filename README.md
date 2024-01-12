# Grocery-shopping-list

Group Members   
Bethlehem Getachew => UGR/4788/14   Elizabet Yonas => UGR/6912/14    Meklit Asrat => UGR/5387/14    Niyat Debesay => UGR/6203/14




Welcome to our Grocery Shopping List Web App, designed to simplify and organize your shopping experience. This application comes with essential CRUD functionalities, allowing you to effortlessly create, update, and delete your shopping lists. 

To ensure security and personalization, the app features user authentication. New users can easily register, and existing users can securely log in. 

Within each list, you have the flexibility to add, edit, or remove items, tailoring your lists to your specific needs. Whether you're a meticulous planner or prefer spontaneity, our Grocery Shopping List Web App is here to streamline your grocery shopping. Get started by cloning the repository, installing dependencies, and configuring the app to suit your preferences. Happy shopping!


# Frontend Structure
## src

# Backend Structure
## backend
## src
## test
## packages


# Admin Account Setup and User Management Guide

## Admin Credentials
To create an admin account on the signup page, please use the following credentials:
- Username: **admin**
- Password: **123445**

Upon successful signup with the provided credentials, the backend will automatically assign the admin role to the user.

## Admin Privileges and User Management

As an admin, you will have access to a dedicated "Manage User" page. This page allows you to perform various actions to manage user accounts. Below are the available functionalities on the "Manage User" page:

### 1. Read User Accounts
- You can view a list of all user accounts registered in the system.
- This provides an overview of the users and their associated information.

### 2. Delete User Accounts
- You have the authority to delete user accounts from the system.
- Exercise caution when deleting user accounts as this action is irreversible.

### 3. Edit User Accounts
- You can modify user account details, such as username, email, or other relevant information.
- This functionality allows for updating user information as needed.

Please note that these privileges are exclusively granted to administrators to ensure proper user account management.

We recommend using these privileges responsibly and only accessing and modifying user accounts within the scope of your administrative duties.

# Authentication and Authorization
To utilize its capabilities, the shopping list website requires registration. The listings page is not accessible to users who are not signed up or logged in. 
Both users and administrators have a logout option located within the navigation bar. Users are sent to the login page by clicking the logout button.
Users may add lists, along with the dates and items they include, on the lists page, which also shows any existing lists that have been established. 
An administrator has the ability to add, remove, and edit users.


# Overview of CRUD CAPABILITIES
## Features
### 1.USER
A user can 
a.	Create  :Users can create an account and set up their password. 
      A User can create a list with list items inside after he/she has signed up
      
b.	Read: Users can see the lists they have  created

c.	 Delete: User can delete a list that has been created

d.	 Update: A user can edit the lists name, date and the items inside the list

### 2.Admin
An admin has the following features
a.	Create: An admin can create a user

b.	Read: Users information is displayed on the admins dashboard

c.	Update: An Admin can change/update users credentials(i.e. username and password)

d.	Delete: An admin can delete a user from the database.


# Database Justification
### Adaptable Schema Architecture: A flexible, schema-less document model is used by the NoSQL database MongoDB. This adaptability is useful for managing data with varied formats, which is typical in shopping lists where different properties may apply to different products.
### Scalability: Because MongoDB is made to scale horizontally across several servers, it can manage a big user base and an expanding dataset. Scalability is important as user loads on a shopping list website may fluctuate.
### Excellent Results: MongoDB's read and write speed is optimized. Its memory-mapped storage engine and index support make it an effective query tool, particularly when working with big datasets.
### Framework for Aggregation: A strong aggregation architecture offered by MongoDB enables sophisticated data processing, filtering, and querying. This may be used to create summary, analytics, and personalized shopping list views.
### Ecosystem and Community: The MongoDB community is sizable and vibrant. This indicates that a wealth of information, guides, and third-party tools are accessible. Various drivers for different programming languages are part of the MongoDB ecosystem.



                                                                                                                
