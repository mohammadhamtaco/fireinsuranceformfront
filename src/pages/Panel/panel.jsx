import React, { useEffect, useState } from "react";
import AuthModal from "../../components/authModal/authModal";
import axios from "axios";
import "./panel.css";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function Panel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/panel");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="panel">
      {/* <AuthModal /> */}
      <div className="container my-5">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ردیف</th>
              <th scope="col">نام و نام خانوادگی</th>
              <th scope="col">کد ملی</th>
              <th scope="col">موبایل</th>
              <th scope="col">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.nationalId}</td>
                <td>{item.mobile}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Panel;
