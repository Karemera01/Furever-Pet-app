# Backend

- I created two schemas,petSchema and userShchema, using mongoose. The petSchema
  contains the details of pet information and adoption requests made by users
  for a specfic pet. Whereas the userSchema holds some user details plus the
  role of the user for the created account.

* Pet Schema

```JavaScript
petName: "",
  birthDate: "",
  breed: "",
  expectedSize: "",
  price: "",
  weight: "",
  parentBreed: { mom: "", dad: "" },
  img: "",
  adoptionRequests: [
        {
          name: "",
          email: "",
          comment: "",
          date:""
        }
  ],

```

- User Schema

```JavaScript
 name: "",
  birthDate: "",
  phone: "",
  email: "",
  password: "",
  role:  ["breeder", "buyer"]

```

# Frontend

- frontend structure

```
AppModule
   ---AppComponent
   ---HomeComponent
   ---SignInComponent
   ---SignUpComponent



PeModule [Breeder] [Buyer]
  ---AddComponent [Buyer]
  ---EditComponent [Buyer]
  ---PetListComponent [Buyer] [Buyer]
     ---Browse by location [Buyer]
  ---RequestListComponent [Breeder]
  ---SendRequescomponent [Buyer]
```
