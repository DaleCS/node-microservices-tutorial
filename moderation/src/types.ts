export type AppEvent = {
  type: string;
  data: any;
};

export type Comment = {
  id: string;
  content: string;
  postId: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
};
