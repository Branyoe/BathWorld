import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function Comment({data}){
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={data.userEmail} />
        </ListItemAvatar>
        <ListItemText
          style={{wordWrap: "break-word"}}
          primary={data.userEmail}
          secondary={data.comment}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}