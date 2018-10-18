# blog


# 


### Installation and Getting Started
```sh
$ npm init
$ npm install
$ nodemon app.js (server side)
$ mocha (server side to test)
$ yarn run serve (client side)
```  

### List of API  

#### User - General (w/o authentication)
##### User register

Route | HTTP | Description | 
----- | ---- | ----------- | 
/users/ | POST | sign up for new user |  

#####  Input
###### first_name: e.g. Rudy (put in req.body)
###### last_name: e.g. Rudy (put in req.body)
###### email: e.g. rudy@gmail.com (put in req.body)
###### password: e.g. 1234 (put in req.body)



##### User login

Route | HTTP | Description | 
----- | ---- | ----------- | 
/login | POST | sign in for existing user |  

#####  Input
###### email: e.g. rudy@gmail.com (put in req.body)
###### password: e.g. 1234 (put in req.body)  

 


##### Get Users
Route | HTTP | Description | 
----- | ---- | ----------- | 
/users/ | GET | Get all users |  

#####  Input
###### token: e.g. apptoken='string_token' (put in req.headers)

Route | HTTP | Description | 
----- | ---- | ----------- | 
/users/ | PUT | Get all users |  

#####  Input
###### token: e.g. apptoken='string_token' (put in req.headers)
###### first_name: e.g. Rudy (put in req.body)
###### last_name: e.g. Rudy (put in req.body)
###### email: e.g. rudy@gmail.com (put in req.body)
###### password: e.g. 1234 (put in req.body)


Route | HTTP | Description | 
----- | ---- | ----------- | 
/users/ | DELETE | delete users |  

#####  Input
###### token: e.g. apptoken='string_token' (put in req.headers)



Route | HTTP | Description | 
----- | ---- | ----------- | 
/articles/ | PUT | Get all articles |  

#####  Input

Route | HTTP | Description | 
----- | ---- | ----------- | 
/articles/ | POST | Create a new article |  

#####  Input
###### token: e.g. apptoken='string_token' (put in req.headers)
###### title: e.g. title (put in req.body)
###### description: e.g. desctiption (put in req.body)

Route | HTTP | Description | 
----- | ---- | ----------- | 
/articles/byid | POST | Get a article by id_article|  

#####  Input
###### id: e.g. id (put in req.body)


Route | HTTP | Description | 
----- | ---- | ----------- | 
/articles/byid | POST | Get a article by id_article|  

#####  Input
###### id: e.g. id (put in req.body)

Route | HTTP | Description | 
----- | ---- | ----------- | 
/articles/| PUT | Edit a article by articleid|  

#####  Input
###### token: e.g. apptoken='string_token' (put in req.headers)
###### articleid: e.g. articleid (put in req.body)
###### title: e.g. title (put in req.body)
###### description: e.g. desctiption (put in req.body)

Route | HTTP | Description | 
----- | ---- | ----------- | 
/articles/| DELETE | Delete a article by articleid|  

#####  Input
###### token: e.g. apptoken='string_token' (put in req.headers)
###### articleid: e.g. articleid (put in req.body)


Route | HTTP | Description | 
----- | ---- | ----------- | 
/articles/search| POST | search articles by title|  

#####  Input
###### token: e.g. apptoken='string_token' (put in req.headers)
###### search: e.g. 'string_text' (put in req.body)


Route | HTTP | Description | 
----- | ---- | ----------- | 
/articles/byauthor| GET | s Get all articles by author login|  

#####  Input
###### token: e.g. apptoken='string_token' (put in req.headers)