import React, { Component } from "react";

export default class Review extends React.Component {
    
    
    render() {
        const { location, people, equipment, startDate, endDate } = this.props;

        if (!location || !people || !equipment || !startDate || !endDate)
            return "There was an error with this Deployment"

            return (
                <div>
                    Location: {location[1]}, {location[0]}
                    <br/>
                    People: {people.join(', ')}
                    <br />
                    Equipment: {equipment.join(', ')}
                    <br />
                    StartDate: {startDate}
                    <br />
                    EndDate: {endDate}
                </div>
        );
    }
}