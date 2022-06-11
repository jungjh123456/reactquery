# react query 사용기

redux와 redux-saga만을 이용하여 프로젝트를 진행하였다.
하지만 refresh로 다시 api호출하는 것이 유저 측면에서도 안좋다고 생각을 해서 찾아보니 react query라는 라이브러리가 있었다.

설치 방법은 간단하였다.

```
npm i react-query
```

문서에 가면 이렇게 설치를 진행하고 quick start에

```js
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import { getTodos, postTodo } from "../my-api";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery("todos", getTodos);

  // Mutations
  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <div>
      <ul>
        {query.data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "Do Laundry",
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

render(<App />, document.getElementById("root"));
```

이런식으로 하면 된다고 한다.

하지만 연습을 하는거라 마땅한 api가 없어서 JSON server를 사용해서 연습해 보려 한다.

일단 json-server를 설치 해 보자

전역에 data.json을 만들어주고

```
{
 "posts": [
   {
     "id": 1,
     "title": "react query",
     "body": "react query 만들어보면 이해하기 쉽죠."
   },
   {
     "id": 2,
     "title": "react query를 사용해봅시다",
     "body": "react query를 사용해서 비동기 작업을 처리해봅시다!"
   },
   {
     "id": 3,
     "title": "react query도 사용해봅시다",
     "body": "나중엔 react query를 사용해서 여러 옵션을 주자."
   }
 ]
}


```

이렇게 만들어 주고 global로 json-server를 설치하자.

```
npm install -g json-server
```

그 후 json-server를 열어주면

```
json-server ./data.json --port 4000
```

가짜 서버는 완료 되었다.

일단 get을 하기 위해 lib > api > todos.js

폴더를 만들고 그 안에다가

```js
export const getTodos = async () => {
  const res = await fetch("http://localhost:4000/posts");

  return res.json();
};
```

이런식으로 export 해주고 Toidos.jsx 폴더를 만들거나 app.js에서 테스트 해보자.

```js
const { data, isLoading, isSuccess, error } = useQuery("todos", getTodos);

console.log(data);
```

이런식으로 만들어주면 get을 잘 해온다. 첫번째 콜백으로 고유키를 넣어준다. 연결된 비동기 데이터 소스 단위로 작동되는데 쿼리는 서버에서 데이터를 가져오기 위해 모든 Promise기반 메서드에 대해 사용이 가능하다.

이 밖에도 isLoading, isError, status도 활용 할 수 있다.

post를 하기 위해서 react query는 useMutaion후크를 내보낸다.

한번 사용해보자

todos.js폴더에

```js
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
```

이런 식으로 만들어 준다. (오랜만에 axios대시 fetch를 사용해서 headers를 꼭 넣어주는걸 까먹...)

그 후

```js
const mutation = useMutation(postTodos, {
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries("todos");
  },
});
```

Todos.jsx에 이런식으로 지정해주고 button을 만든 후

```html
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
```

이렇게 onClick을 수행하면 잘 작동 된다.

## 리엑트 쿼리

react query는 React에서 서버 상태를 가져오고 캐싱하고 동기화하고 업데이트 하는 작업을 쉽게 만든다.

직접 사용해보니 사용자가 페이지에 대기 상태에서 다시 마우스를 내 사이트에 클릭 할때마다 호출이 되거나 5분마다 오래된 캐시면 다시 호출 하는 것이 정말 편했다.

redux saga를 사용할 때는 refresh말고 setInterval을 사용하여 5분마다 호출을 하였는데 react query를 사용해서 더 나은 사이트를 만들 수 있을 꺼 같다.
