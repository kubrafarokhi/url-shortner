import { hot } from 'react-hot-loader/root'
import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { Container, Label, Input, Button } from 'reactstrap'

const App = () => {
  const [url, setUrl] = useState('')
  const [shortLinks, setShortLinks] = useState([])

  const createLink = useCallback(async () => {
    const { data } = await axios.post('/short_link', { long_url: url })
    setShortLinks([...shortLinks, data])
  }, [shortLinks, url])

  return (
    <Container>
      <Label>Link Name</Label>
      <Input value={url} onChange={e => setUrl(e.target.value)} />
      <Button onClick={createLink}>Create Link</Button>
      <div>Recent Links:</div>
      <ul>
        {shortLinks.map(l => <li>{`${l.long_url} - ${l.short_url}`}</li>)}
      </ul>
    </Container>
  )
}

export default hot(App)
