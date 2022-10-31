import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import RegisterUser from "./components/UserForms/RegisterUser";
import SignInForm from "./components/UserForms/SignInForm";
import AppBar from "./components/AppBar/AppBar";
import HomePage from "./components/pages/index";
import UserProfile from "./components/pages/userProfile";
import DashboardPage from "./components/pages/dashboard";
import BlogPostDetail from "./components/Blog/BlogPostDetail";
import AddPostForm from "./components/Blog/AddPostForm";
import UpdatePostForm from "./components/Blog/UpdatePostForm";
import UserPosts from "./components/Blog/UserPosts";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./redux/slices/authSlice";

function App() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState({
    isOpen: false,
    severity: null,
    message: null,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetch("https://localhost:5001/api/blog/")
      .then((res) => res.json())
      .then(
        (result) => setBlogPosts(result.data),
        (err) => console.log(err)
      );
  }, []);

  // useEffect(() => {
  //   const getUserPosts = async () => {
  //     let res = await fetch("https://localhost:5001/api/blog/userblog", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     let result = await res.json();

  //     setUserPosts(result.data);
  //     console.log("USER POSTS", result.data);
  //   };

  //   getUserPosts().catch((err) => console.log(err));
  // }, []);

  //console.log(blogPosts);
  // console.log("USER POSTS", userPosts);

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegsiterSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("https://localhost:5001/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (res.ok) {
        let result = await res.json();
        console.log("user registered success", result);
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      } else {
        // setMessage("Register Unsuccessful");
        // setTimeout(() => setMessage(""), 5000);
      }
    } catch (e) {
      console.log("error:", e);
    }
  };

  const handleLogout = async () => {
    try {
      if (token) {
        let res = await fetch("https://localhost:5001/auth/logout", {
          method: "DELETE",
          headers: {
            // "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          localStorage.removeItem("userObj");
          navigate("/login");
        }
      } else if (!token) {
        let res = await fetch("https://localhost:5001/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (res.ok) {
          let result = await res.json();
          let newToken = result.accessToken;
          dispatch(setToken(newToken));

          let logoutResponse = await fetch(
            "https://localhost:5001/auth/logout",
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );

          if (logoutResponse.ok) {
            localStorage.removeItem("userObj");
            navigate("/");
          }
          navigate("/login");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <AppBar handleLogout={handleLogout} token={token} />

      <Routes>
        <Route
          index
          element={<HomePage title={"Home"} blogPosts={blogPosts} />}
        />

        <Route
          path="/api/blog/:id"
          element={
            <BlogPostDetail
              navigate={navigate}
              setBlogPosts={setBlogPosts}
              blogPosts={blogPosts}
              notification={notification}
              setNotification={setNotification}
            />
          }
        />
        <Route
          path="/blog/create"
          element={
            <AddPostForm
              blogPosts={blogPosts}
              setBlogPosts={setBlogPosts}
              notification={notification}
              setNotification={setNotification}
              navigate={navigate}
            />
          }
        />

        <Route
          path="/blog/update/:id"
          element={
            <UpdatePostForm
              blogPosts={blogPosts}
              setBlogPosts={setBlogPosts}
              notification={notification}
              setNotification={setNotification}
            />
          }
        />

        <Route path="/blog/userblog" element={<UserPosts />} />

        <Route
          path="/dashboard"
          element={
            <DashboardPage blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
          }
        />

        <Route path="/profile" element={<UserProfile />} />

        <Route
          path="/register"
          element={
            <RegisterUser
              handleRegsiterSubmit={handleRegsiterSubmit}
              onChangeEmail={onChangeEmail}
              onChangeUsername={onChangeUsername}
              onChangePassword={onChangePassword}
              onChangeConfirmPassword={onChangeConfirmPassword}
              email={email}
              username={username}
              password={password}
              confirmPassword={confirmPassword}
            />
          }
        />
        <Route
          path="/login"
          element={
            <SignInForm
              username={username}
              password={password}
              onChangeUsername={onChangeUsername}
              onChangePassword={onChangePassword}
              navigate={navigate}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
