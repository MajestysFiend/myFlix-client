import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100 moviecard">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body className="text-center card-body">
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}
                </Card.Text>
            </Card.Body>
            <div class="card-footer">
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="primary" className="seemore-button">See More</Button>
                </Link>
            </div>
            </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};