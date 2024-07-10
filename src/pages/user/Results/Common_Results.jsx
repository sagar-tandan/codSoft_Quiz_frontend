import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { getAllTryByUser } from "../../../apicalls/results";

function ResultsPage() {
  const [resultsData, setResultsData] = useState([]);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Quiz Name",
      dataIndex: "quizName",
      render: (text, record) => <>{record.quiz.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => <>{record.createdAt}</>,
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (text, record) => <>{record.quiz.total}</>,
    },
    {
      title: "Required Marks",
      dataIndex: "req",
      render: (text, record) => <>{record.exam.req}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "obtainedMarks",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllTryByUser();
      dispatch(HideLoading());
      if (response.success) {
        setResultsData(response.data);
        message.success(response.message);
        console.log(resultsData);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PageTitle title="Results" />
      <div className="divider"></div>
      <Table columns={columns} className="mt-2" dataSource={resultsData} />
    </div>
  );
}

export default ResultsPage;
