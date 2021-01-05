// library imports
import {createServer} from 'http';

// my imports

import {
    homePage,
    favIcon,
    indexJs,
	readFileFromServer,
	writeFileToServer,
} from './handler.mjs';

// constants
const myPort = 4711

// dispatcher, mapping http VERB and /path to name of function
// (defined in handler.mjs) which returns a file

const dispatch = {
    'GET /': homePage,
    'GET /favicon.ico': favIcon,
    'GET /client/index.js': indexJs,
	'GET /readFile' : readFileFromServer,
	'POST /writeFile' : writeFileToServer,
}

const myServer = createServer((req, res) => {
    const reqURL = new URL('http://' + req.headers.host + req.url);
    const rq = req.method + ' ' + reqURL.pathname;
    console.log('');
    
    if (rq in dispatch) {
        dispatch[rq](req, res, reqURL.searchParams);
		console.log('dispatch: ', rq );
    } else {
        console.log('no handler for', rq);
    }
});

myServer.listen(myPort);