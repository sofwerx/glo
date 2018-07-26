import React from "react";

import SelectTable from './SelectTable';
import Picker from './Picker';

export default class Review extends React.Component {
    
    
    render() {
        const { location, people, equipment, startDate, endDate, opTempo, supplies } = this.props;

        if (!location || !people || !equipment || !opTempo || !startDate || !endDate || !supplies)
            return "There was an error with this Deployment"

            return (
                <div>
                    Location: {location.lat}, {location.lon}
                    <br/>
                    <SelectTable data={people.filter(p => p.selected)} disabled={true}/>
                    <br />
                    <SelectTable data={equipment.filter(p => p.selected)} disabled={true} />
                    <br/>
                    <SelectTable data={supplies.filter(p => p.selected)} disabled={true} />
                    <br />
                    OpTempo: {opTempo}
                    <br />
                    StartDate: {startDate}
                    <br />
                    EndDate: {endDate}
                </div>
        );
    }
}