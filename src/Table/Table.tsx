import React from "react";
import { createUseStyles } from "react-jss";
import {
  ApiResponse,
  axios,
  convertEpochToDate,
  Question,
} from "../api/api.helper";
import { Tag } from "../Tag/Tag";

const useStyles = createUseStyles({
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  header: {
    backgroundColor: "#f48024",
    color: "#fff",
    textAlign: "center",
  },
  headerCell: {
    padding: {
      top: "4px",
      bottom: "4px",
    },
  },
  tagsCell: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});

export const Table = () => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const classes = useStyles();

  React.useEffect(() => {
    const getQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse<Question>>(
          "/questions?order=desc&sort=activity&site=stackoverflow"
        );
        setQuestions(response.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getQuestions();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <table className={classes.table}>
      <thead className={classes.header}>
        <tr>
          <th className={classes.headerCell}>Question ID</th>
          <th className={classes.headerCell}>Is question answered?</th>
          <th className={classes.headerCell}>Title</th>
          <th className={classes.headerCell}>Creation date</th>
          <th className={classes.headerCell}>Author</th>
          <th className={classes.headerCell}>Tags</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q) => (
          <tr key={q.question_id}>
            <td>{q.question_id}</td>
            <td>{q.is_answered ? "✅" : "❌"}</td>
            <td>{q.title}</td>
            <td>{convertEpochToDate(q.creation_date).toLocaleDateString()}</td>
            <td>{q.owner?.display_name}</td>
            <td className={classes.tagsCell}>
              {q.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
