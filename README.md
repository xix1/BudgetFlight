# Functional Specification
* Project Vision: 
ShiBudgetExplorer is a travel planning web application offers an intuitive way for users to search for available flights based on their specific requirements or simply receive recommendations for low-cost flights based on their chosen departure point. Beyond its travel planning features, ShiBudgetExplorer also includes a delightful little feature for users who need a quick, light-hearted break: a gallery of Shiba Inu photos, accessible at just the click of a button. Through its user-friendly interface, efficient functionality, and a touch of fun, ShiBudgetExplorer aims to provide an engaging, useful, and enjoyable experience for all users.

* Core Functions:
  * **User Authentication**: Users can register, log in, and use third-party authentication options such as Google.
  * **Flight Search**: Two types of search, one is a precise search for flights based on the information provided, and the other is to recommend low cost flights to any location based on the departure point and optional information provided by the user.
  * **Save and delete Itineraries**: Users can save their personalized itineraries and delete any itineraries.
  * **Provide Shiba Inu photos**: With just a click of a button, users can see random pictures of Shiba Inu obtained from third-party APIs for users who need a break and relaxing entertainment.
  
# Technological Specification
* Client Framework: **Vue 3** with **Composition API** will be used as the client-side framework to build a reactive, modular, and maintainable user interface for the application. **Pinia** will be used for state management in the application, which is a lightweight and flexible alternative to Vuex, compatible with Vue 3's composition API. For styling and enhanced user experience, Tailwind CSS and Iconify will be used. 

* Server Framework/Backend Service Setup: 
 **Flask** will be used as the backend framework. Flask provides a solid foundation for building RESTful APIs and allows for easy integration with various third-party services and libraries. It offers the flexibility and simplicity needed for the app.

* Authentication Service: 
 **Firebase Authentication** will be integrated into the application to manage user authentication, providing a secure and scalable solution for handling user registration and login.

* Database Service: 
 **Firebase Firestore** will be used for real-time data storage and synchronization. This NoSQL cloud database can store and sync data across client apps in real-time.
