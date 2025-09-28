import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const url=process.env.REACT_APP_API_URL;
  console.log("API URL:", process.env.REACT_APP_API_URL);

  const handleSubmit = async () => {
    await axios.post(`${url}/api/add`, { name, phone });
    setName("");
    setPhone("");
    fetchList();
  };

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/list`);
    setList(res.data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Landing Page</h1>
      <button onClick={() => navigate("/fullList")}>Next Page</button>
      <input placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} style={{ margin: "5px" }} />
      <input placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ margin: "5px" }} />
      <button onClick={handleSubmit}>Save</button>

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
