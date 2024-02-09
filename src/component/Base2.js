import Navbar2 from "../pages/Navbar2";


const Base2 =({title = " welcome to our website ", children }) =>{

    return(
        <div className="container-fluid p-0 m-0">
            <Navbar2/>
            {children}
            
        </div>
    );
};

export default Base2;