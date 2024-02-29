# Find Your Next Book To Read

## Overview

This project is a web application designed to help users discover new books based on their favorite books and genres. It leverages the OpenAI API to generate book suggestions and utilizes the Open Library API to fetch book details.

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- An OpenAI API key

## Setup

1. **Clone the Repository**

   Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Abbas-Abdelila/read-this-book-next.git
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the required dependencies:

   ```bash
   cd read-this-book-next
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root of your project directory and add your OpenAI API key:

   ```
   OPEN_AI_KEY=your_openai_api_key_here
   ```

   Replace `your_openai_api_key_here` with your actual OpenAI API key.

4. **Run the Application**

   Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Usage

- **Adding Favorite Books**: Users can add their favorite books to the application. The application will then use this information to generate book suggestions.
- **Selecting Genres**: Users can select their favorite genres. The application will use this information along with the favorite books to generate more personalized book suggestions.
- **Viewing Suggestions**: Based on the user's preferences, the application will display a book suggestion with a brief explanation of why the user might enjoy it.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---
