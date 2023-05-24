import MaterialTable from "@material-table/core";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";
import fetchTicket from "../api/tickets";
import { useEffect, useState } from "react";
const columns = [
  { title: "ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "reporter" },
  { title: "ASSIGNEE", field: "assignee" },
  { title: "PRIORITY", field: "ticketPriority" },
  {
    title: "STATUS",
    field: "status",
    lookup: {
      OPEN: "OPEN",
      IN_PROGRESS: "IN_PROGRESS",
      CLOSED: "CLOSED",
      BLOCKED: "BLOCKED",
    },
  },
];
const userColumns = [
  { title: "ID", field: "id" },
  { title: "NAME", field: "name" },
  { title: "EMAIL", field: "email" },
  { title: "ROLE", field: "role" },
  { title: "STATUS", field: "status" },
];
function Admin() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketStatusCount, setTicketStatusCount] = useState(null);
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    fetchTicket()
      .then((response) => {
        setTicketDetails(response.data);
        console.log(updateTicketCount(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateTicketCount = (tickets)=>{
    const data ={
      open:0,
      closed:0,
      progress:0,
      blocked:0
    }
    tickets.forEach(x=>{
      if(x.status === "OPEN"){
        data.open += 1;
      }
      else if(x.status === "CLOSED"){
        data.closed += 1;
      }
      else if(x.status === "IN_PROGRESS"){
        data.progress += 1;
      }
      else if(x.status === "BLOCKED"){
        data.blocked += 1;
      }
    })

    setTicketStatusCount(Object.assign({},data))
    return data;
  }
  
  return (
    <div className="bg-light vh-100">
      <Sidebar />
      <div className=" d-inline-block fw-bold px-3 py-1 mx-5 my-1 rounded bg-secondary h5">
        TETHER-X
      </div>
      <div className="mx-4 p-5">
        <div className="container">
          <h3 className="text-center fw-bolder text-success">
            Welcome, {localStorage.getItem("name")}!
          </h3>
          <p className="text-muted text-center">
            Take a Quick Tour to your Admin Stats below!
          </p>
        </div>
        <div className="row m-2">
          <div className="col-xs-12 col-lg-3 col-md-6  my-2">
            <div className="card shadow bg-primary text-center">
              <h5 className="card-subtitle m-2 text-white d-flex justify-content-evenly">
                <i className="bi bi-envelope-open text-white"> Open</i>
              </h5>
              <hr />
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col text-white fw-bold display-6 m-2 ">{ticketStatusCount.open}</div>
                <div className="col m-2">
                  <div className="w-50">
                    <CircularProgressbar
                      value={ticketStatusCount.open}
                      styles={buildStyles({ pathColor: "darkgrey" })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-lg-3 col-md-6 my-2">
            <div className="card shadow bg-warning text-center">
              <h5 className="card-subtitle m-2 text-white">
                <i className="bi bi-hourglass-split text-white"> Progress</i>
              </h5>
              <hr />
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col text-white fw-bold display-6 m-2 ">{ticketStatusCount.progress}</div>
                <div className="col m-2">
                  <div className="w-50">
                    <CircularProgressbar
                      value={ticketStatusCount.progress}
                      styles={buildStyles({ pathColor: "darkgrey" })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-lg-3 col-md-6 my-2">
            <div className="card shadow bg-success text-center">
              <h5 className="card-subtitle m-2 text-white">
                <i className="bi bi-check2-square text-white"> Closed</i>
              </h5>
              <hr />
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col text-white fw-bold display-6 m-2 ">{ticketStatusCount.closed}</div>
                <div className="col m-2">
                  <div className="w-50">
                    <CircularProgressbar
                      value={ticketStatusCount.closed}
                      styles={buildStyles({ pathColor: "darkgrey" })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-lg-3 col-md-6 my-2">
            <div className="card shadow bg-danger text-center">
              <h5 className="card-subtitle m-2 text-white">
                <i className="bi bi-slash-circle text-white"> Blocked</i>
              </h5>
              <hr />
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col text-white fw-bold display-6 m-2 ">{ticketStatusCount.blocked}</div>
                <div className="col m-2">
                  <div className="w-50">
                    <CircularProgressbar
                      value={ticketStatusCount.blocked}
                      styles={buildStyles({ pathColor: "darkgrey" })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container m-2">
          <MaterialTable
            title="TICKETS"
            columns={columns}
            data={ticketDetails}
            options={{
              filtering: true,
              headerStyle: {
                backgroundColor: "#aaa",
                color: "#fff",
              },
              rowStyle: (ticketDetails, index) => {
                if (index % 2 === 0) {
                  return { backgroundColor: "#eee" };
                } else {
                  return { backgroundColor: "#fff" };
                }
              },
              exportMenu: [
                {
                  label: "export Pdf",
                  exportFunc: (cols, data) =>
                    ExportPdf(cols, data, "ticketRecords"),
                },
                {
                  label: "export Csv",
                  exportFunc: (cols, data) =>
                    ExportCsv(cols, data, "ticketRecords"),
                },
              ],
            }}
          />
        </div>
        <div className="container m-2">
          <MaterialTable
            title="USER DETAILS"
            columns={userColumns}
            //data={data}
            options={{
              filtering: true,
              headerStyle: {
                backgroundColor: "#95f",
                color: "#fff",
              },
              rowStyle: {},
              exportMenu: [
                {
                  label: "export Pdf",
                  exportFunc: (cols, data) =>
                    ExportPdf(cols, data, "userRecords"),
                },
                {
                  label: "export Csv",
                  exportFunc: (cols, data) =>
                    ExportCsv(cols, data, "userRecords"),
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Admin;
