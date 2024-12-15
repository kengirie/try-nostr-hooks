import { useEffect } from 'react';
import { useSubscription } from 'nostr-hooks';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const NumberOfReactions = () => {
  const { id } = useParams<{ id: string }>();
  const subIdLikes = `${id}-likes`;

  const { events: reacts, isLoading: isReactLoading, createSubscription: createReactSubscription, removeSubscription: removeReactSubscription } = useSubscription(subIdLikes);



  useEffect(() => {
    if (!id) return;
    const filters = [{ kinds: [7], '#e':[id] }];
    createReactSubscription(filters);
    return () => {
      removeReactSubscription();
    };

  }, [id, createReactSubscription, removeReactSubscription]);



  if (isReactLoading) return <p>Loading...</p>;

  if (!reacts) return <p>No events found</p>;

  const uniquePubkeys = new Set(reacts.map((react) => react.pubkey));
  const uniquePubkeyCount = uniquePubkeys.size;

  return (
    <Box>
        <Typography variant="h6" component="div" gutterBottom>
       Number of  Reactioners ({uniquePubkeyCount})
      </Typography>
    </Box>


  );
};

export default NumberOfReactions;
