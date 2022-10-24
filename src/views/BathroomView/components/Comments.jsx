import { List } from "@mui/material";
import Comment from "./Comment";

export const Comments = ({ data }) => {
  return (
    <List sx={{ width: '100%', p: 0, m: 0, overflow: "scroll" ,maxWidth: 360, bgcolor: 'background.paper' }}>
      {data.map(comment => (
        <Comment key={comment.id} data={comment} />
      ))}
    </List>
  );
}