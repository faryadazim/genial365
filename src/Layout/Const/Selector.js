import Creatable from "react-select/creatable";
import React, { useState, useEffect , components } from "react";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px  #003a4d",
    color: state.isSelected ? "#f79c74" : "#003a4d",
    padding: 8,
    backgroundColor: "white",
  }),
};

const Selector = ({ fetchEmployeeByDemand }) => {
  const [roleValue, setRoleValue] = useState("");
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (field, value) => {
    fetchEmployeeByDemand(value)
    switch (field) {
      case "roles":
        setRoleValue(value);
        // console.log("selected", value);
        // console.log("selected" , value.__isNew__==true?"its new":"old");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetch("http://localhost:63145/api/employeeListsName", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
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
    // ----- Setting Employee List ------
  }, []);

  return (
    <>
      {isLoading ? (
        <> - - - </>
      ) : (
        <div className="input">
   
          <Creatable
            isClearable={false}
            onChange={(value) => handleChange("roles", value, roleValue)}
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
