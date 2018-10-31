const axios = require('axios');
const opn = require('opn')
//config file
const { GITAPIKEY } = require('./config');
let  data = '';



function withPipe(data) {
  let pullReqUrl = data.trim()

  // if(pullReqUrl === "master"){
  //   console.log("There are no pull request on master")
  //   return
  // }

  // let url = `https://api.github.com/repos/jeffreyyourman/TournamentOrganizer/pulls?head=jeffreyyourman:${pullReqUrl}`
  let url = `https://api.github.com/repos/jeffreyyourman/TournamentOrganizer/pulls?head=jeffreyyourman:onemore`

	axios
		.get(url, {
      access_token: GITAPIKEY,
    })
		.then(res => {
      opn(res.data[0].html_url, {app: ['google chrome']});
      console.log("Link has been copied to clipboard",res.data[0].html_url)
      console.log("current State of PR:", res.data[0].state)
      pbcopy(res.data[0].html_url)
      process.exit()
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
