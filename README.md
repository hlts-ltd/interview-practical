
### Rashid's PR Notes:
Installation:
`npm i`

The following will create dummy users in the database:

Setting up Prisma schema
`npx prisma db push`

Seeding the db
`npx prisma db seed`

Viewing the database stucture and content
`npx prisma studio`

Dropping database
`npx prisma migrate reset --skip-seed`

Login and Sign-up work as expected with the exception of not having any validations in place, the plan was to add some basic Zod validations on the backend (server components) and frontend (to convey to user what the issue is) but I didn't get to it unfortunately. The sign-up page is also missing the 'bio' textarea, which I realised a bit too late, but which can be updated using the user profile edit page. 

I have written a new authentication mechanism using oslojs, argon2 and prisma. 

Once logged in, only the first two header navbar links are currently working and the Signout link (clicking on the image on the top right hand corner). 

The users page lists all the users (dummy and newly created accounts) with their names and emails. Other fields can be easily added should one decide to do so. A rather large table (consisting of 8 files) is being used to display the users. The table is sortable and filterable (by user name). The three dots (...) controls for each user brings up a dropdown consising of viewing, updating and deleting the user, but only the updating currently works. 

It's a very rough application missing proper validation, error handling, clean file architecture and solid data typing. Due to time limitations, this is the best I could do in 2 days. 


### Improvements
Here are some of the things that can be improved on:

- Validating all forms/inputs using Zod and  toast notifications for the client side
- Deleting files/folders and npm packages that are not being used e.g. shadcn ui, old session file etc.
- Better folder/file structures, actions can be grouped together in a folder for example
- Better typing using interfaces/types
- Logout mechanism is poor as the logout function gets triggered on the '/logout' endpoint
- Full CRUD support for modifying users including being able to update/delete all user data (name, bio, music...) on the UI
- Cohesive UI look and feel
- Making use of the loading.js to have a fallback
- Running npm build before pushing the changes
- Writing tests 

