import Creatable from "react-select/creatable";
import React, { useState, useEffect ,   } from "react";

const customStyles = {
  // control: base => ({
  //   ...base, 
  //   // This line disable the blue border
 
  // })
  control: (provided, state , base) => ({
    ...provided,
    background: '#fff',
    borderColor: '#d9e4e8',
    borderRadius:"none",
    minHeight: '30px',
    height: '30px',
    // boxShadow: state.isFocused ? null : null,
    ...base,    boxShadow: 'none'
  }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px  #003a4d",
      color: state.isSelected ? "#f79c74" : "#003a4d",
      background: '#fff',
   
    }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    padding: '0 6px' ,  
      // background: '#fff',
    
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
    
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    
  }),
  
}

const Selector = ({ fetchEmployeeByDemand  , setStateUpdater
   , stateUpdater , setSingleUserId,setModalShow ,updateSelectorList
}) => {
  
  const url = localStorage.getItem("authUser");
  const [roleValue, setRoleValue] = useState("");
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (field, value) => {

    switch (field) {
      case "roles":
        if ( value.__isNew__==true) {
            console.log("create new");
            setModalShow(true)
        // console.log("selected" ,?"its new":"old");
      } else {
        fetchEmployeeByDemand(value)
          setRoleValue(value);
          setSingleUserId( value.value) 
        }
       
        // console.log("selected", value.value);
    
        break;
      default:
        break;
    }
    setStateUpdater(!stateUpdater)
  };
  const fetchData=()=>{
    fetch(url +"api/employeeListsName", {
      method: "GET",
      headers: {
        Authorization:
          "bearer" +
          " " +
          JSON.parse(localStorage.getItem("access_token")).access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          var arr = [{label:"All" , value :-1}];
          data.map((item) => {
            arr.push({ label: item.name, value: item.employee_Id });
          });

          setRoles(arr); 
          setIsLoading(false);
        });
      })
      .catch((error) => console.log("error", error));
  }
  
    
  useEffect(() => {
    fetchData()
    
    // ----- Setting Employee List ------
  }, []);
  useEffect(() => {
    fetchData()
    
    // ----- Setting Employee List ------
  }, [updateSelectorList ,fetchData]);
  

  return (
    <>
      {isLoading ? (
        <> - - - </>
      ) : (
        <div className="input">
   
          <Creatable
            isClearable={false}
            onChange={(value) =>{
               
                handleChange("roles", value, roleValue)}}
            options={roles}
            value={roleValue}
            styles={customStyles}
          
          /> 
        </div>
      )}
    </>
  );
};

export default Selector;
