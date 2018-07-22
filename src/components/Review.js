import React from "react";

import SelectTable from './SelectTable';

export default class Review extends React.Component {
    
    
    render() {
        const { location, people, equipment, startDate, endDate } = this.props;

        if (!location || !people || !equipment || !startDate || !endDate)
            return "There was an error with this Deployment"

            return (
                <div>
                    Location: {location.lat}, {location.lon}
                    <br/>
                    <SelectTable data={people.filter(p => p.selected)} disabled={true}/>
                    <br />
                    <SelectTable data={equipment.filter(p => p.selected)} disabled={true} />
                    <br />
                    StartDate: {startDate}
                    <br />
                    EndDate: {endDate}
                </div>
        );
    }
}