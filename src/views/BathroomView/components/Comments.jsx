import { List } from "@mui/material";
import Comment from "./Comment";

export default function Comments({ data }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {data.map(comment => (
        <Comment key={comment.id} data={comment} />
      ))}
    </List>
  );
}