const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
	channel: {
		type: String
	},
	user: {
		type: String
	},
	message: {
		type: String
	}
})

const ChatModel = mongoose.model('ninja', chatSchema);

module.exports = ChatModel;