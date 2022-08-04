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
    - seed sample product
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
26. Implement Select Payment Method Screen
    - create input forms
    - handle submit
27. Create Place Order Screen
    - show cart items, payment and address
    - culculate order summary
28. Implement Place Order Action
    - handle place order action
    - create order create api
29. Create Order Screen
    - create backend api for order/:id
    - fetch order api in frontend
    - show order infomation in 2 colums
30. Pay Order by PayPal
    - generate paypal client id
    - create api to return client id
    - npm i react-paypal-js
    - use PayPalScriptProvider in index.js
    - use usePayPalScriptReducer in Order Screen
    - implement loadPaypalScript function
    - render paypal button
    - implement onApprove payment function
    - create pay order api in backend
31. Display Order History
    - create OrderHistory screen
    - create order history api
    - use api in the frontend
32. Create Profile Screen
    - get user info from context
    - show user information
    - create user update api
    - update user info
33. Publich To Heroku
    - create and config node project
    - serve build folder in frontend folder
    - create heroku account
    - connect it to github
    - create mongo atlas database
    - set database connection in heroku env variables
    - commit and push
34. Add Sidebar and Search Screen
    - add sidebar(Offcanvas)
    - add search box
35. Create Search Screen
    - show filters
    - create api for search products
    - display results
36. Create Admin Menu
    - define protected route component
    - define admin route component
    - add menu for admin in header
37. Create Dashboard Screen
    - create dashboard ui
    - implement dashboard api
    - connect ui to backend
38. Manage Products
    - create products list ui
    - implement backend api
    - fetch data
39. Create Product
    - create products button
    - implement backend api
    - handle on click
40. Create Edit Product
    - create edit button
    - create edit product ui
    - display product info in the input boxes
41. Implement Update Product
    - create edit product backend api
    - handle update click
42. Upload Product Image
    - create cloudinary account
    - use the api key in env file
    - handle upload file
    - implement backend api to upload
43. Delete Product
    - show delete button
    - implement backend api
    - handle on click
44. List Orders
    - create order list screen
    - implement backend api
    - fetch and display orders
45. Deliver-Order
    - add deliver button
    - handle click action
    - implement backend api for deliver
46. Delete Order
    - add delete button
    - handle click action
    - implement backend api for delete
47. List Users & Delete User
    - create user list screen
    - add delete button
    - handle click action
    - implement backend api for get all user and delete user
    - fetch and display users
48. Edit User
    - create edit button
    - create edit user ui
    - display user info in the input boxes
    - implement backend api
    - handle edit click
    - warning(need implement fail safe functionality for isAdmin edit)
