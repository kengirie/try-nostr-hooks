import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { NostrFetcher } from "nostr-fetch";



export const NumberOfReactioners = () => {
      const { id } = useParams<{ id: string }>();
  const fetcher = NostrFetcher.init();
const relayUrls = ["wss://nos.lol"];
const nHoursAgo = (hrs: number): number =>
  Math.floor((Date.now() - hrs * 60 * 60 * 1000) / 1000);
  let uniquePubkeyCount = 0;


// fetches all text events since 24 hr ago in streaming manner
  const fetchEvents = async () => {
    if (!id) return;

  const postIter = fetcher.allEventsIterator(
      relayUrls,
      /* filter (kinds, authors, ids, tags) */
    { kinds: [7], ids:[id]},
      /* time range filter (since, until) */
      { since: nHoursAgo(24) },
      /* fetch options (optional) */
      { skipFilterMatching: true }
  );
  const uniquePubkeys = new Set();
  for await (const ev of postIter) {
    uniquePubkeys.add(ev.pubkey);
    console.log(ev.pubkey);
  }
    uniquePubkeyCount = uniquePubkeys.size;
};

useEffect(() => {
  fetchEvents();
}, []);


  return (
    <Box>
        <Typography variant="h6" component="div" gutterBottom>
       Number of  Reactioners ({uniquePubkeyCount})
      </Typography>
    </Box>


  );
};

