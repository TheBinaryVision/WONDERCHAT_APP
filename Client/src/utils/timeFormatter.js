import moment from "moment";

export const formatTime = (timestamp) => {
  return moment(timestamp).format("h:mm A");
};
