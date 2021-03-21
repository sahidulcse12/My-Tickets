
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';
import fakeData from '../../fakeData/fakeData.json';
import './Home.css';


const Home = () => {

    const vehicles = fakeData;
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(vehicles);
    }, [data])
    //console.log(data);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    const history = useHistory();
    const { ticketType } = useParams();
    //console.log(data);

    const handleRoom = (ticketType) => {
        history.push(`/destination/${ticketType}`);
    }

    return (
        <div className="row m-auto align-items-center home-background">
            {
                data.map(vehicle =>
                    <div className="col-md-3 picture">
                        <img className="card-img-top" src={vehicle.image} />
                        <button onClick={() => handleRoom(vehicle.ticketType)} className="btn btn-lg">{vehicle.name}</button>
                    </div>
                )
            }
        </div>

    );
};

export default Home;