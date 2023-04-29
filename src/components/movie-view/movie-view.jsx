<<<<<<< Updated upstream
=======
import "./movie-view.scss";
>>>>>>> Stashed changes
import PropTypes from "prop-types";
import { Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MovieView = ({ movie, onBackClick }) => {
    return (
<<<<<<< Updated upstream
        <div>
            <div>
                <img src={movie.ImagePath} alt={movie.Title + " Cover Image"} />
            </div>
            <div>
                <small>Cover art provided by <a href={movie.ImagePath}>Wikipedia</a></small>
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
=======
        <div className="movieview-background">
            <Row>
                <Col>
                    <img src={movie.ImagePath} alt={movie.Title + " Cover Image"} style={{ width: "80%" }} /><br/>
                    <small>Cover art provided by <a href={movie.ImagePath}>Wikipedia</a></small>
                </Col>
                <Col>
                    <div className="text-center">
                        <span className="movie-title">{movie.Title}</span>
                    </div>
                    <div className="text-center">
                        <span>Director: </span>
                        <span>{movie.Director.Name}</span>
                    </div>
                    <div className="text-center">
                        <span>Genre: </span>
                        <span>{movie.Genre.Name}</span>
                    </div>
                </Col>

            </Row>

            <Row>
                <div className="description-container">
                    <span>{movie.Description}</span>
                </div>
                <Button onClick={onBackClick} className="back-button" variant="primary">Back</Button>
            </Row>
>>>>>>> Stashed changes
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};