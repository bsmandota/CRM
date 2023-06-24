import MaterialTable from "@material-table/core";
import Sidebar from "../components/Sidebar";
import Widget from "../components/widget";
import ticketStatusCount from './Admin'
import ExportPdf from "@material-table/exporters/pdf";
import ExportCsv from "@material-table/exporters/csv";
import { Modal, ModalHeader, ModalTitle } from "react-bootstrap";
const propsOpen={
  color : "primary",
  title : " Open",
  icon : "envelope-open",
  ticketCount:ticketStatusCount.open,
  totalCount:ticketStatusCount.total
  
}
const propsProgress={
  color : "warning",
  title : " Progress",
  icon : "hourglass-split",
  ticketCount:ticketStatusCount.progress,
  totalCount:ticketStatusCount.total
}
const propsClosed={
  color : "success",
  title : " Closed",
  icon : "check2-square",
  ticketCount:ticketStatusCount.closed,
  totalCount:ticketStatusCount.total
  
}
const propsBlocked={
  color : "dark",
  title : " Blocked",
  icon : "slash-circle",
  ticketCount:ticketStatusCount.blocked,
  totalCount:ticketStatusCount.total
  
}
const columns = [
  {
    title:"ID",
    field:"id"  
  },
  {
    title:"TITLE",
    field:"title"  
  },
  {
    title:"DESCRIPTION",
    field:"description"  
  },
  {
    title:"PRIORITY",
    field:"priority"  
  },
  {
    title:"REPORTER",
    field:"reporter"  
  },
  {
    title:"STATUS",
    field:"status" ,
    lookup:{
      "OPEN":"OPEN",
      "IN_PROGRESS":"IN_PROGRESS",
      "CLOSED":"CLOSED",
      "BLOCKED":"BLOCKED",
    } 
  },
]
function Engineer() {
  return (
    <div className="bg-info vh-100%">
      <Sidebar />
      <div className="mx-4 p-5">
      <div className="container mx-2">
        <h2 className="text-center text-primary">Hello, Engineer</h2>
        <p className="text-center lead text-muted">Take a Quick review to your Engineer Stats</p>
      </div>
        <div className="row ">
        <Widget {...propsOpen} />
        <Widget {...propsProgress} />
        <Widget {...propsClosed} />
        <Widget {...propsBlocked} />
        </div>
        <hr />
        <div className="container">
        <MaterialTable
        columns={columns}
        title="Tickets Assigned to You"
        options={{
          filtering: true,
          exportMenu:[
            {
              label: "Export Pdf",
              exportFunc:(cols, data) =>ExportPdf(cols,data, "Ticket Records")
            },
            {
              label: "Export Csv",
              exportFunc:(cols, data) =>ExportCsv(cols,data, "Ticket Records")
            },
          ],
          headerStyle:{
            backgroundColor: "blue",
            color: "#fff"
          }
        }}
        />
          {/* <button onClick={setTicketUpdationModal(true)}>Edit Ticket</button> */}
        {/* <Modal
        show = {ticketUpdationModal}
        onHide={()=> setTicketUpdationModal(false)}
        backdrop="static"
        centered>
          <ModalHeader closedButton>
            <Modal.Title>Update Ticket</Modal.Title>
          </ModalHeader>
          <Modal.Body>
            <form>
              <div className="p-1">
                <h5 className="text-primary">ID:</h5>
              </div>
              <div className="input-group">
                 <label className="label-md"></label>
              </div>
            </form>
          </Modal.Body>
        </Modal> */}
        </div>
        </div>
    </div>

  );
}
export default Engineer;
