import { hot } from 'react-hot-loader/root'
import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { Container, Label, Input, Button } from 'reactstrap'

const App = () => {
  const [url, setUrl] = useState('')
  const [shortLinks, setShortLinks] = useState([])
  const [detailLink, setDetailLink] = useState(null)
  const [accessEvents, setAccessEvents] = useState(null)

  const createLink = useCallback(async () => {
    const { data } = await axios.post('/short_link', { long_url: url })
    setShortLinks([...shortLinks, data])
  }, [shortLinks, url])

  const getAccessEvents = useCallback(async (shortLink) => {
    setDetailLink(shortLink)
    const { data } = await axios.get(`${shortLink.short_url}+`)
    setAccessEvents(data)
  }, [])

  return (
    <Container>
      <Label>Link Name</Label>
      <Input value={url} onChange={e => setUrl(e.target.value)} />
      <Button onClick={createLink}>Create Link</Button>
      { detailLink ? (
        <div>
          <Button onClick={() => setDetailLink(null)} color="warning">Back</Button>
          <div>Access Links:</div>
          <div>{JSON.stringify(accessEvents)}</div>
        </div>
      ) : (
        <>
          <div>Recent Links:</div>
          <ul>
            {shortLinks.map(l => (
              <li>
                {`${l.long_url} - `}
                <a href={l.short_url} target="_blank" rel="noopener noreferrer">{l.short_url}</a>
                {' - '}
                <Button onClick={() => getAccessEvents(l)} size="sm" outline>Show Log</Button>
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  )
}

export default hot(App)
