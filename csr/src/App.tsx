import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState<
    { id: number; title: string; body: string }[]
  >([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
