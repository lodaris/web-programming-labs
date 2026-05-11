import clsx from "clsx";
import type { Task, TaskStatus } from "../../types/task";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const PRIORITY_LABELS: Record<string, string> = {
  low: "Низький",
  medium: "Середній",
  high: "Високий",
};

const STATUS_LABELS: Record<string, string> = {
  todo: "Нова",
  "in-progress": "В роботі",
  done: "Виконано",
};

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <div
      className={clsx(styles.card, {
        [styles.cardLow]: task.priority === "low",
        [styles.cardMedium]: task.priority === "medium",
        [styles.cardHigh]: task.priority === "high",
      })}
    >
      <h3 className={styles.title}>{task.title}</h3>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <div className={styles.meta}>
        <span>{PRIORITY_LABELS[task.priority]}</span>
        <span>📅 {formatDate(task.createdAt)}</span>
      </div>

      <div className={styles.actions}>
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
          className={styles.select}
        >
          <option value="todo">Нова</option>
          <option value="in-progress">В роботі</option>
          <option value="done">Виконано</option>
        </select>

        <span className={styles.statusBadge}>
          {STATUS_LABELS[task.status]}
        </span>

        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(task.id)}
        >
          🗑 Видалити
        </button>
      </div>
    </div>
  );
}

export default TaskCard;