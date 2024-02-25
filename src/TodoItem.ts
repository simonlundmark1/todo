export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: Date | string | null; 

}