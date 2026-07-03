import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_codejourney_key_1298471');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token verification failed. Access denied.' });
  }
}
