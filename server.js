const axios = require('axios');

//config file
const { GITAPIKEY } = require('./config');
let  data = '';



function withPipe(data) {
  let pullReqUrl = data.trim()
  let url = `https://api.github.com/repos/jeffreyyourman/TournamentOrganizer/pulls?access_token=${GITAPIKEY}`

	axios
		.get(url, {
      'base': pullReqUrl
    })
		.then(res => {
			console.log(res.data[0].html_url);
      pbcopy(res.data[0].html_url)
		});
}

function withoutPipe() {
	// console.log('no content was piped');
}

function pbcopy(data) {
  var proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data); proc.stdin.end();
}

var self = process.stdin;

if (process.stdin.isTTY) {
	//add value
  console.log('nothing')
} else {
	self.on('readable', function() {
		var chunk = this.read();
		if (chunk === null) {
			withoutPipe();
		} else {
			data += chunk;
		}
	});

	// handle piped content (see Jerome’s answer)
	self.on('end', function() {
		withPipe(data);
	});
}
