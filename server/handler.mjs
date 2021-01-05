// library imports
import {readFileSync} from 'fs';
import {writeFileSync} from 'fs';

// serve file with given mime type
const serveFile = (filePath, mimeType) => {
    return ((req, res) => {
        res.setHeader('Content-Type', mimeType);
        res.writeHead(200);
        res.end(readFileSync(filePath));
    });
}

const homePage = serveFile('./public/index.html', 'text/html');
const favIcon = serveFile('./public/favicon.ico', 'image/ico');
const indexJs = serveFile('./client/index.js', 'text/javascript');
const readFileFromServer = serveFile('./server/Drei_Zeilen.txt', 'text/plain')

export {homePage, favIcon, indexJs, readFileFromServer };

// read Textfile
// same as in 'serveFile' but stand alone
export function readFileFromServer_extra(req, res) {	
	res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200);
    res.end(readFileSync('server/Drei_Zeilen.txt'));
	}
	

//write Textfile
// see: https://nodejs.dev/learn/get-http-request-body-data-using-nodejs
export function writeFileToServer(req, res) {
	let data = '';
	req.on('data', chunk => {
		data += chunk;
	})
	req.on('end', () => {
		res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);
        res.end(writeFileSync('server/Drei_Zeilen.txt', data));
	  })
	}


