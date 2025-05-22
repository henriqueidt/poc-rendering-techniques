"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  description: string;
};

function CSR() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("https://dummyjson.com/products?delay=1000");
      const data = await response.json();
      console.log(data);
      setPosts(data.products);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <Image
        src="https://placehold.co/600x400"
        alt=""
        width={600}
        height={400}
      />
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CSR;
