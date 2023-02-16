import DisplayFeeds from "./displayFeeds";
import DisplayPigs from "./displayPigs";
import DisplayMedicines from "./displayMedicines";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Dashboard.css";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";

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
      console.log(parseRes)
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
    </div>
  );
};

export default Dashboard;
