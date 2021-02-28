import React from "react";
import { createUseStyles } from "react-jss";
import {
  ApiResponse,
  axios,
  convertLocaleStringDate,
  Question,
} from "../api/api.helper";
import { Loader } from "../Loader/Loader";
import { Tag } from "../Tag/Tag";
import { mergeClasses } from "../utils/jss.helper";
import { Sort, Property, isApiProperty, getSortFunction } from "./table.helper";

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
  clickableCell: {
    cursor: "pointer",
  },
  tr: {
    "&:nth-child(odd)": {
      backgroundColor: "#f2f2f2",
    },
  },
  tagCell: {
    width: "20%",
  },
  tagGroup: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  "@global": {
    "td, th": {
      border: "1px solid #ddd",
    },
  },
  centerCell: {
    textAlign: "center",
  },
});

export const Table = () => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sort, setSort] = React.useState<Sort>({
    property: "activity",
    direction: "desc",
  });

  const classes = useStyles();

  React.useEffect(() => {
    const getQuestions = async () => {
      try {
        if (!isApiProperty(sort.property)) {
          const localProperty = sort.property;
          const direction = sort.direction;
          setQuestions((q) => {
            const copyQuestions = [...q]; // sort modifies the array! Important to copy it to a temporary variable.
            return copyQuestions.sort(
              getSortFunction(localProperty, direction)
            );
          });
        } else {
          setIsLoading(true);
          const response = await axios.get<ApiResponse<Question>>(
            `/questions?order=${sort.direction}&sort=${sort.property}&site=stackoverflow`
          );
          setQuestions(response.data.items);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getQuestions();
  }, [sort]);

  const getSortArrow = (property: Property) => {
    if (property !== sort.property) {
      return;
    }

    return sort.direction === "asc" ? "↑" : "↓";
  };

  const toggleDirection = () => {
    setSort({ ...sort, direction: sort.direction === "asc" ? "desc" : "asc" });
  };

  const sortQuestions = (property: Property) => {
    if (property === sort.property) {
      toggleDirection();
    } else {
      setSort({ property, direction: "asc" });
    }
  };

  if (isLoading) return <Loader />;

  return questions.length === 0 ? (
    <section>Nothing to show!</section>
  ) : (
    <table className={classes.table}>
      <thead className={classes.header}>
        <tr>
          <th
            className={mergeClasses(classes.headerCell, classes.clickableCell)}
            onClick={() => sortQuestions("question_id")}
          >
            Question ID {getSortArrow("question_id")}
          </th>
          <th
            className={mergeClasses(classes.headerCell, classes.clickableCell)}
            onClick={() => sortQuestions("creation")}
          >
            Creation date {getSortArrow("creation")}
          </th>
          <th
            className={mergeClasses(classes.headerCell, classes.clickableCell)}
            onClick={() => sortQuestions("activity")}
          >
            Last activity {getSortArrow("activity")}
          </th>
          <th
            className={mergeClasses(classes.headerCell, classes.clickableCell)}
            onClick={() => sortQuestions("is_answered")}
          >
            Is this question answered? {getSortArrow("is_answered")}
          </th>
          <th
            className={mergeClasses(classes.headerCell, classes.clickableCell)}
            onClick={() => sortQuestions("display_name")}
          >
            Author {getSortArrow("display_name")}
          </th>
          <th className={classes.headerCell}>Title</th>
          <th className={classes.headerCell}>Tags</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q) => (
          <tr key={q.question_id} className={classes.tr}>
            <td className={classes.centerCell}>{q.question_id}</td>
            <td className={classes.centerCell}>
              {convertLocaleStringDate(q.creation_date)}
            </td>
            <td className={classes.centerCell}>
              {convertLocaleStringDate(q.last_activity_date)}
            </td>
            <td className={classes.centerCell}>
              {q.is_answered ? "✅" : "❌"}
            </td>
            <td className={classes.centerCell}>{q.owner?.display_name}</td>
            <td>{q.title}</td>
            <td className={classes.tagCell}>
              <div className={classes.tagGroup}>
                {q.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
