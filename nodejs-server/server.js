const http = require('http');
const fs = require('fs');
const path = require('path');

// Step 13: Middleware to log incoming requests to the console
function logMiddleware(req, res, next) {
    console.log(`[LOG] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
}

// Step 7 & 15: Determine file extension and set content type accordingly
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const types = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    };
    return types[ext] || 'application/octet-stream';
}

// Step 13: Pass request and response objects to handleRequest function
function handleRequest(req, res) {
    logMiddleware(req, res, () => {
        let filePath;

        // Steps 2, 3, 4, 16: Construct file path based on request URL
        if (req.url === '/' || req.url === '/index.html') {
            filePath = path.join(__dirname, 'public', 'index.html');
        } else if (req.url === '/about.html') {
            filePath = path.join(__dirname, 'public', 'about.html');
        } else {
            // Steps 14, 19: Invalid routes will return a 404 status code
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found - Invalid Route');
            return;
        }

        // Step 5: Read file asynchronously
        fs.readFile(filePath, (err, content) => {
            if (err) {
                // Step 6: If file not found (error), return 404 response
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found - File Missing');
                } else {
                    // Step 11: Handle server errors and log error messages
                    console.error(`Server Error: ${err.message}`);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('500 Internal Server Error');
                }
            } else {
                const contentType = getContentType(filePath);
                
                // Step 8: Write 200 OK header with appropriate content type
                res.writeHead(200, { 'Content-Type': contentType });
                
                // Step 9: Send file content as response using binary encoding
                res.end(content, 'binary');
            }
        });
    });
}

// Step 10: Create an HTTP server instance using http.createServer()
const server = http.createServer(handleRequest);

// Step 11: Handle server errors and log error messages
server.on('error', (err) => {
    console.error(`Server failed to start: ${err.message}`);
});

// Step 12: Server listens on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log('==================================================');
    console.log('✅ Server is running successfully!');
    console.log('👉 Step 17: Homepage at http://localhost:3000/');
    console.log('👉 Step 18: About page at http://localhost:3000/about.html');
    console.log('👉 Step 19: Test 404 at http://localhost:3000/invalid-route');
    console.log('==================================================');
});
