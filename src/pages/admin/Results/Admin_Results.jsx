import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { getAllTry, getAllTryByUser } from "../../../apicalls/results";
import moment from "moment";

function AdminResultsPage() {
  const [resultsData, setResultsData] = useState([]);
  const [filters, setFilters] = useState({
    quizName: "",
    userName: "",
  });
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
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      render: (text, record) => <>{record.user.name}</>,
    },
    {
      title: "Total Marks",
      dataIndex: "total",
      render: (text, record) => <>{record.quiz.total}</>,
    },
    {
      title: "Required Marks",
      dataIndex: "req",
      render: (text, record) => <>{record.quiz.passingMarks}</>,
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
  const getData = async (tempFilters) => {
    try {
      dispatch(ShowLoading());
      const response = await getAllTry(tempFilters);
      dispatch(HideLoading());
      if (response.success) {
        setResultsData(response.data);
        message.success(response.message);
        console.log(reportsData);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData(filters);
  }, []);
  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Quiz"
          value={filters.quizName}
          onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
        />
        <input
          type="text"
          placeholder="User"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <button
          className="primary-outlined-btn"
          onClick={() => {
            setFilters({
              userName: "",
              quizName: "",
            });
            getData({
              userName: "",
              quizName: "",
            });
          }}
        >
          Clear
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => getData(filters)}
        >
          Search
        </button>
      </div>
      <Table columns={columns} className="mt-2" dataSource={resultsData} />
    </div>
  );
}

export default AdminResultsPage;
