"use strict";
require('dotenv').config();

// Development specific configuration
// ==================================
module.exports = {
	mongo: {
		uri: process.env.MONGODB_URI
	}
};
