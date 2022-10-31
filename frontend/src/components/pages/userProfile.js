import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = () => {
  //const user = useSelector((state) => state.user);
  const userObj = JSON.parse(localStorage.getItem("userObj"));
  return (
    <Container>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={"https://picsum.photos/200"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userObj.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userObj.email}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
