import { Container, Box } from "@mui/material";
import AddPostForm from "../Blog/AddPostForm";
import { BasicCard } from "../Forms/index";
import { Link } from "react-router-dom";

const DashboardPage = ({ token, blogPosts, setBlogPosts }) => {
  return (
    <Container maxWidth="lg">
      <h1>Dashboard</h1>
      <Box display="flex" justifyContent="space-around">
        <BasicCard text={"Create Post"} component={Link} to="/blog/create" />
        <BasicCard text={"Profile"} component={Link} to="/profile" />
        <BasicCard
          text={"My Blog Posts"}
          component={Link}
          to="/blog/userblog"
        />
      </Box>
    </Container>
  );
};

export default DashboardPage;
