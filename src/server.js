import app from '.'
import config from './config'

app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`)
})
