import Navbar1 from "../pages/Navbar1";


const Base1 =({title = " welcome to our website ", children }) =>{

    return(
        <div className="container-fluid p-0 m-0">
            <Navbar1/>
            {children}
            
        </div>
    );
};

export default Base1;