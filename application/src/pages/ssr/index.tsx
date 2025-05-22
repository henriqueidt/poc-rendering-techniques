import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";

type Post = {
  id: number;
  title: string;
  description: string;
};

export const getServerSideProps = (async () => {
  const res = await fetch("https://dummyjson.com/products?delay=1000");
  const data = await res.json();

  return {
    props: {
      posts: data.products,
    },
  };
}) satisfies GetServerSideProps<{ posts: Post[] }>;

export default function SSRPage({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h1>Posts</h1>
      <Image
        src="https://placehold.co/600x400"
        alt=""
        width={600}
        height={400}
      />
      {/* <img alt="" /> */}
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
