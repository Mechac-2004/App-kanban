import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column } from "./Types";
import TrashIcon from "../icons/TrashIcon";
import "./columnContainer.css";

interface Props {
  column: Column;
  deleteColumn: (id: string) => void;
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} className="column-container">
      {/* Column title */}
      <div className="column-header" {...attributes} {...listeners}>
        <div className="column-title">
          <div className="task-count">0</div>
          {column.title}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="delete-btn"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Column task container */}
      <div className="column-content">Content</div>

      {/* Column footer */}
    </div>
  );
}

export default ColumnContainer;
