import React from 'react';

const DeleteMovieModal = (props) => {
   
    const {  setModalOpen, deleteMovie, id } = props
    console.log(props)
    const deleteClickHandle = () =>{
        setModalOpen(false)
        deleteMovie(id) 
    }

    const cancleClickHandle = () =>{
        setModalOpen(false)
    }

    return (
    <div id="deleteEmployeeModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <form>
                    <div className="modal-header">						
                        <h4 className="modal-title">Delete Employee</h4>
                        <button onClick={cancleClickHandle} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div className="modal-body">					
                        <p>Are you sure you want to delete these Records?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </div>
                    <div className="modal-footer">
                        <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" onClick={cancleClickHandle}/>
                        <input type="button" className="btn btn-danger" value="Delete" onClick={deleteClickHandle}/>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default DeleteMovieModal;