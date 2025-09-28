import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FullList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const fetchList = async () => {
    const res = await axios.get(`${url}/api/list`);
    setList(res.data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <button onClick={() => navigate("/")}>Previous Page</button>
      <h1>Full List Page</h1>
      <p>This is the second page with route name 'fullList'.</p>
      <h2>Existing Users</h2>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} - {item.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
