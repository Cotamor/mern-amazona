# MERN AMAZONA

# Lessons

1. Introduction
2. Install Tools
3. Create React App
4. Create Git Repository
5. List Products
   - create products array
   - add product images
   - render products
   - style products
6. Add Routing
   - npm i react-router-dom
   - create route for home screen
   - create route for product screen
7. Create Node Server
   - npm i express
   - npm i nodemon --save-dev
   - npm i dotenv
   - create server.js
8. Fetch Products From Backend
   - set proxy in package.json
   - npm install axios
   - npm install morgan(backend logger)
   - use state hook
   - use effect hook
9. Manage State by Reducer
   - define reducer
   - update fetch data
   - get state from useReducer
10. Add Bootstrap UI
    - npm install react-bootstrap bootstrap
    - npm install react-router-bootstrap
    - update App.js
11. Create Product and Rating Component
    - create Product & Rating component
    - add fontawesome CDN
12. Create Product Details Screen
    - npm install react-helmet-async
    - fetch product from backend
    - create 3 columns for image, info and action
13. Create Loading and Message Component
    - create Loading, Spinner, Message components
    - create utils.js to define getError function
14. React Context for add item to cart
    - createContext
    - define reducer
    - store provider
    - implement add to cart button
15. Complete Add to Cart
    - check exist item in the cart
    - check count in stock in backend
16. Create Cart Screen
    - create 2 columns
    - display item list
    - create action column
17. Complete Cart Screen
    - click handler for inc/dec item
    - click handler for remove item
    - click handler for checkout
18. Create Signin Screen
    - create sign in form
    - get query param with URLSearchParams and useLocation
19. Connect To MongoDB Database
    - create atlas mongodb database
    - install local mongodb database
    - npm install mongoose
    - connect to mongodb database
20. Seed Sample Products
    - create Product model
    - create seed route
    - use route in server.js
    - seed sample product(go to url 'http://localhost:5000/api/seed')
21. Seed Sample Users
    - create user model
    - seed sample users
22. Create Signin Backend API
    - create signin api
    - npm install jsonwebtoken
    - define generateToken
23. Complete Signin Screen
    - handle submit action
    - save token in store and local storage
    - show user name in header
    - npm install react-toastify
24. Create Shipping Screen
    - create form inputs
    - handle save shipping address
    - add checkout wizard bar
25. Create Signup Screen
    - create input forms
    - handle submit
    - create backend api
    - still room for improvement(error msg for dup emai)
