const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: {
        // Use Mongoose's ObjectId data type
        // Default value is set to a new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        // 280 character maximum
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        // Date
        // Set default value to the current timestamp
        // Use a getter method to format the timestamp on query
    }
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        // Must be between 1 and 280 characters
    },
    createdAt: {
        // Date
        // Set default value to the current timestamp
        // Use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
    },
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
