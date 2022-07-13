# project plan

### Monday :

- On Monday, I mainly focused on developing the backend logic. My goal was to
  complete the backend on the same day so that I can dedicate more time for the
  front end which I manged to do so in about three hours. I created rest api for
  both user and pet, and to comply with the sepration of concern I created
  separate folders for modles, routes, controllers, and middlewares.

### Tuesday :

- Before setting up my forntend project, I sketched out the layout of my fronend
  (separating private and public components). Next, I set up the angular project
  and created the user signin and signup components. I put validatio rules in
  the appropraite inputs oin both components. I used bootstarp class to style
  the user interface and to show validation alert conditionally. I also created
  a service that fetch user data (token) from the backend , and I wrote
  functionality that stores the token in the local storage so that the page
  persist when the page refreshes. I worked for about six hours developing what
  I mentioned above plus reading some documentations.

### Wednsday :

- I started fixing a bug because my login was not working properly. I had to
  make the page refresh once the user signed in, in order for the state(token)
  to be updated and redirect the page to the private routes. It took me a while
  to solve this issue but once I got it I went on creating the forms that are
  needed in the private components (add pet , edit pet, and addoption request).
  In order to make browsing by location possible, I included location
  (coordinates) information in the pet forms and accrodingly updated my backend.
  Fixing the bug took me longer than I thought it would and collectively I
  worked for six hours to accomplish the tasks mentioned above.

### Thursday :

- I worked on populating the incomming get requests in the templates. I started
  working on displaying pet information on breeder account. In addtion, I wrote
  functionality to upload photo both on the forntend and backend. In doing so, I
  learned from some documentations and blog on the web, how to apply Multer to
  recieve uploaded files save them in common folder in the backend. Also, I
  learned how to use FormData API to upload file in the frontend. I work for
  about 8 hours to accomplish this tasks.

### Friday :

- I finally implemented the upload functionalty which took me a lot of time,
  trying to fix bugs. But it was worth it, because I learned how to do it. Then,
  I continued on writing codes to display adoption requests made on the breeders
  account. Next, I looked for documentation/youtube to learn how to paginate
  incomming requests to apply them in the project. In total, I worked for about
  8 hours.

### Saturday :

- My plan on this day was to complete the rest of the requirements for this
  project which were implementing pagination, geospecial query, sorting by
  location and date, plus marking the pets that were adopted. Setting up the
  pagination functionality on the forntend and backend was fairly challenging
  and took me some time to get it to work. I used pagination-control angular
  component to render paginated data and make request accordingly. On the
  backend, I implemented skip and limit methods in the queries to send response
  selected items per page. I worked for about 8 hours to complete these tasks.
