import { CSidebar, CSidebarNav, CNavTitle,CIcon, CNavItem } from "@coreui/react";

function Sidebar(){
    const logoutFn = ()=>{
        localStorage.clear();
        window.location.href = "/"
    }
    return(
        <CSidebar unfoldable className="vh-100 bg-dark  ">
            <CSidebarNav className="bg-dark ">
            <CNavItem className="d-flex hover-overlay">
            <i className="bi bi-bar-chart-fill text-white mx-3 my-2"></i><h5 className="text-white fw-bolder mx-3 py-2 text-truncate"> TETHER-X</h5>
            </CNavItem>
            <div onClick={logoutFn}>
                <CNavItem className="d-flex hover-overlay">
                <i className="bi bi-box-arrow-left text-white mx-3 my-2"></i>
                    <h5 className="text-white fw-bolder mx-3 py-2 text-truncate">Log out</h5>
                </CNavItem>
                
            <CNavTitle className="text-light fw-normal">
            <div>A CRM app for all your customer
             solutions ....</div>
            </CNavTitle>
            </div>
            </CSidebarNav>
        </CSidebar>
    )
}

export default Sidebar; 