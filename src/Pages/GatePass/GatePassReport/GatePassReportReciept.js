import React from "react";

// const GatePassReportReciept = ({ selectedReport }) => {

const GatePassReportReciept = React.forwardRef(({ selectedReport }, ref) => {
  const availableLength = 42 - selectedReport.entires.length;
  let totalData = [];
  selectedReport.entires.map((eachItem) => {
    totalData.push(eachItem);
  });
  for (let index = 0; index < availableLength; index++) {
    totalData.push({});
  }

  // first Column daata
  let tablePartOne = [];
  for (let index = 0; index < 14; index++) {
    tablePartOne.push(totalData[index]);
  }

  // total weight piece first table

  // first Column daata
  let tablePartTwo = [];
  for (let index = 14; index < 28; index++) {
    tablePartTwo.push(totalData[index]);
  }

  // first Column daata
  let tablePartThree = [];
  for (let index = 28; index < 42; index++) {
    tablePartThree.push(totalData[index]);
  }

// table one total finder 
  let partOneWeightTotal = 0;
  let partOnepiecesTotal = 0; 
  for (let index = 0; index < 14; index++) {   if (tablePartOne[index].weight !== undefined) { 
      partOneWeightTotal =partOneWeightTotal + tablePartOne[index].weight;  } }
  for (let index = 0; index < 14; index++) { if (tablePartOne[index].pieces !== undefined) {
      partOnepiecesTotal = partOnepiecesTotal + tablePartOne[index].pieces;  } }

// table one total finder 
  let partTwoWeightTotal = 0;
  let partTwopiecesTotal = 0; 
  for (let index = 0; index < 14; index++) {   if (tablePartTwo[index].weight !== undefined) { 
    partTwoWeightTotal =partTwoWeightTotal + tablePartTwo[index].weight;  } }
  for (let index = 0; index < 14; index++) { if (tablePartTwo[index].pieces !== undefined) {
      partTwopiecesTotal = partTwopiecesTotal + tablePartTwo[index].pieces;  } }

// table one total finder 
  let partThreeWeightTotal = 0;
  let partThreepiecesTotal = 0; 
  for (let index = 0; index < 14; index++) {   if (tablePartThree[index].weight !== undefined) { 
      partThreeWeightTotal =partThreeWeightTotal + tablePartThree[index].weight;  } }
  for (let index = 0; index < 14; index++) { if (tablePartThree[index].pieces !== undefined) {
      partThreepiecesTotal = partThreepiecesTotal + tablePartThree[index].pieces;  } }

  return (
    <div>
   
   
      <div className="x_content my-3" ref={ref}>
      <h2 className="text-dark text-center font-weight-bold displayPropertyForPrint"> Gate Pass Voucher </h2>

        <form>
          <div className="row" style={{ height: "32px" }}>
            <div className="col-md-3 px-0  col-3">
              <label className="col-form-label col-md-3 col-sm-3  col-3  offset-md-1 label-align">
                PO#
              </label>
              <div className="col-md-8 col-8 col-sm-8">
                <input
                  className="form-control form-control-sm"
                  disabled
                  value={selectedReport.poNo}
                />
              </div>
            </div>
            <div className="col-md-5 px-0  col-5 ">
              {" "}
              <div className="field item form-group">
                <label className="col-form-label col-md-4 col-sm-4  label-align col-4 " >
                  Party Name <strong>:</strong>
                </label>
                <div className="col-md-8 col-sm-8 col-8 ">
                  <input
                    type="text"
                    className="form-control  pt-1 removeFormControlBorder"
                    value={selectedReport.partyName}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4 px-0 col-4 ">
              <div className="field item form-group">
                <label className="col-form-label col-md-2 col-sm-2 col-2  label-align">
                  Cell <strong>:</strong>
                </label>
                <div className="col-md-9 col-sm-9 col-9">
                  <input
                    type="number"
                    className="form-control removeFormControlBorder pt-1"
                    value={selectedReport.partyCell}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 px-0  col-12 ">
              <div className="col-md-2 text-right col-2  ">
                <label className="col-form-label   offset-md-1 label-align ">
                  Address<strong>:</strong>
                </label>
              </div>
              <div className="col-md-10 col-sm-10 pr-5 col-10 ">
                <input
                  className="form-control form-control-sm w-100  removeFormControlBorder pt-2"
                  type="text"
                  disabled
                  value={selectedReport.partyAddress}
                />
              </div>
            </div>
          </div>
        </form>

        {/* ---------------table */}

        <div className="x_content mt-2 ">
          <div className="table-responsive px-2" style={{ overflowX: "unset" }}>
            <table className="table   jambo_table bulk_action ">
              <thead>
                <tr className="headings-for-Production-Form-Shif  top-border-2-bolder backGroundColorForTableHeaderPrint">
                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color 
                       text-center fontWeight300  left-border-2-bolder  top-border-2-bolder  "
                    style={{ width: "13%" }}
                  >
                    <div className="  d-flex justify-content-center   ">
                      Product
                    </div>
                  </th>
                  <th
                    className="column-title   border border-primary removePadding border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300  "
                    style={{ width: "7%" }}
                  >
                    <div className="  d-flex justify-content-center ">Roll</div>
                  </th>
                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                    style={{ width: "7%" }}
                  >
                    <div className="  d-flex justify-content-center ">
                      Piece
                    </div>
                  </th>
                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                    style={{ width: "6%" }}
                  >
                    <div className="  d-flex justify-content-center ">
                      Weight
                    </div>
                  </th>

                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                    style={{ width: "13%" }}
                  >
                    <div className="  d-flex justify-content-center ">
                      Product
                    </div>
                  </th>
                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                    style={{ width: "7%" }}
                  >
                    <div className="  d-flex justify-content-center ">Roll</div>
                  </th>
                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                    style={{ width: "7%" }}
                  >
                    <div className="  d-flex justify-content-center ">
                      Piece
                    </div>
                  </th>
                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                    style={{ width: "6%" }}
                  >
                    <div className="  d-flex justify-content-center ">
                      Weight
                    </div>
                  </th>

                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                    style={{ width: "13%" }}
                  >
                    <div className="  d-flex justify-content-center ">
                      Product
                    </div>
                  </th>
                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                    style={{ width: "7%" }}
                  >
                    <div className="  d-flex justify-content-center ">Roll</div>
                  </th>
                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300"
                    style={{ width: "7%" }}
                  >
                    <div className="  d-flex justify-content-center ">
                      Piece
                    </div>
                  </th>
                  <th
                    className="column-title   border border-primary removePadding  border-bottom-color border-bottom-color 
                         removeLeftBorder  removeTopBorder text-center fontWeight300   right-border-2-bolder"
                    style={{ width: "6%" }}
                  >
                    <div className="  d-flex justify-content-center ">
                      Weight
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tablePartOne.map((eachItem, i) => {
                  return (
                    <>
                      {" "}
                      <tr className="headings-for-Production-Form-Shif ">
                        <td className="column-title     text-center  p-0  removePadding   left-border-2-bolder right-border-2 bottom-border-2">
                          <div className=" makeSizeMicro">
                            {tablePartOne[i].border === undefined ? (
                              <>&nbsp;</>
                            ) : (
                              `${tablePartOne[i].border}-x-${tablePartOne[i].size}`
                            )}
                          </div>
                        </td>
                        <td
                          className="column-title     text-center  p-0  removePadding    right-border-2 bottom-border-2"
                          style={{ padding: "0px" }}
                        >
                          <div className=" ">{tablePartOne[i].rollNo===undefined ||  
                         ( typeof tablePartOne[i].rollNo  === 'undefined')
                          ?"":tablePartOne[i].rollNo.label}</div>




                        </td>
                        <td className="column-title     text-center  p-0  removePadding  right-border-2 bottom-border-2">
                          <div className=" ">{tablePartOne[i].pieces}</div>
                        </td>
                        <td
                          className="column-title     text-center  p-0  removePadding right-border-2-bolder bottom-border-2"
                          style={{ padding: "0px" }}
                        >
                          <div className=" ">{tablePartOne[i].weight}</div>
                        </td>

                        <td
                          className="column-title     text-center  p-0 removePadding  right-border-2 bottom-border-2"
                          style={{ padding: "0px" }}
                        >
                          <div className=" ">
                            {tablePartTwo[i].border === undefined
                              ? ""
                              : `${tablePartTwo[i].border}-x-${tablePartTwo[i].size}`}
                          </div>
                        </td>
                        <td
                          className="column-title     text-center  removePadding  right-border-2 bottom-border-2"
                          style={{ padding: "0px" }}
                        >
                          {/* <div className=" ">{tablePartTwo[i].rollNo}</div> */}
                        </td>
                        <td
                          className="column-title     text-center removePadding  right-border-2 bottom-border-2"
                          style={{ padding: "0px" }}
                        >
                          <div className=" ">{tablePartTwo[i].pieces}</div>
                        </td>
                        <td
                          className="column-title     text-center  removePadding  right-border-2-bolder bottom-border-2"
                          style={{ padding: "0px" }}
                        >
                          <div className=" ">{tablePartTwo[i].weight}</div>
                        </td>

                        <td
                          className="column-title     text-center removePadding  right-border-2 bottom-border-2"
                          style={{ padding: "0px" }}
                        >
                          <div className=" ">
                            {tablePartTwo[i].border === undefined
                              ? ""
                              : `${tablePartTwo[i].border}-x-${tablePartTwo[i].size}`}
                          </div>
                        </td>
                        <td
                          className="column-title     text-center  removePadding  right-border-2 bottom-border-2"
                          style={{ padding: "0px" }}
                        >
                          <div className=" ">{tablePartTwo[i].rollNo===undefined ||  
                         ( typeof tablePartTwo[i].rollNo  === 'undefined')
                          ?"":tablePartTwo[i].rollNo.value}</div>
                        </td>
                        <td
                          className="column-title     text-center removePadding  right-border-2 bottom-border-2"
                          style={{ padding: "0px" }}
                        >
                          <div className=" ">{tablePartTwo[i].pieces}</div>
                        </td>
                        <td className="column-title     text-center  removePadding right-border-2-bolder  bottom-border-2">
                          <div className="    style={{padding:'0px'}} ">
                            {tablePartTwo[i].weight}
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}

                {/* ------------ */}
                <tr className="headings-for-Production-Form-Shif   top-border-2-bolder   bottom-border-2-bolder ">
                  <td
                    className="column-title     text-center  p-0  removePadding   left-border-2-bolder right-border-2 bottom-border-2 "
                    colSpan="2"
                  >
                    <div className=" makeSizeMicro text-right">Total</div>
                  </td>

                  <td className="column-title     text-center  p-0  removePadding  right-border-2 bottom-border-2">
                    <div className=" text-right"> {partOnepiecesTotal} </div>
                  </td>
                  <td
                    className="column-title     text-center  p-0  removePadding right-border-2-bolder bottom-border-2"
                    style={{ padding: "0px" }}
                  >
                    <div className="text-right "> {partOneWeightTotal} </div>
                  </td>

                  <td
                    className="column-title     text-center  p-0 removePadding  right-border-2 bottom-border-2"
                    style={{ padding: "0px" }} colSpan="2"
                  >
                    <div className="text-right ">Total </div>
                  </td>
               
                  <td
                    className="column-title     text-center removePadding  right-border-2 bottom-border-2"
                    style={{ padding: "0px" }}
                  >
             
                    <div className="text-right ">   {partTwopiecesTotal} </div>
                  </td>
                  <td
                    className="column-title     text-center  removePadding  right-border-2-bolder bottom-border-2"
                    style={{ padding: "0px" }}
                  >
                    <div className=" text-right">     {partTwoWeightTotal}</div>
                  </td>

                  <td
                    className="column-title     text-center  p-0 removePadding  right-border-2 bottom-border-2"
                    style={{ padding: "0px" }} colSpan="2"
                  >
                    <div className="text-right ">Total </div>
                  </td>
               
                  <td
                    className="column-title     text-center removePadding  right-border-2 bottom-border-2"
                    style={{ padding: "0px" }}
                  >
             
                    <div className=" text-right">   {partThreepiecesTotal} </div>
                  </td>
                  <td
                    className="column-title     text-center  removePadding  right-border-2-bolder bottom-border-2"
                    style={{ padding: "0px" }}
                  >
                    <div className="text-right ">     {partThreeWeightTotal}</div>
                  </td>

                </tr>
                {/* ------------ */}
              </tbody>
            </table>

            <div className="row mt-4">
              <div className="col-md-4 px-0 col-4 ">
                <label className="col-form-label col-md-4 col-sm-4  px-0  col-4   offset-md-1 label-align">
                  Total Pieces <strong>:</strong>
                </label>
                <div className="col-md-7 col-sm-7 col-7 text-left">
                  <input
                    className="form-control form-control-sm removeFormControlBorder pt-2"
                    disabled
                    value={selectedReport.totalPieces}
                  />
                </div>
              </div>

              <div className="col-md-8 px-0 col-8">
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4 col-4 label-align">
                    Total Weight <strong>:</strong>
                  </label>
                  <div className="col-md-8 col-sm-8 pr-3 col-8">
                    <input
                      type="number"
                      className="form-control  removeFormControlBorder pt-2 text-left"
                      value={selectedReport.totalWeight}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-4">
              <div className="col-md-4 px-0 col-4 ">
                <label className="col-form-label col-md-4 col-sm-4    col-4   offset-md-1 label-align">
                  Total Roll<strong>:</strong>
                </label>
                <div className="col-md-7 col-sm-7 col-7 text-left">
                  <input
                    className="form-control form-control-sm removeFormControlBorder pt-2"
                    disabled
                    value={selectedReport.totalRoll}
                  />
                </div>
              </div>

              <div className="col-md-8 px-0 col-8">
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4 col-4 label-align">
                    Total Sharing Weight <strong>:</strong>
                  </label>
                  <div className="col-md-8 col-sm-8 pr-3 col-8">
                    <input
                      type="number"
                      className="form-control  removeFormControlBorder pt-2 text-left"
                      value={selectedReport.totalRoll}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 px-0 col-4 ">
                <label className="col-form-label col-md-4 col-sm-4  offset-md-1 label-align col-4">
                  Color <strong>:</strong>
                </label>
                <div className="col-md-7 col-sm-7 col-7">
                  <input
                    className="form-control form-control-sm removeFormControlBorder"
                    value={selectedReport.color}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-4 px-0 col-4">
                <div className="field item form-group">
                  <label className="col-form-label col-md-6 col-sm-6  label-align col-6">
                    Dying Process <strong>:</strong>
                  </label>
                  <div className="col-md-6 col-sm-6 pr-3 col-6">
                    <input
                      type="text"
                      className="form-control removeFormControlBorder"
                      value={selectedReport.dyingProceess}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 px-0 col-4">
                <div className="field item form-group">
                  <label className="col-form-label col-md-5 col-sm-5  label-align col-5">
                    Dying Weight <strong>:</strong>
                  </label>
                  <div className="col-md-7 col-sm-7 pr-3 col-7">
                    <input
                      type="number"
                      className="form-control removeFormControlBorder"
                      value={selectedReport.dyingWeight}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 px-0  col-12">
                <div className="col-md-2   text-right col-2">
                   {/* col-md-1 col-sm-1 offset-md-1  */} 
                     <label className="col-form-label label-align">
                  Remarks <strong>:</strong>
                </label>
                </div>
             
                <div className="col-md-10 col-sm-10 col-10  mt-2">
               {selectedReport.remarks}  
                  {/* <textarea */}
                  {/* <div className="" > </div> */}
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4 col-4 ">
                <label className="col-form-label col-md-4 col-sm-4  offset-md-1 label-align text-right  col-4 ">
                  Driver <strong>:</strong>
                </label>
                <div className="col-md-7 col-sm-7 col-7">
                  <input
                    className="form-control form-control-sm removeFormControlBorder"
                    value={selectedReport.driverName}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-4 px-0 col-4">
                <div className="field item form-group">
                  <label className="col-form-label col-md-5 col-sm-5   col-4 label-align col-5">
                    Vehicle Num<strong>:</strong>
                  </label>
                  <div className="col-md-8 col-sm-7 pr-3 col-7">
                    <input
                      className="form-control form-control-sm removeFormControlBorder"
                      value={selectedReport.vehicleNumb}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 px-0 col-4">
                <div className="field item form-group">
                  <label className="col-form-label col-md-4 col-sm-4 col-4  col-4 label-align">
                    Date <strong>:</strong>
                  </label>
                  <div className="col-md-8 col-sm-8 pr-3 col-8">
                    <input
                      type="text"
                      className="form-control removeFormControlBorder"
                      value={(selectedReport.createdTime).slice(0,10) }
                      disabled
                     
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row  ">
              <div className="col-md-4 px-0  col-4" >
                <label className=" col-form-label col-md-5 col-sm-5  col-5   offset-md-1 label-align col-3" >
                  Incharge Sign <strong>:</strong>
                </label>
                <div className="col-md-6 col-sm-6 col-6 ">
                  <input
                    className="form-control form-control-sm  removeTopBorder removeLeftBorder   removeRightBorder" style={{borderBottom:"red 2px solid"}}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="col-md-4 px-0  col-4">
                <div className="field item form-group">
                  <label className="col-form-label col-md-5 col-sm-5   label-align col-5">
                    Driver Sign   <strong>:</strong>
                  </label>
                  <div className="col-md-7 col-sm-7 pr-3 col-7">
                    <input
                      type="text"
                      className="form-control form-control-sm  removeTopBorder removeLeftBorder   removeRightBorder" style={{borderBottom:"red 2px solid"}}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 px-0  col-4">
                <div className="field item form-group">
                  <label className="col-form-label col-md-5 col-sm-5  label-align col-5">
                    Guard Sign  <strong>:</strong>
                  </label>
                  <div className="col-md-7 col-sm-7 pr-3 col-7">
                    <input
                      type="text"
                      className="form-control form-control-sm  removeTopBorder removeLeftBorder   removeRightBorder" style={{borderBottom:"red 2px solid"}}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default GatePassReportReciept;
