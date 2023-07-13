import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
export default function Widget(props){
  const {color, title, icon, ticketCount, totalCount} = props;
    return(
        <div className="col-xs-12 col-lg-3 col-md-6 my-2">
            <div className={`card shadow bg-${color} text-center pt-2 bg-opacity-75`}>
              <h4 className={`card-top m-2 text-white d-flex justify-content-evenly`} style={{cursor:"pointer"}}>
                <i className={`bi bi-${icon} text-white bolder`} >{title}</i>
              </h4>
              <hr className="p-0 m-0" />
              <div className="row d-flex justify-content-center align-items-center">
                <div className={`col text-white fw-bold display-6 m-2 `}>
                  {ticketCount}
                </div>
                <div className="col m-2">
                  <div className="w-50">
                    <CircularProgressbar
                      value={ticketCount}
                      maxValue={totalCount}
                      styles={buildStyles({ pathColor: "white",})}
                      backgroundPadding={50}
                      strokeWidth={15}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}