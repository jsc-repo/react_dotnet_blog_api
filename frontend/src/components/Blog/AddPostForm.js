import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField, Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/authSlice";

import Notification from "../Notification/notification";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
  },
});

const AddPostForm = ({
  blogPosts,
  setBlogPosts,
  notification,
  setNotification,
  navigate,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const classes = useStyles();
  const { handleSubmit, reset, control } = useForm();

  const onSubmit = async (e) => {
    if (token) {
      try {
        let res = await fetch("https://localhost:5001/api/blog", {
          method: "POST",
          body: JSON.stringify({
            title: e.title,
            content: e.content,
          }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          console.log("POST CREATED");
          let result = await res.json();
          setBlogPosts([...blogPosts, result]);
          setNotification({
            isOpen: true,
            severity: "success",
            message: "Post Created!",
          });
        } else {
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (!token) {
      try {
        let res = await fetch("https://localhost:5001/auth/refresh", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          credentials: "include",
        });

        if (res.ok) {
          let result = await res.json();
          console.log("RESULT", result);
          let newToken = result.accessToken;
          dispatch(setToken(newToken));

          let postResponse = await fetch("https://localhost:5001/api/blog", {
            method: "POST",
            body: JSON.stringify({
              title: e.title,
              content: e.content,
            }),
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          });

          if (postResponse.ok) {
            console.log("POST CREATED");
            let result = await postResponse.json();
            setBlogPosts([...blogPosts, result]);
            setNotification({
              isOpen: true,
              severity: "success",
              message: "Post Created!",
            });
          } else {
            console.log(res);
          }
        } else {
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setNotification({
        isOpen: true,
        severity: "warning",
        message: "Unauthorized",
      });
      navigate("/login");
    }
  };
  return (
    <Container sx={{ width: "85%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          defaultValue={""}
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

export default AddPostForm;
