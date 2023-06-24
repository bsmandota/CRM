import Sidebar from "../components/Sidebar";
import Widget from "../components/widget";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";
import MaterialTable from "@material-table/core";
import { Modal,Button } from "react-bootstrap";
import { useState, } from "react";
import {ticketCreation} from '../api/tickets';

const columns = [
  { title: "ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "reporter" },
  { title: "ASSIGNEE", field: "assignee" },
  { title: "PRIORITY", field: "ticketPriority" },
  { title: "STATUS", field: "status",
    lookup: {
      OPEN: "OPEN",
      IN_PROGRESS: "IN_PROGRESS",
      CLOSED: "CLOSED",
      BLOCKED: "BLOCKED",
    },
  },
];
const createTicket = (e)=>{
  e.preventDefault();
  const data ={
    title: e.target.title.value,
    description: e.target.description.value
  } 
  ticketCreation(data)
  .then(response=>{console.log(response)}).catch(error=>console.log(error))
} 
function Customer() {
  const [createTicketModal, setCreateTicketModal]= useState(false);
  const closeCreateTicketModal = ()=>{
    setCreateTicketModal(false);
  }
  return (
    <div className="bg-success vh-100%">
      <Sidebar />
      <div className=" d-inline-block fw-bold px-3 py-1 mx-5 my-1 rounded bg-secondary h5">
        TETHER-X
      </div>

      {/* Welcome Text */}
      <div className="mx-4 p-5">
        <div className="container">
          <h3 className="text-center fw-bolder text-white">
            Welcome, {localStorage.getItem("name")}!
          </h3>
          <p className=" lead text-center">
            Take a Quick Tour to your Raised Tickets below!
          </p>
        </div>

      <div className="row m-2 justify-content-between">
        <Widget  color = "primary" title = " Open" icon = "envelope-open" ticketCount="25" totalCount="100" />
        <Widget color="warning" title=" Progress" icon="hourglass-split" ticketCount=
        "20" totalCount="100" />
        <Widget color="success" title=" Closed" icon="check2-square" ticketCount="30" totalCount="100" />
        <Widget color="dark" title=" Blocked" icon="slash-circle" ticketCount="25" totalCount="100"  />
        </div>
        <div className="container m-2">
        <MaterialTable
            title="TICKETS RAISED BY YOU"
            // 1. -> Grabbing the specific ticket from the row
            // onRowClick={(event, rowData) => editTicket(rowData)}
            columns={columns}
            // data={ticketDetails}
            options={{
              filtering: true,
              headerStyle: {
                backgroundColor: "#198754",
                color: "#fff",
              },
              rowStyle: (ticketDetails, index) => {
                if (index % 2 === 0) {
                  return { backgroundColor: "#ddd" };
                } else {
                  return { backgroundColor: "#fff" };
                }
              },
              exportMenu: [
                {
                  label: "Export Pdf",
                  exportFunc: (cols, data) =>
                    ExportPdf(cols, data, "ticketRecords"),
                },
                {
                  label: "Export Csv",
                  exportFunc: (cols, data) =>
                    ExportCsv(cols, data, "ticketRecords")
                      .then((response) => console.log(response))
                      .catch((error) => console.log(error)),
                },
              ],
            }}
          />
        <div className="text-white text-center m-2">Facing any issue? raise a ticket!</div>
        <button onClick={()=>setCreateTicketModal(true)} className="btn btn-lg btn-primary h5 w-100 text-center">Raise a ticket</button>
          </div>
          
        </div>
          {createTicketModal} &&(
          <Modal
            show={createTicketModal}
            onHide={closeCreateTicketModal}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={createTicket}>
                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    // value={selectedCurrTicket.title}
                    className="form-control"
                  />
                </div>
                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Description
                  </label>
                  <textarea
                    type="text-area"
                    // value={selectedCurrTicket.description}
                    className="md-textarea form-control"
                    name="description"
                    // onChange={onTicketUpdate}
                  />
                </div>
            <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    className="m-1"
                    onClick={()=>setCreateTicketModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="success" className="m-1" type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
          )
    </div>
  );
}
export default Customer;