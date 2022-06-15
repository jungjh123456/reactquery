import axios from "axios";
import client from "./client";

export const getTodos = async () => {
  const res = await fetch("http://localhost:4000/posts");

  return res.json();
};
export const postTodos = async (data) => {
  console.log(data);
  const res = await fetch("http://localhost:4000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });
  console.log(res);
  return res.json();
};

export async function getStaticProps() {
  const posts = await getTodos();
  return { props: { posts } };
}

export const fetchRepositories = async (page) => {
  console.log(page);
  const res = await client.get(`http://localhost:4000/posts?_page=${page}&_limit=5`);
  return res;
};
