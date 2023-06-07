import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react"

export const MovieCard = ({ user, movie, token }) => {

    const [rerender, setRerender] = useState("Yes, please!")
    
    // Add to favorites function(not workingg properly)
    const addToFavorites = () => {
        console.log("Before res.json: " + user.FavoriteMovies)

        fetch(`https://myflixapplication.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie._id)}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json"
        })
            .then((res) => {
                if (res.ok) {
                    alert("Movie added to favorites!")
                    return res.json;
                } else {
                    alert("Could not add to favorites");
                }
            })
            .then(() => {
                if (rerender === "Yes, please!") {
                    setRerender("Do it!")
                } else {
                    setRerender("Yes, please!")
                }
                console.log("After res.json: " + user.FavoriteMovies)
            })
            .catch((e) => {
                alert("Error: " + e);
            });
    }

    return (
        <Card className="h-100 moviecard">
            <Card.Img variant="top" src={movie.ImagePath} w-100 />
            <Card.Body className="text-center card-body">
                <Card.Title>{movie.Title}</Card.Title>

            </Card.Body>
            <div class="card-footer justify-content-center">
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <motion.div
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 1 }}>
                        <Button variant="primary" className="seemore-button ">See More</Button>
                    </motion.div>
                </Link>
            </div>
            <span className="footer"><motion.button
                text-center
                className="add-to-favorites"
                initial={{ scale: .8, opacity: .8 }}
                transition={{ duration: .3 }}
                whileHover={{ scale: 1.2, rotateZ: 720, opacity: 1 }}
                whileTap={{ scale: .8 }}
                onClick={addToFavorites}>⭐</motion.button></span>
        </Card>
    );
};