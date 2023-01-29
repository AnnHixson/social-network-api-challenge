# social-network-api-challenge

## Description
This challenge was designed to use our knowledge of the MongoDB/mongoose to build an API for a social network application.

## Installation

1. Open the command line trerminal
2. Install the packages `npm i`
3. Run the program `npm start`

## Usage

To start the program, enter `npm start`. As this program is back-end only, the user will need to use something like Insomnia in order to see the apps functionality.

In Insomnia, the user can see all entries in the "users" and "thoughts" sections by doing a GET request on `localhost:3001/api/users` or `localhost:3001/api/thoughts`.

The user can see a single entry from one of the sections by doing a GET request on the relevant path followed by `/:userId` or `/:thoughtId` where the paramater is replaced by the id of the entry they want to see, e.g. `localhost:3001/api/users/63d403562fad109b956fae0b`. If there is no entry with that id, the user will be notified of that.

The user can add an entry to one of the two sections by doing a POST request on the relevant path (e.g. `localhost:3001/api/users`) with a JSON Body entry.
- For the "users" section, the request body should look like this:
    `{
        "username": "ann",
        "email": "ann@mail.com"
    }`
- For the "thoughts" section, the request body should look like this:
    `{
        "thoughtText": "I was thinking...",
        "username": "Ann",
        "userId": "63d403562fad109b956fae0b"
    }`

The user can update an entry by doing a PUT request on the relevant path with a `/:userId` or `/:thoughtId` where the paramater is replaced by the id of the entry they want to update (e.g. `localhost:3001/api/users/63d403562fad109b956fae0b`). - For the "users" section, the request body should look like this:
    `{
        "username": "ann"
    }`
- For the "thoughts" section, the request body should look like this:
    `{
        "thoughtText": "I was thinking..."
    }`


The user can delete an entry by doing a DELETE request on the relevant path with a `/:userId` or `/:thoughtId` where the paramater is replaced by the id of the entry they want to delete (e.g. `localhost:3001/api/users/63d403562fad109b956fae0b`).

The user can add a friend to a friend list by doing a POST request on `localhost:3001/api/users/:userId/friends/:friendId` where `:userId` is replaced by the id of the user whose friend list is being added to, and `:friendId` is replaced by the id of the user being added to the friend list. The user can delete a friend from a friend list by doing a DELETE request in the same manner.

The user can add a reaction to a thought by doing a POST request on `localhost:3001/api/thoughts/:thoughtId/reactions` where `:thoughtId` is replaced by the id of the thought getting a reaction. The request body should look like this:
    `{
        "reactionBody": "That's a good thought!",
        "username": "bob"
    }`
The user can delete a reaction by doing a DELETE request on `localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId` where `:thoughtId` is replaced by the id of the thought the reaction belongs to, and `:reactionId` is replaced by the id of the reaction to delete.

Here is a video walkthrough of the program: [https://drive.google.com/file/d/1Yv0vkzP5wGSycVwXEyoIdxwrAw3IulX2/view](https://drive.google.com/file/d/1Yv0vkzP5wGSycVwXEyoIdxwrAw3IulX2/view)

## Credits

I followed the examples in the coursework of this class closely

The regex for validating emails (/^\[a-zA-Z0-9.!#\$\%&'\*+/=?^_`\{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/) comes from [https://www.w3resource.com/javascript/form/email-validation.php](https://www.w3resource.com/javascript/form/email-validation.php)

I looked at [https://github.com/Morganbb104/HW_18-NoSQL-Social-Network-API/blob/main/models/Thought.js](https://github.com/Morganbb104/HW_18-NoSQL-Social-Network-API/blob/main/models/Thought.js) for guidance on the date format getter method

## License

None
