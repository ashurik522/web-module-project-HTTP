import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import DeleteMovieModal from './DeleteMovieModal';
import axios from 'axios';
import ReactModal from 'react-modal'

const Movie = (props) => {
    const { addToFavorites, deleteMovie } = props;

    const [movie, setMovie] = useState('');
    const [modalOpen, setModalOpen] = useState(false)
    

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:9000/api/movies/${id}`)
            .then(res=>{
                setMovie(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
    }, []);
   

    const openModalClick = () => {
        setModalOpen(true)
    }

  
    const handleFavoriteClick = () => {
       addToFavorites(movie)
    }


    return(<div className="modal-page col">
        <ReactModal isOpen={modalOpen} ariaHideApp={false}> 
            <DeleteMovieModal  setModalOpen={setModalOpen} deleteMovie={deleteMovie} id={id}/>
        </ReactModal>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">						
                    <h4 className="modal-title">{movie.title} Details</h4>
                </div>
                <div className="modal-body">
                    <div className="flexContainer">

                        <section className="movie-details">
                            <div>
                                <label>Title: <strong>{movie.title}</strong></label>
                            </div>
                            <div>
                                <label>Director: <strong>{movie.director}</strong></label>
                            </div>
                            <div>
                                <label>Genre: <strong>{movie.genre}</strong></label>
                            </div>
                            <div>
                                <label>Metascore: <strong>{movie.metascore}</strong></label>
                            </div>
                            <div>
                                <label>Description:</label>
                                <p><strong>{movie.description}</strong></p>
                            </div>
                        </section>
                        
                        <section>
                            <span onClick={handleFavoriteClick} className="m-2 btn btn-dark">Favorite</span>
                            <Link to={`/movies/edit/${movie.id}`} className="m-2 btn btn-success">Edit</Link>
                            <span onClick={openModalClick} className="delete">
                                <input type="button" className="m-2 btn btn-danger" value="Delete"/>
                            </span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Movie;