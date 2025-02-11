// import React from "react";
// import { Modal, Form, message } from "antd";
// import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
// import { useDispatch } from "react-redux";
// import { addQuestionToQuiz, editQuestionInQuiz } from "../../../apicalls/quizs";

// function AddEditQuestion(props) {
//   const {
//     showAddEditQuestionModal,
//     setShowAddEditQuestionModal,
//     quizId,
//     refreshData,
//     selectedQuestion,
//     setSelectedQuestion,
//   } = props;
//   const dispatch = useDispatch();
//   const onFinish = async (values) => {
//     try {
//       dispatch(ShowLoading());
//       let response;
//       if (selectedQuestion) {
//         const requiredPayload1 = {
//           name: values.name,
//           correctOption: values.correctOption,
//           options: {
//             A: values.A,
//             B: values.B,
//             C: values.C,
//             D: values.D,
//           },
//           quiz: quizId,
//           questionId: selectedQuestion?._id,
//         };
//         response = await editQuestionInQuiz(requiredPayload1, quizId);
//       } else {
//         const requiredPayload2 = {
//           name: values.name,
//           correctOption: values.correctOption,
//           options: {
//             A: values.A,
//             B: values.B,
//             C: values.C,
//             D: values.D,
//           },
//           quiz: quizId,
//         };
//         response = await addQuestionToQuiz(requiredPayload2, quizId);
//       }
//       dispatch(HideLoading());
//       if (response.success) {
//         message.success(response.message);
//         refreshData(quizId);
//         setShowAddEditQuestionModal(false);
//       } else {
//         message.error(response.message);
//         setShowAddEditQuestionModal(false);
//       }
//     } catch (error) {
//       dispatchEvent(HideLoading());
//       setShowAddEditQuestionModal(false);
//       message.error(error.message);
//     }
//   };
//   return (
//     <Modal
//       title={selectedQuestion ? "Edit Question" : "Add Question"}
//       open={showAddEditQuestionModal}
//       footer={false}
//       onCancel={() => {
//         setShowAddEditQuestionModal(false);
//         setSelectedQuestion();
//       }}
//     >
//       <Form
//       className="p-6"
//         onFinish={onFinish}
//         layout="vertical"
//         initialValues={{
//           name: selectedQuestion?.name,
//           correctOption: selectedQuestion?.correctOption,
//           A: selectedQuestion?.options.A,
//           B: selectedQuestion?.options.B,
//           C: selectedQuestion?.options.C,
//           D: selectedQuestion?.options.D,
//         }}
//       >
//         <Form.Item name="name" label="Question">
//           <input type="text" />
//         </Form.Item>
//         <Form.Item name="correctOption" label="Correct Option">
//           <input type="text" />
//         </Form.Item>
//         <div className="flex gap-2">
//           <Form.Item name="A" label="Option A">
//             <input type="text" />
//           </Form.Item>
//           <Form.Item name="B" label="Option B">
//             <input type="text" />
//           </Form.Item>
//         </div>
//         <div className="flex gap-2">
//           <Form.Item name="C" label="Option C">
//             <input type="text" />
//           </Form.Item>
//           <Form.Item name="D" label="Option D">
//             <input type="text" />
//           </Form.Item>
//         </div>
//         <div className="flex justify-end gap-2 mt-2">
//           <button className="primary-contained-btn" type="submit">
//             Save
//           </button>
//           <button
//             className="primary-outlined-btn"
//             type="button"
//             onClick={() => {
//               setShowAddEditQuestionModal(false);
//               setSelectedQuestion();
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       </Form>
//     </Modal>
//   );
// }

// export default AddEditQuestion;

import React from "react";
import { Modal, Form, message, Select } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { addQuestionToQuiz, editQuestionInQuiz } from "../../../apicalls/quizs";

function AddEditQuestion(props) {
  const {
    showAddEditQuestionModal,
    setShowAddEditQuestionModal,
    quizId,
    refreshData,
    selectedQuestion,
    setSelectedQuestion,
  } = props;
  const dispatch = useDispatch();
  const { Option } = Select;

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        quiz: quizId,
      };

      if (selectedQuestion) {
        requiredPayload.questionId = selectedQuestion._id;
        response = await editQuestionInQuiz(requiredPayload, quizId);
      } else {
        response = await addQuestionToQuiz(requiredPayload, quizId);
      }

      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        refreshData(quizId);
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
        setShowAddEditQuestionModal(false);
      }
    } catch (error) {
      dispatch(HideLoading());
      setShowAddEditQuestionModal(false);
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={selectedQuestion ? "Edit Question" : "Add Question"}
      open={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false);
        setSelectedQuestion();
      }}
    >
      <Form
        className="p-6"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: selectedQuestion?.name,
          correctOption: selectedQuestion?.correctOption,
          A: selectedQuestion?.options.A,
          B: selectedQuestion?.options.B,
          C: selectedQuestion?.options.C,
          D: selectedQuestion?.options.D,
        }}
      >
        <Form.Item
          name="name"
          label="Question"
          rules={[{ required: true, message: "Please input the question!" }]}
        >
          <input type="text" />
        </Form.Item>
        <Form.Item
          name="correctOption"
          label="Correct Option"
          rules={[
            { required: true, message: "Please select the correct option!" },
          ]}
        >
          <Select>
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
            <Option value="D">D</Option>
          </Select>
        </Form.Item>
        <div className="flex gap-2">
          <Form.Item
            name="A"
            label="Option A"
            rules={[{ required: true, message: "Please input option A!" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            name="B"
            label="Option B"
            rules={[{ required: true, message: "Please input option B!" }]}
          >
            <input type="text" />
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <Form.Item
            name="C"
            label="Option C"
            rules={[{ required: true, message: "Please input option C!" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            name="D"
            label="Option D"
            rules={[{ required: true, message: "Please input option D!" }]}
          >
            <input type="text" />
          </Form.Item>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button className="primary-contained-btn" type="submit">
            Save
          </button>
          <button
            className="primary-outlined-btn"
            type="button"
            onClick={() => {
              setShowAddEditQuestionModal(false);
              setSelectedQuestion();
            }}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditQuestion;
