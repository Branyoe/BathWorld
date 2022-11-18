import { List } from "@mui/material";
import Comment from "./Comment";
import ReviewsError from '../../../assets/ReviewsError.svg';
import ErrorComponent from "../../Home/components/ErrorComponent";

export const Comments = ({ data }) => {

  const isCommentsEmpty = () => {
    if (!data.length) return (
      <ErrorComponent
        imgSize={180}
        source={ReviewsError}
        msg="Aún no hay reseñas"
      />
    );
    return (
      <List sx={{ width: '100%', p: 0, m: 0, overflow: "scroll", maxWidth: 360, bgcolor: 'background.paper' }}>
        {data?.map(comment => (
          <Comment key={comment.id} data={comment} />
        ))}
      </List>
    );
  }

  return isCommentsEmpty();
}