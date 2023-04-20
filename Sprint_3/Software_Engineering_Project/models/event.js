
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    
    category: {type: String, required: [true, 'category is required'], enum : [ "ACTION GAMES", "ADVENTURE GAMES", "ANIMAL GAMES","SPORTS GAMES", "SIMULATION GAMES", "PUZZLE GAMES", "MULTIPLAYER GAMES", "ART & CREATIVITY GAMES" ]},
    title: {type: String, required: [true, 'title is required']},
    hostName: {type: Schema.Types.ObjectId, ref: 'User'},
    startDateTime: {type: String, required: [true, 'startDateTime is required']},
    endDateTime: {type: String, required: [true, 'endDateTime is required']},
    location: {type: String, required: [true, 'location is required']},
    details: {type: String, required: [true, 'details is required']},
    image: {type: String, required: [true, 'image is required']}



}

);



// collection name is events in the database
module.exports = mongoose.model('Event', storySchema );



   

