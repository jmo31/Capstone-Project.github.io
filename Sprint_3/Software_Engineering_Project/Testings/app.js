import express from 'express'

const app = express()

app.use(express.json())
app.post('/users', async (req, res) => {
  const { password, email } = req.body
  if (!password || !email) {
    res.sendStatus(400)
    return
  }

  res.send({ userId: 0 })
})

app.post('/events', async (req, res) => {
  const { events, user } = req.body
  if (!events || !user) {
    res.sendStatus(400)
    return
  }

  res.send({ userId: 0 })
})



app.put('/:id', async (req, res) => {
  const { events, user } = req.body
  if (!events || !user) {
    res.sendStatus(400)
    return
  }

  res.send({ userId: 0 })
})

app.get('/:id', async (req, res) => {
  const { events, user } = req.body
  if (!events || !user) {
    res.sendStatus(400)
    return
  }

  res.send({ userId: 0 })
})
export default app