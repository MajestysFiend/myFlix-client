import { Col } from "react-bootstrap";
import dayjs from "dayjs";


export const ProfileView = ({ user }) => {

    const birthday = dayjs( user.Birthday ).format("MM/DD/YYYY")

    return (
        <div className="profile-container">
            <Col className="text-center">
                <h1><span className="my">my</span><span className="flix">Profile</span></h1>
                <p className="label">Username</p>
                <span className="profile-info">{user.Username}</span><br />
                <p className="label">Birthday</p>
                <span className="profile-info">{birthday}</span><br />
                <p className="label">Email</p>
                <span className="profile-info">{user.Email}</span><br />
                <h2><span className="my">Favorite</span> <span className="flix">Movies</span></h2>
                <div className="favorite-movies">
                    
                </div>
            </Col>
        </div>
    )
}