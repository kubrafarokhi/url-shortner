import { hot } from 'react-hot-loader/root';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Label, Input, Button } from 'reactstrap';
import ErrorComponent from './components/common/ErrorComponent/ErrorComponent.jsx';
import AccessEvents from './components/AccessEvents/AccessEvents.js';

const App = () => {
  const [url, setUrl] = useState('');
  const [shortLinks, setShortLinks] = useState([]);
  const [hasError, setHasError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detailLink, setDetailLink] = useState(null);
  const [accessEvents, setAccessEvents] = useState(null);

  const createLink = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/short_link', { long_url: url });
      setShortLinks([...shortLinks, data]);
    } catch (e) {
      console.error(e.message);
      //setHasError(e.message)  ideally can set error this way, if the proper error message is set from the api.
      setHasError('Something went wrong, please try again later..');
    } finally {
      setIsLoading(false);
    }
  }, [shortLinks, url]);

  const getAccessEvents = useCallback(async (shortLink) => {
    setDetailLink(shortLink);
    try {
      const { data } = await axios.get(`${shortLink.short_url}+`);
      setAccessEvents(data);
    } catch (e) {
      console.error(e.message);
      setHasError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Container>
      <Label>Link Name</Label>
      <Input value={url} onChange={(e) => setUrl(e.target.value)} />
      {!isLoading && !hasError && (
        <>
          <Button onClick={createLink}>Create Link</Button>
          {detailLink ? (
            <div>
              <Button onClick={() => setDetailLink(null)} color="warning">
                Back
              </Button>
              <div>Access Links:</div>
              <div>{JSON.stringify(accessEvents)}</div>
            </div>
          ) : (
            <AccessEvents shortLinks={shortLinks} getAccessEvents={getAccessEvents}/>
          )}
        </>
      )}
      {!isLoading && hasError && <ErrorComponent errorMsg={hasError} />}
      {isLoading && <div>Loading...</div>}
    </Container>
  );
};

export default hot(App);
