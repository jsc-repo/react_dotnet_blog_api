import { Container, Button, Stack, Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/authSlice";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

// const fetchUserPosts = async (token) => {
//   if (token) {
//     let res = await fetch("https://localhost:5001/api/blog/userblog", {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       // credentials: "include",
//     });

//     let result = await res.json();

//     return result.data;
//   } else {
//     let res = await fetch("https://localhost:5001/auth/refresh", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//       credentials: "include",
//     });

//     let result = await res.json();
//     console.log("result:", result);

//     return result.data;
//   }
// };

const UserPosts = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  // console.log("TOKEN", token);

  const navigate = useNavigate();

  const fetchUserPosts = async (token) => {
    if (token) {
      let res = await fetch("https://localhost:5001/api/blog/userblog", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        let result = await res.json();

        return result.data;
      } else return;
    } else if (!token) {
      let res = await fetch("https://localhost:5001/auth/refresh", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      });

      if (res.ok) {
        let result = await res.json();

        let newToken = result.accessToken;
        dispatch(setToken(newToken));

        let fetchPosts = await fetch(
          "https://localhost:5001/api/blog/userblog",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );

        let posts = await fetchPosts.json();
        return posts.data;
      } else {
        navigate("/login");
      }
    }
  };

  const { data, error, isError, isLoading, isSuccess } = useQuery(
    ["posts", token],
    () => fetchUserPosts(token)
  );

  console.log(data);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="flex-end">
        <CircularProgress color="inherit" size={24} />
      </Box>
    );
  } else if (isSuccess) {
    return (
      <Container>
        <h1>Your Posts</h1>
        {data &&
          data.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <p>Author: {post.username}</p>
            </div>
          ))}
      </Container>
    );
  } else if (isError) {
    navigate("/login");
  }

  return (
    <Container>
      <h1>Your Posts</h1>
    </Container>
  );
};

export default UserPosts;
