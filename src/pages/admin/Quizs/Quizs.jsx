import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllQuizs, deleteQuiz } from "../../../apicalls/quizs";
import "remixicon/fonts/remixicon.css";

function QuizsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quizs, setQuizs] = useState([]);
  const columns = [
    {
      title: "Quiz Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Required Marks",
      dataIndex: "req",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <i
              className="ri-pencil-line cursor-pointer "
              onClick={() => navigate(`/admin/quizs/edit/${record._id}`)}
            ></i>
            <i
              className="ri-delete-bin-line cursor-pointer"
              onClick={() => {
                deleteQuizById(record._id);
              }}
            ></i>
          </div>
        );
      },
    },
  ];
  const getQuizsData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllQuizs();
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        setQuizs(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const deleteQuizById = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteQuiz(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getQuizsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getQuizsData();
  }, []);
  return (
    <>
      <div className="flex justify-between mt-1">
        <PageTitle title="Quizs" />
        <button
          className="primary-outlined-btn flex items-center cursor-pointer"
          onClick={() => navigate("/admin/quizs/add")}
        >
          <i className="ri-add-line"></i>
          Add Quiz
        </button>
      </div>
      <div className="divider mt-1"></div>
      <Table columns={columns} dataSource={quizs} />
    </>
  );
}

export default QuizsPage;
