export interface Notification {
  id?: number;
  message: string;
  type: string;
  read?: boolean;
  timestamp?: Date;
}
