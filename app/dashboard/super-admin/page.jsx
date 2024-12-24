"use client";

import { useUsersStore } from "@/app/stores/userStore";
import { fetchUsers } from "@/lib/actions/site-admin/activity.actions";
import React, { useEffect, useState } from "react";

const SuperAdminPage = () => {
  const [data, setData] = useState([]);
  // Define the getData function
  const getData = async () => {
    try {
      const fetchedData = await fetchUsers();
      console.log(fetchedData);
      console.log(data);
      setData(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data on initial render
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>This is Super Admin Page</h1>
      <ul>
        {data?.length ? (
          data.map((item, index) => (
            <li key={index}>
              <strong>{item.username}</strong> - {item.email} - {item.role} -{" "}
              {item.date}
            </li>
          ))
        ) : (
          <p>Loading user data...</p>
        )}
      </ul>
    </div>
  );
};

export default SuperAdminPage;
