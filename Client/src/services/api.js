import axios from 'axios';

export const fetchChatHistory = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/messages");
    return res.data;
  } catch (err) {
    console.error("Error fetching chat history:", err);
    return [];
  }
};
