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
