const errCatcherArticle = (errMsg) => {
  let msg = ''

  if (errMsg.indexOf('maximum allowed length (35)') !== -1) {
    msg = 'Title length must be less than 35 char'
  } else {
    msg = errMsg.split(':')[2].slice(1)
  }

  return msg

}

module.exports = errCatcherArticle
