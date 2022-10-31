import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const BlogPost = ({ title, content, id }) => {
  let contentSlice = content.slice(0, 10);
  return (
    <div>
      <h1>{title}</h1>
      <p>
        {contentSlice}. . .{" "}
        <Link component={RouterLink} to={`/api/blog/${id}`}>
          Read more here
        </Link>
      </p>
    </div>
  );
};

export default BlogPost;
