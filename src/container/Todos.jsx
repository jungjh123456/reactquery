import React, { Suspense, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import Header from "../components/Header";
import RecipeReviewCard from "../components/RecipeReviewCard";
import { fetchRepositories, getTodos, postTodos } from "../lib/api/todos";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "styled-components";
import QuiltedImageList from "../components/QuiltedImageList";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useInView } from "react-intersection-observer";
const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // boxShadow: "2px 2px 15px rgba(0,0,0,0.4)",
  border: "0px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};
const DivGrid = styled.div`
  /* display: grid; */
  & > .container {
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    gap: 16px;
    max-width: 1800px;
    margin: 0 auto;
  }

  @media screen and (min-width: 600px) and (max-width: 1200px) {
    & > .container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    /* flex-wrap: wrap; */
    /* width: 100%; */
    /* max-width: 345px; */
  }
  @media screen and (min-width: 1200px) {
    /* display: grid; */
    /* grid-template-columns: repeat(5, 1fr); */
    /* border: 1px solid red; */
    /* flex-wrap: wrap; */
    /* width: 100%; */
    /* max-width: 345px; */
  }
`;
const Todos = (props) => {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading, isSuccess, error } = useQuery("posts", getTodos, { initialData: props.posts, refetchInterval: 100000 });
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Mutations
  const mutation = useMutation(postTodos, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("todos");
    },
  });
  const clickIcon = (e) => {
    setOpen(true);
  };
  const {
    status,
    data: infinitData,
    error: infinitError,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    "projects",
    async ({ pageParam = 0 }) => {
      return await fetchRepositories(pageParam);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        // lastPage에는 fetch callback의 리턴값이 전달됨
        // allPage에는 배열안에 지금까지 불러온 데이터를 계속 축적하는 형태 [[data], [data1], .......]
        const maxPage = 14; // 한번에 30개씩 보여주기
        const nextPage = allPages.length + 1; //
        return nextPage <= maxPage ? nextPage : undefined; // 다음 데이터가 있는지 없는지 판단
      },
    }
  );
  console.log(infinitData);
  const { ref, inView } = useInView({ threshold: 0.3 });
  useEffect(() => {
    // hasNextPage 다음 페이지가 있는지 여부, Boolean (getNextPageParam 리턴값에 의해서)
    if (inView && hasNextPage) {
      // fetchNextPage fetch callback 함수를 실행
      fetchNextPage();
    }
  }, [inView]);
  const filter = infinitData?.pages?.map((item) => item.data);

  return (
    <>
      <Header />
      {/* <QuiltedImageList /> */}
      <Suspense fallback={() => <div>로딩중..</div>}>
        <DivGrid>
          <div className="container">
            {data?.length ? (
              <>
                {data.map((item) => {
                  return <RecipeReviewCard loading={!isSuccess} />;
                })}
              </>
            ) : (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 7, 8, 7, 8, 7, 8].map((item) => {
                  return <RecipeReviewCard loading={!isSuccess} />;
                })}
              </>
            )}
            {filter?.flat()?.length ? (
              <>
                {filter?.flat().map((item) => {
                  return <RecipeReviewCard loading={!isSuccess} />;
                })}
              </>
            ) : (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 7, 8, 7, 8, 7, 8].map((item) => {
                  return <RecipeReviewCard loading={!isSuccess} />;
                })}
              </>
            )}
          </div>
        </DivGrid>
      </Suspense>
      <button onClick={() => fetchNextPage()} ref={ref} style={{ height: "30px" }} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load Newer" : "Nothing more to load"}
      </button>
      {/* <button
        onClick={() => {
          mutation.mutate({
            id: Math.max(...data.map((item) => item.id)) + 1,
            title: "redux-saga도 사용해봅시다",
            body: "나중엔 redux-saga를 사용해서 비동기 작업을 처리하는 방법도 배워볼 거예요.",
          });
        }}
      >
        Add Todo
      </button> */}
      <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: "fixed", bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
        {actions.map((action) => (
          <SpeedDialAction onClick={(e) => clickIcon(action.name)} key={action.name} icon={action.icon} tooltipTitle={action.name} />
        ))}
      </SpeedDial>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" style={{ fontSize: "24px" }} variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="tilte_name-wrap">
                <span>제목</span>
                <input type="text" />
              </div>
              <div className="tilte_name-wrap">
                <span>내용</span>
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Todos;
