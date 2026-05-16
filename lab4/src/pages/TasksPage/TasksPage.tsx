import TaskCard from "../../components/TaskCard/TaskCard";
import { useTasks } from "../../store/TasksContext";

export default function TasksPage() {
  const { tasks, dispatch } = useTasks();

  return (
    <div>
      <h2>📋 Задачі ({tasks.length})</h2>
      {tasks.length === 0 && (
        <p>Задач поки немає. Створіть першу!</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={(id) => dispatch({ type: "DELETE", payload: id })}
          />
        ))}
      </div>
    </div>
  );
}
