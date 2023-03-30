# Functional Specification
* Project Vision: 
EuroBudgetExplorer is a budget travel planning web application for European students who want to explore Europe while being cost-conscious. The application offers an intuitive way for users to create personalized itineraries within Europe based on their budget, number of people traveling, time frame, countries or cities of interest, and specific attractions.

* Core Functions:
  * **User Authentication**: Users can register, log in, and use third-party authentication options such as Google and Facebook.
  * **Trip Creation**: Users can input their budget, number of travelers, time frame, and preferences to generate a customized travel itinerary.
  * **Accommodation and Transportation**: The application will provide options for accommodations (hotels/youth hostels) and transportation (airfare, trains, buses) based on the user's budget and preferences.
  * **Attractions and Activities**: Users can discover attractions and activities in their destination cities, with entrance fees included in the budget calculation.
  * **Weather Information**: Local weather forecasts will be displayed for each destination to help users plan their activities accordingly.
  * **Save and Share Itineraries**: Users can save their personalized itineraries and share them with friends.
# Technological Specification
* Client Framework: **Vue 3** with **Composition API** will be used as the client-side framework to build a reactive, modular, and maintainable user interface for the application.

* Server Framework/Backend Service Setup: 
 **Django** will be used as the backend framework for creating a RESTful API, handling user authentication, and managing data storage. Django's built-in authentication system and the django-allauth package will be used for user registration, login, and social authentication.
