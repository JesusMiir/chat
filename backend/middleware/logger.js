export default function logger(req, res, next) {
  console.log(`NEW REQUEST: ${req.method} ${req.url}`);
  next();
}
