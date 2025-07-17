export const toKebabCase = (s: string): string => {
    return s.toLowerCase().replace(/\s/g, '-');
  };

export const defaultStatuses = ['Backlog', 'Ready', 'In Progress', 'Completed'];

export class KanbanBoard {
  title: string;
  statuses: string[];
  url: string;

  constructor(title: string) {
    this.title = title;
    this.statuses = [...defaultStatuses];
    this.url = `https://example.com/boards/${toKebabCase(this.title)}`;
  }

  addStatus(status: string) {
    this.statuses.push(status);
  }

  removeStatus(status: string) {
    this.statuses.splice(this.statuses.indexOf(status));
  }
}