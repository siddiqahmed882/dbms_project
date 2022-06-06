const verifyAdmin = (req, res) => {
  const isAdmin = req.userType === 'admin';
  if (!isAdmin) return res.sendStatus(403);
  next();
};

module.exports = verifyAdmin;