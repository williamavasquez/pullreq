const githubApi = require('./config'); 

// const axios = require ('axios')




// axios.get( `https://api.github.com/repos/jeffreyyourman/TournamentOrganizer/pulls?access_token=${githubApi}`)
//     .then(res => {
//         console.log(res.data[0].url)
//     })

var data = '';
function withPipe(data) {
    console.log('content was piped');
    console.log(data.trim());
}
function withoutPipe() {
    console.log('no content was piped');
}

var self = process.stdin;

if (process.stdin.isTTY) {
    // handle shell arguments
    var argymen = process.argv
    console.log(argymen)

    self.on('readable', function() {
        var chunk = this.read();
        if (chunk === null) {
            withoutPipe();
        } else {
            data += chunk;
        }
    });

  } else {
    // handle piped content (see Jerome’s answer)
    self.on('end', function() {
        withPipe(data);
    });
}  