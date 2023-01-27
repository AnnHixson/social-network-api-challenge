const { User, Thought } = require('../models');

module.exports = {
    // GET to get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // GET to get a single thought by its _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // POST to create a new thought
        // Example
        /* {
            "thoughtText": "I was thinking...",
            "username": "Ann",
            "userId": "63d403562fad109b956fae0b"
        } */
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought created, but no user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // PUT to update a thought by its _id
        // Example
        /* {
            "thoughtText": "I had a thought..."
        } */
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughtText: req.body.thoughtText }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // DELETE to remove a thought by its _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } }
                )
        )
        .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought deleted, but no user found with that ID' })
                    : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // POST to create a reaction stored in a single thought's reactions array field
        // Example
        /* {
            "reactionBody": "That's a good thought!",
            "username": "bob"
        } */
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } }
        )
        .then((thought) =>
            !thought 
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};
