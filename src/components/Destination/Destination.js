import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './Destination.css';
import fakeData from '../../fakeData/fakeData.json';

const Destination = () => {

    const { ticketType } = useParams();
    const vehicles = fakeData;
    const [data, setData] = useState([]);
    const [show, setShow] = useState(true);
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    useEffect(() => {
        setData(vehicles);
    }, [data])

    // console.log(input);
    // console.log(input2);

    var index = data.findIndex(item => item.ticketType === ticketType);
    const picture = (data[index]);


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 design-form">
                    {
                        show ? <form className="search-form">
                            <label class="mr-1" htmlFor="fromTom">Pic From </label>
                            <input className="form-control" type="text" name="fromTo" value={input} onInput={e => setInput(e.target.value)} /><br />
                            <label class="mr-4" htmlFor="fromTom">Pic To </label>
                            <input className="form-control" type="text" name="fromTo" value={input2} onInput={e => setInput2(e.target.value)} /><br />
                        </form> : <div className="search-form">
                            <h2>{input}</h2>To
                            <h2>{input2}</h2>
                        </div>
                    }
                    <div><button onClick={() => setShow(!show)} className="button-style mb-3">Search</button></div>

                    {
                        show ? '' : <div className="d-flex search-pic">
                            <img height="100px" width="100px" src={picture.image} />
                            <h1>{picture.name}</h1>
                        </div>
                    }


                </div>
                <div className="col-md-8">
                    <iframe width="500" height="500" frameborder="0" scrolling="no" marginHeight="0" marginWidth="0" id="gmap canvas" src="https://maps.google.com/maps?width&amp;height=400&amp;h1=en&amp;q=%20dhaka+(Map)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwla=B&amp;output=embed" ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Destination;