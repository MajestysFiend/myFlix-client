import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
<<<<<<< Updated upstream
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.Title}
=======
        <div className="text-center">
            <Card onClick={() => onMovieClick(movie)} className="h-100">
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Director.Name}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="outline-dark">
                        More Info
                    </Button>
                </Card.Body>
            </Card>
>>>>>>> Stashed changes
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Director: PropTypes.shape.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
};