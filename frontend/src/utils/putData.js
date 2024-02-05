import axios from "axios";

export const putData = async (id, exit_time) => {
  await axios.put(`/park/out?id=${id}&exit_time=${exit_time}`);
};
