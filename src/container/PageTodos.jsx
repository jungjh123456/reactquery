import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { fetchPageRepositories } from "../lib/api/todos";

const PageTodos = () => {
  const [page, setPage] = React.useState(1);

  //   const fetchProjects = (page = 0) => axios.get(`http://localhost:4000/posts?_page=${page}`).then((res) => res.json());

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(["posts", page], () => fetchPageRepositories(page), { keepPreviousData: true });
  console.log(data, isPreviousData);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data?.map((project) => (
            <p key={project.id}>{project.id}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={page === 1}>
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          //   if (!isPreviousData && data.hasMore) {
          setPage((old) => old + 1);
          //   }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={page === 2 ? true : false}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{" "}
    </div>
  );
};

export default PageTodos;
