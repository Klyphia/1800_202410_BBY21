# Schmoney

## 1. Project Description
Schmoney is a browser based web application that can track your input spending, provide a visual representation on how much you've spent, 
and provide a notification when you're overbudget. 

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Kyle! I'm excited to start working on this program!
* Hi, my name is Raphael! I'm excited to make this program possible!
* Hi, my name is Robin! I'm excited to start working on this program.
* ...
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* SociableKIT Support (Widget for generating RSS feed for Home.html)
* ...

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Click on log in> Enter in user credentials-> Navigate to budget.html and enter in budget items> navigate to savingsgoals.html and set goals>
* > go back to budget.html and get notification ping if other entered items are above savingsgoals.html set limits. 
* ...
* ...

## 5. Known Bugs and Limitations
Here are some known bugs:
* Pie chart on budget.html does not update unless you refresh the page.
* Transaction journal on savingsgoals.html doesn't properly delete previous old entries like originally intended, best fix was just to change deleted items to red.
* Settings page doesn't work, full functionality not enabled from original bootstrap template. 
* App doesn't have proper registration, only check is on login if user has same email as one already in database, only permits login in this case if same password is input.
* RSS feed on home.html is sociablekit widget, it irregulary updates articles, not always up to date. Can't change because pre-generated widget. 

## 6. Features for Future
What we'd like to build in the future:
* Properly filled out template pages
* Import function from other applications so user doesn't need to manually input budget items.
* ...
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├──AboutUs.html              # About us html file, incomplete with placeholder template from bootstrap. Accessed from navbar.
├──Budget.Html               # Budget html file, users add in spending items here, has pie chart enabled here. Accessed from navbar.
├──Company.Html              # About schmoney html file, incomplete with placeholder. Accessed from navbar.
├──customgoal.html           # Original budget goal html file, later combined into savingsgoals.html, left incomplete. Accessed from navbar.
├──Home.html                 # Home page html file, accessed after login.html.
├──login.html                # Login html file, accessed after clicking on "log in" from index.html. 
├──Register.html             # Register html file, incomplete test page, later combined into login.html
├──Savingsgoals.html         # Savings Goals html file, accessed from navbar after logged in as user. 
├──Settings.html             # Settings html file, accessed from navbar after logged in as user. 
└── README.md                #What you're reading now

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /pic1.jpg                # About us placeholder pic from unsplash 
    /pic2.jpg                # About us placeholder pic from unsplash
    /pic3.jpg                # About us placeholder pic from unsplash
    /pic4.jpg                # About us placeholder pic from unsplash
    /schmoney.png            # AI generated logo

├── scripts                  # Folder for scripts
    /authentication.js       # JS for firebase authentication+sign-in.
    /budget.js               # JS for budget.html
    /categories.js           # JS for changing budget items in savingsgoals.js
    /firebaseAPI_BBY21.js    # JS function that initializes firebase and sets it up.
    /main.js                 # JS function for pulling user name from firestore and inserts into div.
    /Register.js             # JS for register.html -Unused
    /savingsgoals.js         # JS for savingsgoals.js
    /script.js               # Jscript function used to log user out.
    /settings.js             # JS for settings.html
    /skeleton.js             # Function for loading navbar.

├── styles                   # Folder for styles
    /savingsgoals.css        # Style for savingsgoals.html
    /settings.css            # Style for settings.html
    /style.css               # Initial base style for all pages initially as default template

├── text                     # Folder for re-usable HTML elements
    /footer.html             # Webpage footer html
    /nav_in.html             # Webpage navbar html when logged in
    /nav_out.html            # Webpage navbar html when not logged in 



```


