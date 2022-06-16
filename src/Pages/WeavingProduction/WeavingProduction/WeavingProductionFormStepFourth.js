import React, { useEffect } from 'react'

const WeavingProductionFormStepFourth = (
  { roleNameBackEnd, rollDetail,
    borderSizeValue, borderQualityValue,
    loomListValue, loomDetail,
    grandFinalTotal, finalStepInput, shiftTotalState ,finalStepRequired
  }) => {




  return (
    <>
      <div className="x_content" >
        <div className="row my-2 ">
          <div className=" col-md-6 col-sm-6 col-6 col-xl-6 col-sm-6 col-6 col-xl-6 px-5 text-customBlue font-weight-400 mb-2  bg- ">
            <div className="row">
              <div className="col-md-12   col-sm-12 col-12 col-xl-12 text-center   font-weight-600">
                <div className="my-2 text-center perPieceDetailHeadingProductionReport">Roll Detail</div>
              </div>
              <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 font-weight-500 text-left">
                  Roll Number
                </div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                  <b>
                    {roleNameBackEnd}
                  </b> </div>
              </div>
              <div className="col-md-12 col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">Date</div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">

                  {rollDetail.date}
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">Role Weight</div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                  {rollDetail.rollWeight}
                </div>
              </div>

              <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">Quality </div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                  {borderQualityValue.label}
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">Size </div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                  {borderSizeValue.label}
                </div>
              </div>
              <div className="col-md-12 col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">Program Number </div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                  {rollDetail.programNumber}
                </div>
              </div>
            </div>{" "}
          </div>
          <div className=" col-md-6 col-sm-6 col-6 col-xl-6  col-md-6 col-sm-6 col-6 col-xl-6 col-sm-6 col-6 col-xl-6 px-5 text-customBlue mb-2  ">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-12 col-xl-12 text-center   font-weight-600">
                <div className="my-2 text-center perPieceDetailHeadingProductionReport">Loom Detail</div>
              </div>
              <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">Loom Number</div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                  {loomListValue.label}
                </div>
              </div>
              <div className="col-md-12 col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">Loom Size</div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                  {loomDetail.loomSize}
                </div>
              </div>
              <div className="col-md-12 col-sm-2 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">Jacquad</div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                  {loomDetail.jacquard}
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">DrawBox</div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">

                  {
                    loomDetail.drawBox
                  }
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-12 col-xl-12">
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6  text-left">Piece in a Border </div>
                <div className=" col-md-6 col-sm-6 col-6 col-xl-6 text-right">
                  {loomDetail.NumOfPieceOneBorder}
                </div>
              </div>
            </div>
          </div>
        </div>












        <div className="row mx-3  reportTableHead">
          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1 right-border-1 px-0 my-auto">
            <div className=" col-md-5 col-sm-5 col-5 col-xl-5 px-0 right-border-1 h-100 text-center font-size-12 ">
              Sr
            </div>
            <div className=" col-md-7 col-sm-7 col-7 col-xl-7 px-0 text-center font-size-12">
              Shift
            </div>
          </div>

          <div className="col-md-4 col-md-4 col-sm-4 col-4 col-xl-4 px-0 my-auto">
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 right-border-1 h-100 my-1 font-size-12 text-center">
              Weaver
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-1 h-100  my-1 font-size-12 text-center">
              No.Border
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-1 h-100 my-1 font-size-12 text-center">
              Total.Piece
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-1 my-1 font-size-12 text-center">
              B.G.Piece
            </div>
          </div>

          <div className=" col-md-5 col-sm-5 col-5 col-xl-5 px-0">
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-1 my-1 font-size-12  text-center">
              A grade Pieces
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-1  my-1 font-size-12  text-center">
              Rate/Border
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-1  my-1 font-size-12  text-center">
              Ex.Amount Desc
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-1  my-1 font-size-12  text-center">
              Ex. Amount
            </div>
          </div>

          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12   right-border-1  text-center  my-1">
            Total
          </div>
          <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  my-1  right-border-2">
            Nativing
          </div>
        </div>

{
  shiftTotalState.map((eachShift , index)=>{
  return  <>
          <div className="row mx-3  reportTableBody bottom-border-2">
            <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1 right-border-1 px-0">
              <div className=" col-md-5 col-sm-5 col-5 col-xl-5 px-0 right-border-1 h-100 text-center font-size-12 right-border-2 py-1 h-100 left-border-2 d-flex justify-content-center align-items-center">
               {index+ 1}
              </div>
              <div className=" col-md-7 col-sm-7 col-7 col-xl-7  text-center font-size-12 right-border-2 py-1 h-100  d-flex justify-content-center align-items-center">
                {" "}
               {eachShift.shiftName}
              </div>
            </div>

            <div className="col-md-4 col-md-4 col-sm-4 col-4 col-xl-4 px-0 py-auto">
              <div className="col-md-4 col-md-4 col-sm-4 col-4 col-xl-4 right-border-2 h-100  py-1 font-size-12 text-center d-flex justify-content-center align-items-center">
              {eachShift.weaverSelectorValue.label}
              </div>

              <div className="col-md-2 col-md-2 col-sm-2 col-2 col-xl-2   right-border-2 h-100   py-1 font-size-12 text-center    d-flex justify-content-center align-items-center ">
               {eachShift.noOfBorder}
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-2 h-100 py-1 font-size-12 text-center   d-flex justify-content-center align-items-center ">
              {eachShift.totalPiece}
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3   right-border-2   py-1 font-size-12 text-center h-100   d-flex justify-content-center align-items-center ">
              {eachShift.bGradePiece}
              </div>
            </div>

            <div className=" col-md-5 col-sm-5 col-5 col-xl-5 px-0">
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-2 h-100  py-1 font-size-12  text-center   d-flex justify-content-center align-items-center ">
              {eachShift.aGradePieces}
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 right-border-2  h-100  py-1 font-size-12   d-flex justify-content-center align-items-center ">
              {eachShift.ratePerBorder}
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-2 h-100  py-1 font-size-12  text-center   d-flex justify-content-center align-items-center ">
              {eachShift.extraAmount.desc}
              </div>
              <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0  right-border-2  h-100  py-1 font-size-12  text-center   d-flex justify-content-center align-items-center ">
              {eachShift.extraAmount.amount}
              </div>
            </div>

            <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1  font-size-12     right-border-2  text-center py-1   d-flex justify-content-center align-items-center ">
            {eachShift.totalAmount}
            </div>
            <div className="col-md-1 col-md-1 col-sm-1 col-1 col-xl-1    font-size-12  text-center  py-1  right-border-2   d-flex justify-content-center align-items-center ">
             {eachShift.nativingSelectorValue==={} ||eachShift.nativingSelectorValue===undefined||eachShift.nativingSelectorValue===null?<>--</>:<>{eachShift.nativingSelectorValue.label}</>}
            </div>
          </div>

          <div className="row mx-3  reportTableBody bottom-border-2">
            <div className="  col-md-12 col-sm-12 col-12 col-xl-12  font-size-12  left-border-2    right-border-2  text-center py-1   d-flex justify-content-start align-items-center ">
              <span className="text-danger pl-4">
                {" "}
                Shift faults: &nbsp;{" "}
              </span>{" "}
              {/* {item.known_faults_ids
                    .split(",")
                    .map((eachFault) => {
                      return <span>{eachFault}, </span>;
                    })} */}
              --
            </div>
          </div>
        </>
  })
}


    

        <div className="px-4 mb-0 mt-3">
          <div className="row mb-3 customPaddingForProductionReport bottom-border-2  top-border-2  py-1">
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue font-weight-600 py-0123">
              Pile To Pile Length:
              <span className="font-weight-500 ">
                &nbsp;
                {finalStepInput.pileToPileLength}
              </span>
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue  font-weight-600 py-0123">
              Pile to Pile Width:
              <span className="font-weight-500 ">
                {" "}
                &nbsp;
                {finalStepInput.pileToPileWidth}
              </span>
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3  text-customBlue font-weight-600  py-0123">
              Cut Piece Size:
              <span className="font-weight-500 ">
                &nbsp;
                {finalStepInput.cutPieceSize}
              </span>
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue  font-weight-600  py-0123">
              {" "}
              Cut Piece Weight:
              <span className="font-weight-500 ">
                &nbsp;
                {finalStepInput.cutPieceWeight}
              </span>
            </div>
          </div>
        </div>
        <div className="px-4 mb-1">
          <div className="my-2 text-center perPieceDetailHeadingProductionReport">Grand Total</div>
          <div className="row mb-3 customPaddingForProductionReport bottom-border-2  top-border-2  py-1">
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue font-weight-600 py-0123">
              Border:&nbsp;
              <span className="font-weight-500 ">
                {grandFinalTotal.totalBorders}
              </span>
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue  font-weight-600 py-0123">
              Pieces:&nbsp;
              <span className="font-weight-500 ">
                {grandFinalTotal.totalPiece}
              </span>
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3  text-customBlue font-weight-600 py-0123">
              A Grade Pieces:&nbsp;
              <span className="font-weight-500 ">
                {grandFinalTotal.totalAGrade}
              </span>
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 text-customBlue  font-weight-600  py-0123">
              {" "}
              B Grade Pieces:&nbsp;
              <span className="font-weight-500 ">
                {grandFinalTotal.totalBGrade}
              </span>
            </div>
          </div>
        </div>
        <div className="my-2 text-center perPieceDetailHeadingProductionReport">Per Piece Detail</div>
        <div className="row mx-3  reportTableHead ">
          <div className=" col-md-3 col-sm-3 col-3 col-xl-3 right-border-1 px-0 my-auto text-center py-1 ">
            Label
          </div>

          <div className=" col-md-3 col-sm-3 col-3 col-xl-3  font-size-12   right-border-1  text-center  my-1  py-1">
            Current
          </div>
          <div className=" col-md-3 col-sm-3 col-3 col-xl-3  font-size-12   right-border-1  text-center  my-1  py-1">
            Required
          </div>
          <div className=" col-md-3 col-sm-3 col-3 col-xl-3    font-size-12  text-center  my-1  right-border-2  py-1">
            Difference
          </div>
        </div>

        <>
          <div className="row mx-3  reportTableBody bottom-border-2">
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report   px-2 bottom-border-1 top-border-1 py-1">Total Weight/Cut Piece</div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">    {((rollDetail.rollWeight*1000 - (finalStepInput.cutPieceWeight*1000)) / grandFinalTotal.totalPiece).toFixed(3)}   </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">   {finalStepRequired.requirePerPieceWeight }   </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">     {(finalStepRequired.requirePerPieceWeight - (((rollDetail.rollWeight*1000) - (finalStepInput.cutPieceWeight*1000)) / grandFinalTotal.totalPiece)).toFixed(3)}  </div>
          </div>
          <div className="row mx-3  reportTableBody bottom-border-2">
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report  bottom-border-1 px-2  py-1">Length Pile to Pile</div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">    {finalStepInput.pileToPileLength}    </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">     {finalStepRequired.requireLengthpp}</div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">  {finalStepRequired.requireLengthpp - finalStepInput.pileToPileLength} </div>
          </div>
          <div className="row mx-3  reportTableBody bottom-border-2">
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report bottom-border-1  px-2  py-1">
              Width Pile to Pile
            </div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2"> {finalStepInput.pileToPileWidth}</div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">      {finalStepRequired.requireWidthpp}</div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">{finalStepRequired.requireWidthpp - finalStepInput.pileToPileWidth} </div>
          </div>
          <div className="row mx-3  reportTableBody bottom-border-2 mb-4">
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto left-border-2 right-border-2 bg-for-step-three-product-report  px-2  py-1">B Grade</div>
            <div className=" col-md-3 col-sm-3 col-3 col-xl-3 px-0 py-auto right-border-2  py-1  text-right px-2">{((grandFinalTotal.totalBGrade * 100) / grandFinalTotal.totalAGrade).toFixed(3)}%</div>
            <div className=" col-md-6 col-sm-6 col-6 col-xl-6 px-0 py-auto right-border-2  py-1  text-right px-2"> </div>

          </div>
        </>
      </div>




    </>
  )
}

export default WeavingProductionFormStepFourth