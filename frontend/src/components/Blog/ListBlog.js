import BlogPost from "./BlogPost";

const ListBlog = ({ blogPosts }) => {
  return (
    <div>
      {blogPosts.map((p) => (
        <BlogPost key={p.id} title={p.title} content={p.content} id={p.id} />
      ))}
    </div>
  );
};

export default ListBlog;
