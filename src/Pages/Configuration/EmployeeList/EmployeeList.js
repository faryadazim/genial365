import React, { useState } from "react";
import { Modal , Button } from "react-bootstrap";
// import {  Button } from "bootstrap";




import { useSelector } from "react-redux";
const EmployeeList = () => {
    const [modalShow, setModalShow] = React.useState(false);
  const [ListOfEmployee, setList] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const showNavMenu = useSelector((state) => state.NavState);
  return (
    <>
      <div
        role="main"
        className={`right_col  h-100  ${
          showNavMenu == false ? "right_col-margin-remove" : " "
        } `}
      >
           {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        <button className="btn btn-danger btn-sm ml-2 px-3"  onClick={() => setModalShow(true)}>
            Add New +</button>
        <div className="x_panel">
          <div className="x_content">
            <div className="table-responsive">
              <table className="table table-striped jambo_table bulk_action">
                <thead>
                  <tr className="headings">
                    <th className="column-title"> Sr. </th>
                    <th className="column-title">Emp.Name</th>
                    <th className="column-title">FatherName</th>
                    <th className="column-title">CNIC</th>
                    <th className="column-title">Address</th>
                    <th className="column-title">Designation</th>
                    <th className="column-title">Job Status</th>
                    <th className="column-title">Phone</th>
                  </tr>
                </thead>

                <tbody>
                  {ListOfEmployee.map((item) => {
                    return (
                      <tr className="even pointer">
                        <td className=" ">1</td>
                        <td className=" ">Ali Khan</td>
                        <td className=" ">AbuBakar</td>
                        <td className=" ">3310323456668</td>
                        <td className=" ">Faisalabad</td>
                        <td className=" ">Clerk</td>
                        <td className=" ">Active</td>
                        <td className=" ">0304-2345678</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;










function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
         <Modal.Header>
                <Modal.Title>Update User</Modal.Title>
                <i  className="fa fa-close"  onClick={props.onHide} ></i>
              </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risu iosam quam sapiente id ipsa dignissimos sequi nesciunt vol ga temporibus maiores eaque, minus quibusdam illum neque magnam! Qui mollitia magni nisi in, dolore dicta nemo officiis cum beatae nam repellat laboriosam nobis quia et harum. Maxime minus recusandae reprehenderit doloremque voluptate doloribus fugiat natus ut excepturi incidunt accusantium neque maiores harum numquam cupiditate quam distinctio animi provident eligendi sit repudiandae porro voluptates, laborum rem! Soluta ex vero modi id necessitatibus, quia officiis. Aspernatur aperiam iusto deserunt velit, repellendus distinctio officiis error atque nihil odio est. Possimus, magnam. Itaque hic rerum fugit. Quis totam vel alias sit nemo debitis distinctio quod ipsa eligendi recusandae. Quas officia libero, deserunt tempora eligendi accusantium veritatis fugiat laboriosam eos cupiditate quam eum, consequuntur, rem eius? Iure, animi alias sed recusandae odio explicabo ducimus commodi repudiandae. Quisquam repellat placeat maiores accusantium possimus aut corrupti, dolores nulla voluptatem iure praesentium ipsum beatae a? Aut at sunt molestias veritatis hic fugit, quam porro, quis exercitationem, eveniet delectus dicta dolore obcaecati! Deserunt alias et quae praesentium fugiat numquam perspiciatis quidem aliquid sint. Deserunt voluptates saepe eveniet sunt animi itaque mollitia, sint quod sed maxime, commodi tenetur! Earum ipsam quidem rem sed, commodi iure molestias vero obcaecati repellendus id voluptate ex! Amet magnam alias vel a accusamus esse cumque aperiam corporis suscipit, beatae repudiandae vitae, distinctio nesciunt praesentium maiores dolor animi odio quidem quisquam, neque quae cupiditate optio deleniti saepe. Non, magnam ea! Provident velit distinctio cupiditate. Ipsam temporibus incidunt in, at alias obcaecati nobis laudantium, magnam similique ratione accusamus quam aperiam natus fugit aliquam suscipit ducimus ipsum perspiciatis optio quibusdam? Nulla inventore itaque delectus officia saepe, provident maxime est tempore laboriosam? Quas quam optio explicabo nemo totam? Illum provident sapiente explicabo unde! Aut porro necessitatibus nostrum ducimus ab provident quidem. Ut tempore asperiores fugiat dolore blanditiis. Neque, ducimus cupiditate odit ad nostrum sit facilis aut cumque temporibus porro veritatis dolor vitae a perferendis! Tempora sequi molestias doloremque earum eos sint expedita! Voluptates delectus quod ipsam accusantium rerum illo temporibus aliquid, eius assumenda libero cumque, corrupti nobis ab cum dolorum. Omnis adipisci nobis delectus corrupti! Deleniti, minima. Fugit at rerum earum?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="btn btn-success btn-sm ml-2 px-3">Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }