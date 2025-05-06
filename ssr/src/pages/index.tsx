import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type Post = {
  id: number;
  title: string;
  body: string;
};

export const getServerSideProps = (async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: Post[] = await res.json();

  return {
    props: {
      posts: data,
    },
  };
}) satisfies GetServerSideProps<{ posts: Post[] }>;

export default function Home({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
