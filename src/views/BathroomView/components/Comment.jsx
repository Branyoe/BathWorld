import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import { useContext } from "react";
import { authContext } from "../../../context/authContext";
import { MyRating } from "./MyRating";

export default function Comment({ data }) {
  const {user} = useContext(authContext);
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={data.userName} />
        </ListItemAvatar>
        <ListItemText
          style={{ wordWrap: "break-word" }}
          primary={data.userEmail === user.email ? "Tu" : data.userEmail}
          secondary={
            <Stack sx={{
              display: "flex",
              mt: 1,
              gap: 1
            }}>
              < MyRating size="small" disable ratingValue={data.ratingValue ? data.ratingValue : 0} />
              {data.comment}
            </Stack>
          }
        />
      </ListItem>
      
      <Divider variant="inset" component="li" />
    </>
  );
}