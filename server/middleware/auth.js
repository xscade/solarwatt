// Authentication middleware
export function requireAuth(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  
  res.status(401).json({
    success: false,
    message: 'Authentication required'
  });
}

