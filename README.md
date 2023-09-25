# JIVA UI : Frontend for JIVA(Judges' Intelligent Virtual Assistant)

[JIVA UI](https://jiva-ui-fer6v2lowq-uc.a.run.app) is the frontend service that is specific to the JIVA (Judges' Intelligent Virtual Assistant) application which provides the necessary UI for acts and law documents and handles their respective data (the JIVA service APIs). 

The tech stack mainly includes React with Typescript and also [Material UI](https://mui.com/material-ui/) as the UI library.

# 🔧 1. Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To use the code, you need to follow these steps:

1. Clone the repository from GitHub:

   ```bash
   git clone git@github.com:OpenNyAI/jiva-ui.git
   ```

2. The code requires **Node 18 or higher** and the project follows Yarn package system. Go through the official [Node](https://nodejs.org/en/docs) documentation to install Node and Yarn in your respective systems.

3. Once Node is installed, go into the folder and run the following command to install the dependencies:

   ```bash
   yarn install
   ```

This command will install all the dependencies, that are mentioned in **package.json** and create a **node_modules** folder at the root of your project directory.

_Note: The project contains two **env** files, **.env.development** and **.env.production**, which basically contain two values of **REACT_APP_API_ENDPOINT** variable in development and production environments respectively._


# 🏃🏻 2. Running

Once the above installation steps are completed, run the following command in the root folder of the repository in terminal, to start the application, with APIs in development environment, where the backend API uses localhost:8080

```bash
yarn start:dev
```

Run the following command in the root folder of the repository in terminal, to start the application, with APIs in production environment, where the backend API uses [https://jiva-service-fer6v2lowq-uc.a.run.app](https://jiva-service-fer6v2lowq-uc.a.run.app)

```bash
yarn start:prod
```

*yarn start* runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


# 📃 3. Specification and Documentation

### Folder Structure

```
.env.development
.env.production
.eslintignore
.eslintrc.json
.gitignore
.storybook
   |-- main.js
   |-- webpack.config.js
Dockerfile
README.md
dev
nginx
   |-- nginx.conf
package.json
public
   |-- BookmarkEmpty.png
   |-- Clear-Search-1.svg
   |-- DocumentExcerpts.png
   |-- SearchIcon.png
   |-- SearchLegalDocuments.png
   |-- Thumbnail.png
   |-- favicon.ico
   |-- index.html
   |-- jivaIcon.png
   |-- loader.gif
   |-- logo192.png
   |-- logo512.png
   |-- manifest.json
   |-- robots.txt
src
   |-- App.css
   |-- App.test.tsx
   |-- App.tsx
   |-- assets
   |   |-- Bookmark.png
   |   |-- DocumentIcon.png
   |   |-- Menu.png
   |   |-- NotShow.png
   |   |-- Notifications.svg
   |   |-- Search.png
   |   |-- Show.png
   |   |-- Thumbnail.png
   |   |-- User.png
   |   |-- jivaLogo.png
   |-- components
   |   |-- ActivityHeader.tsx
   |   |-- ActivityMenu.tsx
   |   |-- ActivityTable.tsx
   |   |-- AppHeader.tsx
   |   |-- AppIntro.tsx
   |   |-- AudioInput.css
   |   |-- AudioInput.tsx
   |   |-- AuthAppbar.tsx
   |   |-- AuthButton.tsx
   |   |-- BookmarkCard.tsx
   |   |-- BookmarkDocCard.tsx
   |   |-- BookmarkEditMenu.tsx
   |   |-- BookmarkTable.tsx
   |   |-- BotMessage.tsx
   |   |-- ClearActivityDialog.tsx
   |   |-- ClearSearchDialog.tsx
   |   |-- CustomAppBar.tsx
   |   |-- DeleteActivity.tsx
   |   |-- DocumentAutoComplete.css
   |   |-- DocumentAutoComplete.tsx
   |   |-- DocumentNotFound.tsx
   |   |-- DocumentsSearch.css
   |   |-- DocumentsSearch.tsx
   |   |-- DrawerSpace.tsx
   |   |-- EditionMenu.tsx
   |   |-- EditionsList.tsx
   |   |-- FeedbackButtons.tsx
   |   |-- GridItem.tsx
   |   |-- HamburgerMenu.tsx
   |   |-- Header.css
   |   |-- Header.tsx
   |   |-- Information.tsx
   |   |-- Introduction.css
   |   |-- Introduction.tsx
   |   |-- JivaLogo.tsx
   |   |-- Label.css
   |   |-- Label.tsx
   |   |-- Loader.css
   |   |-- Loader.tsx
   |   |-- LoadingButton.css
   |   |-- LoadingButton.tsx
   |   |-- LoadingIcon.tsx
   |   |-- Main.tsx
   |   |-- Menu.css
   |   |-- Menu.tsx
   |   |-- MetaDataCard.css
   |   |-- MetaDataCard.tsx
   |   |-- Metadata.tsx
   |   |-- Notifications.tsx
   |   |-- PDFRenderer.css
   |   |-- PasswordField.tsx
   |   |-- PdfHeader.tsx
   |   |-- PdfRendererSecond.tsx
   |   |-- Query.css
   |   |-- Query.stories.tsx
   |   |-- Query.tsx
   |   |-- SearchResultResponses.tsx
   |   |-- SearchWord.tsx
   |   |-- SectionCard.css
   |   |-- SectionCard.tsx
   |   |-- ShareMenu.tsx
   |   |-- SuccessMail.tsx
   |   |-- SupportDialog.tsx
   |-- fonts
   |   |-- OFL.txt
   |   |-- Urbanist-SemiBold.ttf
   |-- index.css
   |-- index.tsx
   |-- layout
   |   |-- AuthLayout.tsx
   |   |-- Layout.tsx
   |-- logo.svg
   |-- prop-types
   |   |-- BookmarkProps.tsx
   |   |-- BotMessageProps.tsx
   |   |-- ChatBotProps.tsx
   |   |-- CustomContextProps.tsx
   |   |-- DocumentAutoCompleteProps.tsx
   |   |-- FormProps.tsx
   |   |-- LayoutProps.tsx
   |   |-- MenuProps.tsx
   |   |-- PdfProps.tsx
   |   |-- RecentDocumentProps.tsx
   |   |-- UserMessageProps.tsx
   |-- react-app-env.d.ts
   |-- reportWebVitals.ts
   |-- screens
   |   |-- AboutJiva.css
   |   |-- AboutJiva.tsx
   |   |-- Activity.tsx
   |   |-- AuthenticationFlow.css
   |   |-- Bookmark.tsx
   |   |-- Bookmarks.tsx
   |   |-- Chatbot.css
   |   |-- Chatbot.tsx
   |   |-- Error.tsx
   |   |-- Feedback.tsx
   |   |-- Login.tsx
   |   |-- LoginForm.css
   |   |-- LoginForm.tsx
   |   |-- Pdf.tsx
   |   |-- ResetPassword.tsx
   |   |-- ResetPasswordForm.tsx
   |   |-- ResetPasswordSuccess.tsx
   |   |-- ResetPasswordSuccessForm.tsx
   |   |-- UpdatePassword.tsx
   |   |-- UpdatePasswordForm.tsx
   |-- setupTests.ts
   |-- theme
   |   |-- theme.tsx
   |-- utilities
   |   |-- Api.tsx
   |   |-- CurrentDate.tsx
   |   |-- CustomContext.tsx
   |   |-- DateIdentifier.tsx
   |   |-- MonthConversion.tsx
   |   |-- Parsing.tsx
   |   |-- PlatformIdentifier.tsx
   |   |-- ProtectedRoute.tsx
   |   |-- Services.tsx
   |   |-- useKeyPress.tsx
tsconfig.json
yarn.lock
```
- All the source code is within `/src` folder.
- There are two types of routes in this project:
   - routes that do not require authentication and the pages they belong to(you can find details about these in  `/src/App.tsx` ):
      - **/login** : The Login page where you can login with your existing credentials
      - **/reset-password** : The Reset Password page where you can reset the password of your existing credential, by providing your email id(credential)
      - **/reset-password-success/:emailId** : The Reset Password Success page which comes when the reset password mail has been sent successfully to your provided credential and you get an option to resend the mail here.
      - **/update-password** : The Update Password page which you originally get through your password reset mail where you have to update your password.
      - error page which appears when no verified route comes.
   - routes that require authentication and cannot be accessed unless you login (if you access these routes without login, you will be redirected to login page and you can find details about these in `/src/layout/Layout.tsx`) : 
      - **/search** : The Search page which appears as soon as you log in with the existing search results(if any). The search happens in a conversation format with the user-query (in the right) and bot-response (in the left) pair. Here, you can search for any specific document (act or amendment or notification, etc) or do a generalized search for a specific act. You can also search for sections of a particular act.
      - **/pdf/:id/:page** : The Pdf page which is a pdf viewer, where you can see any document (act, notification, amendment, section, etc) in a pdf format along with the document information and also with suitable pdf actions.
      - **/bookmarks** : The Bookmarks page where all the bookmarks are shown according to the document name and number of bookmarks present in that document.
      - **/bookmark/:docId** : The Bookmark page of a particular document where all the bookmarks of that particular document, along with their page numbers, are shown in a tabular format.
      - **/about-jiva** : The About Jiva page which tells what is JIVA, what is its purpose and how it can used.
      - **/activity** : The Activity page where the search activity of a particular user is shown in tabular format, according to dates.

# 🚀 4. Deployment

This repository comes with a Dockerfile which is present in the root of the project directory. You can use this dockerfile to deploy your version of this application to Cloud Run.
Make the necessary changes to your dockerfile with respect to your new changes. (Note: The given Dockerfile will deploy the base code without any error, provided you added the required environment variables (mentioned in the .env file) to either the Dockerfile or the cloud run revision).

You can run the following command to to build the application, with APIs in development environment, where the backend API uses localhost:8080:

```bash
yarn build:dev
```

Run the following command to build the application, with APIs in production environment, where the backend API uses [https://jiva-service-fer6v2lowq-uc.a.run.app](https://jiva-service-fer6v2lowq-uc.a.run.app)

```bash
yarn build:prod
```

_`yarn build` builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information._


# 📜🖋 5. Yarn commands

- All the yarn commands like install, start, build, test, etc. are specified inside a file called **package.json**. You can check out and customize the commands in this file.
- Adding package through yarn:

  - To add a new npm package to the project, run the following command:

    ```bash
    yarn add <package-name>
    ```

  - To add a custom package to the project, run the following command:

    ```bash
    yarn add <path_to_custom_package>
    ```

- Removing package through yarn:

  - To remove a npm package from the project, run the following command:

    ```bash
    yarn remove <package-name>
    ```

- Running tests through yarn:

  - To run all the tests, run the following command:

    ```bash
    yarn test
    ```

  - To run a specific test, run the following command:

    ```bash
    yarn test <path_to_test_file>
    ```

- Ejecting through yarn:

  - To eject, run the following command:

    ```bash
    yarn eject
    ```

    **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

    If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

    Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

    You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.   

# 👩‍💻 6. Usage

To directly use the JIVA UI without cloning the repo, you can follow below steps to get you started:

1.  Visit [https://jiva-ui-fer6v2lowq-uc.a.run.app/](https://jiva-ui-fer6v2lowq-uc.a.run.app/).
2.  Now you can go through the application, but make sure to create a user in the Jiva Backend Service, before you proceed.
