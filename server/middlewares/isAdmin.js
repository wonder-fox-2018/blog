const isAdmin = (req, res, next) => {

  if (req.decoded.role === 'admin') {
    next()
  } else {
    res.status(500).json({
      status: 'failed',
      message: "You'r not authorized for do this action"
    })
  }
}

module.exports = isAdmin
