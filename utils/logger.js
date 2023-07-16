const info = (...params) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV === 'test') return
  console.log(...params)
}

const error = (...params) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV === 'test') return
  console.error(...params)
}

module.exports = { info, error }
