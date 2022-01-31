export type AppEvent = {
  type: string;
  data: any;
};

export type Comment = {
  id: string;
  content: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
};
