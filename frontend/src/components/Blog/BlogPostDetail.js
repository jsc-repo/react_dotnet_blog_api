import { Container, Button, Stack, Box, CircularProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import Notification from "../Notification/notification";
import { useSelector } from "react-redux";

const BlogPostDetail = ({
  setBlogPosts,
  blogPosts,
  notification,
  setNotification,
}) => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);

  const postDetail = blogPosts.find((p) => p.id.toString() === id);

  // console.log("postDetail:", postDetail);

  //CheckAuth();
  //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //console.log("POST DETAIL", postDetail);
  //console.log("isAuthenticated", isAuthenticated);

  const handleDeletePostById = async (id) => {
    if (token) {
      try {
        let res = await fetch(`https://localhost:5001/api/blog/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer {token}` },
          credentials: "include",
        });

        if (res.ok) {
          setBlogPosts(blogPosts.filter((b) => b.id.toString() !== id));
          setNotification({
            isOpen: true,
            severity: "success",
            message: "Post Deleted!",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      let tokenResponse = await fetch("https://localhost:5001/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      let tokenResult = await tokenResponse.json();
      console.log(tokenResult);
    }
  };

  return (
    <Container>
      {postDetail && (
        <>
          <h1>{postDetail.title}</h1>
          <p>{postDetail.content}</p>
          <p>Author: {postDetail.username}</p>
          {token.accessToken && (
            <Stack spacing={2} direction="row">
              <Button component={Link} to={`/blog/update/${id}`}>
                Edit
              </Button>
              <Button color="error" onClick={() => handleDeletePostById(id)}>
                Delete
              </Button>
            </Stack>
          )}
        </>
      )}
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
    </Container>
  );
};

export default BlogPostDetail;
