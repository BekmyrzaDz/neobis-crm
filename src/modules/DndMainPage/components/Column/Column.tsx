import { useId } from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { IColumn, IColumns, IStudent } from "../../types"
import Button from "../Button"
import Card from "../Card/Card"
import styles from "./Column.module.scss"

interface Props {
  column: IColumn
  students: IStudent[]
}

function Column<T>(props: Props) {
  const { students, column } = props

  return (
    <div className={styles.column}>
      <Button name={column.title} count={students.length} />
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            className={styles.container}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {students.map((student, index) => (
              <Draggable
                key={student.id}
                draggableId={`${student.id}`}
                index={index}
              >
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Card
                      time={student.time}
                      id={student.id}
                      first_name={student.first_name}
                      last_name={student.last_name}
                      phone={student.phone}
                      department={student.department}
                      came_from={student.came_from}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column
