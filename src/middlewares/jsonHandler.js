export async function jsonHandler(req, res) {
    const buffers = [];
    // Collect the data chunks
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    // Parse the collected data as JSON
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (error) {
        req.body = null;
    }
    // Set the response header to indicate JSON 
    res.setHeader('Content-Type', 'application/json');
}