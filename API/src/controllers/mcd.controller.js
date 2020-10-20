const fs = require('fs');

// Get User by Id
exports.getMCD = (req, res) => {
	fs.readFile('./src/models/mcd.json', 'utf8', (err, jsonString) => {
	    if (err) {
	        console.log("File read failed:", err)
	        return
	    }
	    res.send(jsonString);
	})
};
