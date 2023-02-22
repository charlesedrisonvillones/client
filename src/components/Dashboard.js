import DisplayFeeds from "./displayFeeds";
import DisplayPigs from "./displayPigs";
import DisplayMedicines from "./displayMedicines";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Dashboard.css";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  const [countFeeds, setCountFeeds] = useState(0);
  const [countPigs, setCountPigs] = useState(0);
  const [countMedicines, setCountMedicines] = useState(0);
  const getCountFeeds = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/countFeeds", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const parseRes = await response.json();
      setCountFeeds(parseRes.count);
      console.log(parseRes);
    } catch (error) {
      console.log(error);
    }
  };

  const getCountPigs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/countPigs", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const parseRes = await response.json();
      setCountPigs(parseRes.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getCountMedicines = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/countMedicines", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const parseRes = await response.json();
      setCountMedicines(parseRes.count);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCountFeeds();
    getCountMedicines();
    getCountPigs();
  }, []);

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };

    const options = {
      scales: {
        xAxes: [
          {
            type: 'category',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

    setChartData({ data, options });
  }, []);

  // const data = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       label: "First dataset",
  //       data: [33, 53, 85, 41, 44, 65],
  //       fill: true,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)"
  //     },
  //     {
  //       label: "Second dataset",
  //       data: [33, 25, 35, 51, 54, 76],
  //       fill: false,
  //       borderColor: "#742774"
  //     }
  //   ]
  // };
  // const options = {
  //   scales: {
  //     xAxes: [
  //       {
  //         type: 'category',
  //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };
  

  return (
    <div style={{ display: "flex", paddingTop: "50px" }}>
      <Card
        style={{
          width: "32rem",
          display: "flex",
          flexDirection: "row",
          paddingBottom: "50px",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}>
        <Card.Body>
          <Card.Title>PIGS</Card.Title>

          <Card.Text>
            <div style={{ fontSize: "3rem" }}>{countPigs}</div>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        style={{
          width: "32rem",
          display: "flex",
          flexDirection: "row",
          paddingBottom: "50px",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}>
        <Card.Body>
          <Card.Title>FEEDS</Card.Title>

          <Card.Text>
            <div style={{ fontSize: "3rem" }}>{countFeeds}</div>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        style={{
          width: "32rem",
          display: "flex",
          flexDirection: "row",
          paddingBottom: "50px",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}>
        <Card.Body>
          <Card.Title>MEDICINES</Card.Title>

          <Card.Text>
            <div style={{ fontSize: "3rem" }}>{countMedicines}</div>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <Line data={data}  /> */}
      {/* <Line data={chartData.data} options={chartData.options} /> */}
    </div>
  );
};

export default Dashboard;
