// api/camera-proxy.js
const http = require('http');

export default function handler(req, res) {
  const { ip, type = 'snapshot' } = req.query;
  const user = process.env.CAMERA_USER;
  const pass = process.env.CAMERA_PASS;

  const url = `http://${user}:${pass}@${ip}/${type === 'video' ? 'video' : 'snapshot.jpg'}`;
  http.get(url, (stream) => {
    res.setHeader('Content-Type', type === 'video' ? 'text/html' : 'image/jpeg');
    stream.pipe(res);
  }).on('error', () => {
    res.statusCode = 500;
    res.end('Camera feed error.');
  });
}
