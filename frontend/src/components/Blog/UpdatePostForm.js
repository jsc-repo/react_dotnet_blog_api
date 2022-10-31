import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { TextField, Button, Container, Alert, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Notification from "../Notification/notification";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
  },
});

const UpdatePostForm = ({
  token,
  blogPosts,
  setBlogPosts,
  notification,
  setNotification,
}) => {
  const { id } = useParams();

  const post = blogPosts.find((p) => p.id.toString() === id);

  const classes = useStyles();
  const { handleSubmit, reset, control } = useForm();

  const onSubmit = async (e) => {
    try {
      let res = await fetch(`https://localhost:5001/api/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: e.title,
          content: e.content,
        }),
        headers: {
          "Content-type": "application/json",
          //Authorization: `Bearer ${token.accessToken}`,
        },
        credentials: "include",
      });

      if (res.ok) {
        // in order for setState to re-render,
        // you need to create a new object or array first
        // and the map function returns a new array
        const updatedBlogPosts = blogPosts.map((p) => {
          if (p.id.toString() === id) {
            return { ...p, title: e.title, content: e.content };
          }

          return p;
        });

        setBlogPosts(updatedBlogPosts);

        setNotification({
          isOpen: true,
          severity: "success",
          message: "Post Updated!",
        });
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ width: "85%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          defaultValue={post.title}
          name={"title"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              className={classes.field}
              fullWidth
              onChange={onChange}
              value={value}
              label={"Title"}
              required
            />
          )}
        />
        <Controller
          name={"content"}
          defaultValue={post.content}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              required
              className={classes.field}
              fullWidth
              onChange={onChange}
              value={value}
              label={"Content"}
              multiline
              rows={12}
            />
          )}
        />
        <Button type="submit">Submit</Button>
        <Button
          onClick={() => reset({ title: "", content: "" })}
          variant={"outlined"}
        >
          Reset
        </Button>
      </form>
      <Notification
        notification={notification}
        setNotification={setNotification}
        redirectPath={"/"}
      />
    </Container>
  );
};

export default UpdatePostForm;
