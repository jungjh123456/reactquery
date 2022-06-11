import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodos, postTodos } from "../lib/api/todos";

const Todos = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading, isSuccess, error } = useQuery("todos", getTodos);
  console.log(data, isSuccess);
  // Mutations
  const mutation = useMutation(postTodos, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <div>
      {isSuccess && (
        <>
          {data.map((item) => {
            return (
              <div>
                <span>{item.title}</span>
              </div>
            );
          })}
        </>
      )}

      <button
        onClick={() => {
          mutation.mutate({
            id: Math.max(...data.map((item) => item.id)) + 1,
            title: "redux-saga도 사용해봅시다",
            body: "나중엔 redux-saga를 사용해서 비동기 작업을 처리하는 방법도 배워볼 거예요.",
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default Todos;
