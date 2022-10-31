import Container from "@mui/material/Container";
import ListBlog from "../Blog/ListBlog";

const Homepage = ({ title, blogPosts }) => {
  console.log("posts from homepage: ", blogPosts);
  return (
    <Container maxWidth="lg">
      <h1>{title}</h1>
      <ListBlog blogPosts={blogPosts} />
    </Container>
  );
};

export default Homepage;
